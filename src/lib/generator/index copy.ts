import jetpack from 'fs-jetpack';
import fs from 'fs';
import pathModule from 'path';
import prettier from 'prettier';

const injectParamsInPath = (
  path: string,
  pathObj: any,
  method: string,
  // @ts-ignore
  schemas: any,
  enableParamsInPath?: boolean
) => {
  // If enableParamsInPath is true, keep {param} in path, else remove them
  if (!pathObj[method].parameters) return path;
  let newPath = path;
  for (const p of pathObj[method].parameters) {
    if (p.in === 'path') {
      if (enableParamsInPath) {
        // keep {param} in path
        continue;
      } else {
        // remove /{param} from path
        newPath = newPath.replace(new RegExp(`/\\{${p.name}\\}`), '');
      }
    }
  }
  return newPath;
};

function toZodType(schema: any, schemas: any): string {
  if (!schema) return 'z.any()';
  if (schema.$ref) {
    const ref = schema.$ref.split('/').pop();
    // Use the actual schema definition from swaggerConfig.components.schemas
    if (ref && schemas[ref]) {
      return toZodType(schemas[ref], schemas);
    }
    return 'z.any()';
  }
  switch (schema.type) {
    case 'string':
      if (schema.format === 'date' || schema.format === 'date-time') return 'z.string()';
      return 'z.string()' + (schema.nullable ? '.nullable()' : '');
    case 'integer':
    case 'number':
      let zodNum = 'z.number()';
      if (schema.format === 'int32' || schema.format === 'int64') zodNum += '.int()';
      if (schema.nullable) zodNum += '.nullable()';
      return zodNum;
    case 'boolean':
      return 'z.boolean()' + (schema.nullable ? '.nullable()' : '');
    case 'array':
      return `z.array(${toZodType(schema.items, schemas)})${schema.nullable ? '.nullable()' : ''}`;
    case 'object':
      if (schema.properties) {
        const props = Object.entries(schema.properties)
          .map(([k, v]: [string, any]) => `${k}: ${toZodType(v, schemas)}`)
          .join(',\n');
        return `z.object({${props}})${schema.nullable ? '.nullable()' : ''}`;
      }
      return 'z.object({})';
    default:
      return 'z.any()';
  }
}

function getRequestZod(pathObj: any, method: string, schemas: any) {
  const req = pathObj[method].requestBody?.content?.['application/json']?.schema;
  let body = req ? toZodType(req, schemas) : 'z.undefined()';
  let params = 'z.object({})';
  let query = 'z.object({})';

  // Path params
  if (pathObj[method].parameters) {
    const paramFields: Record<string, string> = {};
    const queryFields: Record<string, string> = {};
    for (const p of pathObj[method].parameters) {
      if (p.in === 'path') {
        paramFields[p.name] = toZodType(p.schema, schemas);
      }
      if (p.in === 'query') {
        let zod = toZodType(p.schema, schemas);
        if (!p.required) zod += '.optional()';
        queryFields[p.name] = zod;
      }
    }
    params = `z.object({${Object.entries(paramFields)
      .map(([k, v]) => `${k}: ${v}`)
      .join(',')}})`;
    query = `z.object({${Object.entries(queryFields)
      .map(([k, v]) => `${k}: ${v}`)
      .join(',')}})`;
  }
  return { body, params, query };
}

function getResponseZod(pathObj: any, method: string, schemas: any) {
  const resp = pathObj[method].responses?.['200']?.content;
  if (!resp) return 'z.object({})';
  const jsonSchema =
    resp['application/json']?.schema || resp['text/json']?.schema || resp['text/plain']?.schema;
  if (!jsonSchema) return 'z.object({})';
  return toZodType(jsonSchema, schemas);
}

type IGenerateApiConfigOptions = {
  enableParamsInPath?: boolean;
  removeParamsFromFileName?: boolean;
  dynamicMethodName?: boolean;
  paramsScopeInFile: '[]' | '{}' | '()';
  pathScope: 'repository' | 'global';
};

const generateApiConfigsByPath = <CONFIG extends { [key: string]: any }>(
  swagger: CONFIG,
  outDir: string,
  entryOptions: Partial<Pick<IGenerateApiConfigOptions, 'pathScope'>> = {}
) => {
  const options: IGenerateApiConfigOptions = {
    enableParamsInPath: false,
    removeParamsFromFileName: false,
    paramsScopeInFile: '[]',
    dynamicMethodName: false,
    pathScope: 'repository',
    ...entryOptions,
  };

  if (outDir.startsWith('/')) {
    outDir = `.${outDir}`;
  }

  const schemas = swagger.components?.schemas || {};

  for (const [apiPath, pathObj] of Object.entries(swagger.paths)) {
    // @ts-ignore
    for (const method of Object.keys(pathObj)) {
      // @ts-ignore
      const op = pathObj[method];
      const tag = (op.tags && op.tags[0]) || 'Api';
      const opName = apiPath
        .replace(/[{}]/g, '')
        .replace(/^\//, '')
        .replace(/\//g, '_')
        .replace(/-/g, '')
        .replace(/([A-Z])/g, (m: string) => m)
        .replace(/[^a-zA-Z0-9_]/g, '');
      const methodName =
        options.dynamicMethodName == true
          ? tag.charAt(0).toUpperCase() +
            tag.slice(1) +
            opName
              .split('_')
              .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
              .join('') +
            method.charAt(0).toUpperCase() +
            method.slice(1)
          : 'config';

      const auth = apiPath.startsWith('/auth') || apiPath.startsWith('/common') ? 'NO' : 'YES';
      let { body, params, query } = getRequestZod(pathObj, method, schemas);
      const response = getResponseZod(pathObj, method, schemas);

      // Optionally remove params from api config
      if (options?.removeParamsFromFileName) {
        params = 'z.object({})';
      }

      // Path string
      let pathString = apiPath;
      // If removeParamsFromFileName is true, also remove path params from the path string
      if (options?.removeParamsFromFileName) {
        // @ts-ignore
        if (pathObj[method].parameters) {
          // @ts-ignore
          for (const p of pathObj[method].parameters) {
            if (p.in === 'path') {
              pathString = pathString.replace(new RegExp(`/\\{${p.name}\\}`), '');
            }
          }
        }
      } else {
        pathString = injectParamsInPath(
          apiPath,
          pathObj,
          method,
          schemas,
          options?.enableParamsInPath
        );
      }

      // Directory and file path
      // Build directory pattern based on the pathString (after param injection)
      const cleanPath = pathString.replace(/^\//, '').replace(/\/$/, '');
      const segments = cleanPath
        .split('/')
        .filter(Boolean)
        .map((s) => {
          // If enableParamsInPath is true, keep {param} in path, else remove them from directory structure
          if (options?.enableParamsInPath) {
            return s;
          } else {
            return s.replace(/[{}]/g, '');
          }
        });

      let dir = outDir;
      for (let i = 0; i < segments.length - 1; i++) {
        dir = pathModule.join(dir, segments[i]);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      }

      // --- FILENAME LOGIC ---
      // Find all path params in the original apiPath
      const paramMatches = [...apiPath.matchAll(/\{([^}]+)\}/g)];
      let fileName = '';
      if (options?.removeParamsFromFileName) {
        // Remove params from filename
        fileName = `${segments[segments.length - 1] || 'index'}.${method}.ts`;
      } else if (paramMatches.length > 0) {
        // Add params to filename, using paramsScopeInFile
        let base = segments[segments.length - 1] || 'index';
        const scope = options?.paramsScopeInFile || '{}';
        let paramsStr = '';
        if (scope === '{}') {
          paramsStr = paramMatches.map((m) => `{${m[1]}}`).join('');
        } else if (scope === '[]') {
          paramsStr = paramMatches.map((m) => `[${m[1]}]`).join('');
        } else if (scope === '()') {
          paramsStr = paramMatches.map((m) => `(${m[1]})`).join('');
        }
        base += paramsStr;
        fileName = `${base}.${method}.ts`;
      } else {
        fileName = `${segments[segments.length - 1] || 'index'}.${method}.ts`;
      }
      // --- END FILENAME LOGIC ---

      const filePath = pathModule.join(dir, fileName);

      const fileContent = [
        `import kmApi from 'km-api';`,
        `import { z } from 'zod';`,
        ``,
        `export const ${methodName} = kmApi.makeApiConfig({`,
        `  path: \`${pathString}\`,`,
        `  method: '${method}',`,
        `  auth: '${auth}',`,
        `  disable: 'NO',`,
        `  request: {`,
        `    body: ${body},`,
        `    params: ${params},`,
        `    query: ${query},`,
        `  },`,
        `  response: {`,
        `    data: ${response},`,
        `  },`,
        `});`,
      ].join('\n');

      const fileContentPretty = formatWithPrettier(fileContent, 'typescript');

      fs.writeFileSync(filePath, fileContentPretty, 'utf8');
    }
  }
};

export function formatWithPrettier(
  code: string,
  parser: prettier.BuiltInParserName,
  options: prettier.Options = {}
): string {
  return prettier.format(code, { parser, ...options });
}

const readSwaggerFile = <CONFIG extends { [key: string]: any }>(
  path: string,
  pathScope: 'repository' | 'global' = 'repository'
) => {
  // @ts-ignore
  return new Promise<{ data: CONFIG }>((rs, rj) => {
    if (path.startsWith('http')) {
      fetch(path).then((res) => {
        res.json().then((j) => {
          rs({ data: j });
        });
      });
    } else {
      if (path.startsWith('/') && pathScope == 'repository') {
        path = `.${path}`;
      }
      console.log('p:', jetpack.path(path));

      jetpack.readAsync(path, 'json').then((res) => {
        rs({ data: res });
      });
    }
  });
};

const makeApiConfig = (
  readPath: string,
  writePath: string,
  pathScope: 'repository' | 'global' = 'repository'
) => {
  // @ts-ignore
  return new Promise((rs, rj) => {
    readSwaggerFile(readPath, pathScope).then((swaggerObject) => {
      generateApiConfigsByPath(swaggerObject.data, writePath);
      rs({ message: `configs created in ${writePath} successfully` });
    });
  });
};

export default { makeApiConfig };
