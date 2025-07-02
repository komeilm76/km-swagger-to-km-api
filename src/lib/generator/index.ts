import jetpack from 'fs-jetpack';
import _ from 'lodash';
import pathModule from 'path';
import prettier from 'prettier';

// zod parsers
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
  if (schema.type === 'string') {
    if (schema.format === 'date' || schema.format === 'date-time') return 'z.string()';
    return 'z.string()' + (schema.nullable ? '.nullable()' : '');
  } else if (schema.type === 'integer' || schema.type === 'number') {
    let zodNum = '';
    if (schema.format === 'int32') {
      zodNum += 'z.number().int()';
    }
    if (schema.format === 'int64') {
      zodNum += 'z.string().transform((v) => { /* v is int64 */ return v})';
    }
    if (schema.nullable) zodNum += '.nullable()';
    return zodNum;
  } else if (schema.type === 'boolean') {
    return 'z.boolean()' + (schema.nullable ? '.nullable()' : '');
  } else if (schema.type === 'array') {
    return `z.array(${toZodType(schema.items, schemas)})${schema.nullable ? '.nullable()' : ''}`;
  } else if (schema.type === 'object') {
    if (schema.properties) {
      const props = Object.entries(schema.properties)
        .map(([k, v]: [string, any]) => `${k}: ${toZodType(v, schemas)}`)
        .join(',\n');
      return `z.object({${props}})${schema.nullable ? '.nullable()' : ''}`;
    }
    return 'z.object({})';
  } else {
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

// inject params
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

// scope handler
type IPathScope = 'repository' | 'global';
const handlePathScope = (entryPath: string, scope: IPathScope) => {
  if (scope == 'repository') {
    if (entryPath.startsWith('/')) {
      entryPath = `.${entryPath}`;
    }
  }
  return entryPath;
};

// pretty config file
export function formatWithPrettier(
  code: string,
  parser: prettier.BuiltInParserName,
  options: prettier.Options = {}
): string {
  return prettier.format(code, { parser, ...options });
}

// read swagger file
const readSwaggerFile = <CONFIG extends { [key: string]: any }>(
  path: string,
  pathScope: IPathScope = 'repository',
  writePath: undefined | string = undefined
) => {
  // @ts-ignore
  return new Promise<{ data: CONFIG }>((rs, rj) => {
    if (writePath) {
      writePath = handlePathScope(writePath, pathScope);
    }
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
        if (writePath !== undefined) {
          jetpack.write(writePath, res);
        }
      });
    }
  });
};

type IGenerateApiConfigOptions = {
  enableParamsInPath?: boolean;
  removeParamsFromFileName?: boolean;
  dynamicMethodName?: boolean;
  exportMode: 'directly' | 'default';
  paramsScopeInFile: '[]' | '{}' | '()';
  pathScope: IPathScope;
  relationMapWithIndexTs: boolean;
};

type IGenerateApiConfigOptionsEntry = Partial<
  Pick<
    IGenerateApiConfigOptions,
    | 'pathScope'
    | 'paramsScopeInFile'
    | 'dynamicMethodName'
    | 'exportMode'
    | 'relationMapWithIndexTs'
  >
>;

const generateApiConfigsByPath = <CONFIG extends { [key: string]: any }>(
  swagger: CONFIG,
  writePath: string,
  entryOptions: IGenerateApiConfigOptionsEntry = {}
) => {
  const options: IGenerateApiConfigOptions = {
    enableParamsInPath: false,
    removeParamsFromFileName: false,
    paramsScopeInFile: '[]',
    dynamicMethodName: false,
    pathScope: 'repository',
    exportMode: 'default',
    relationMapWithIndexTs: true,
    ...entryOptions,
  };

  writePath = handlePathScope(writePath, options.pathScope);

  if (writePath.startsWith('/')) {
    writePath = `.${writePath}`;
  }

  const schemas = swagger.components?.schemas || {};

  // Track files per directory for index.ts generation
  const dirFilesMap: Record<string, string[]> = {};

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

      let dir = writePath;
      for (let i = 0; i < segments.length - 1; i++) {
        dir = pathModule.join(dir, segments[i]);
        if (!jetpack.exists(dir)) {
          jetpack.dir(dir);
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

      // Track file for index.ts
      if (options.relationMapWithIndexTs) {
        if (!dirFilesMap[dir]) dirFilesMap[dir] = [];
        // Remove .ts extension for import
        dirFilesMap[dir].push(fileName.replace(/\.ts$/, ''));
      }

      const fileContent = [
        `import kmApi from 'km-api';`,
        `import { z } from 'zod';`,
        ``,
        ...(options.exportMode == 'directly'
          ? [`export const ${methodName} = kmApi.makeApiConfig({`]
          : [`const ${methodName} = kmApi.makeApiConfig({`]),
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
        ...(options.exportMode == 'default' ? [`export default { ${methodName} }`] : []),
      ].join('\n');

      const fileContentPretty = formatWithPrettier(fileContent, 'typescript');

      jetpack.write(filePath, fileContentPretty);
    }
  }

  // Generate index.ts for each directory if relationMapWithIndexTs is enabled
  if (options.relationMapWithIndexTs) {
    // Helper to recursively collect all directories
    function getAllDirs(rootDir: string, collected: Set<string>) {
      if (!collected.has(rootDir)) {
        collected.add(rootDir);
        const entries = jetpack.list(rootDir) || [];
        for (const entry of entries) {
          const entryPath = pathModule.join(rootDir, entry);
          if (jetpack.exists(entryPath) === 'dir') {
            getAllDirs(entryPath, collected);
          }
        }
      }
    }

    // Collect all directories under writePath
    const allDirs = new Set<string>();
    getAllDirs(writePath, allDirs);

    for (const dir of allDirs) {
      // Find .ts files (excluding index.ts) and subdirectories
      const entries = jetpack.list(dir) || [];
      const tsFiles = entries
        .filter((f) => f.endsWith('.ts') && f !== 'index.ts')
        .map((f) => f.replace(/\.ts$/, ''));
      const subDirs = entries.filter((f) => jetpack.exists(pathModule.join(dir, f)) === 'dir');

      // Prepare imports for files and subdirectories
      const importLines = [
        ...tsFiles.map((f) => `import ${_.camelCase(f)} from './${f}';`),
        ...subDirs.map((d) => `import ${_.camelCase(d)} from './${d}';`),
      ];
      const exportLines = [
        '',
        'export default {',
        [...tsFiles, ...subDirs].map((f) => `  ${_.camelCase(f)},`).join('\n'),
        '};',
        '',
      ];
      const indexContent = [...importLines, ...exportLines].join('\n');
      const indexContentPretty = formatWithPrettier(indexContent, 'typescript');
      jetpack.write(pathModule.join(dir, 'index.ts'), indexContentPretty);
    }
  }
};

const generateApiConfigsAsObject = <CONFIG extends { [key: string]: any }>(
  swagger: CONFIG,
  writePath: string,
  entryOptions: IGenerateApiConfigOptionsEntry = {}
) => {
  const options: IGenerateApiConfigOptions = {
    enableParamsInPath: false,
    removeParamsFromFileName: false,
    paramsScopeInFile: '[]',
    dynamicMethodName: false,
    pathScope: 'repository',
    exportMode: 'default',
    relationMapWithIndexTs: true,
    ...entryOptions,
  };
  writePath = handlePathScope(writePath, options.pathScope);

  const schemas = swagger.components?.schemas || {};
  const apiObject: Record<string, any> = {};

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
      const methodName = options.dynamicMethodName
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
      if (options.removeParamsFromFileName) {
        params = 'z.object({})';
      }

      // Path string
      let pathString = apiPath;
      if (options.removeParamsFromFileName) {
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
          options.enableParamsInPath
        );
      }

      // Build nested object structure by path segments
      const cleanPath = pathString.replace(/^\//, '').replace(/\/$/, '');
      const segments = cleanPath
        .split('/')
        .filter(Boolean)
        .map((s) => (options.enableParamsInPath ? s : s.replace(/[{}]/g, '')));

      let current = apiObject;
      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i] || 'index';
        if (i === segments.length - 1) {
          if (!current[seg]) current[seg] = {};
          current = current[seg];
          current[method] = {
            methodName,
            path: pathString,
            method,
            auth,
            disable: 'NO',
            request: { body, params, query },
            response: { data: response },
          };
        } else {
          if (!current[seg]) current[seg] = {};
          current = current[seg];
        }
      }
    }
  }

  // Generate TypeScript file content
  function renderApiObject(obj: any, depth = 0): string {
    if (typeof obj !== 'object' || obj === null) return JSON.stringify(obj);
    if (obj.methodName && obj.path) {
      // Render as kmApi.makeApiConfig
      const lines = [
        `kmApi.makeApiConfig({`,
        `  path: \`${obj.path}\`,`,
        `  method: '${obj.method}',`,
        `  auth: '${obj.auth}',`,
        `  disable: '${obj.disable}',`,
        `  request: {`,
        `    body: ${obj.request.body},`,
        `    params: ${obj.request.params},`,
        `    query: ${obj.request.query},`,
        `  },`,
        `  response: {`,
        `    data: ${obj.response.data},`,
        `  },`,
        `})`,
      ];
      return lines.join('\n' + '  '.repeat(depth + 1));
    }
    const entries = Object.entries(obj)
      .map(([k, v]) => `${JSON.stringify(k)}: ${renderApiObject(v, depth + 1)}`)
      .join(',\n' + '  '.repeat(depth + 1));
    return `{\n${'  '.repeat(depth + 1)}${entries}\n${'  '.repeat(depth)}}`;
  }

  const exportLine =
    options.exportMode === 'default' ? `export default apiConfigs;` : `export { apiConfigs };`;

  const fileContent = [
    `import kmApi from 'km-api';`,
    `import { z } from 'zod';`,
    ``,
    `const apiConfigs = ${renderApiObject(apiObject)};`,
    ``,
    exportLine,
  ].join('\n');

  const fileContentPretty = formatWithPrettier(fileContent, 'typescript');
  jetpack.write(`${writePath}/config.ts`, fileContentPretty);
};

type IMakeApiOptions = {
  saveInCache: boolean;
  loadFromMainPath: boolean;
  pattern: 'directory' | 'object';
} & IGenerateApiConfigOptionsEntry;

const makeApiConfig = (
  readPath: string,
  writePath: string,
  entryOptions: Partial<IMakeApiOptions>
) => {
  const options: Required<IMakeApiOptions> = {
    pathScope: 'repository',
    saveInCache: true,
    loadFromMainPath: false,
    dynamicMethodName: false,
    exportMode: 'default',
    paramsScopeInFile: '[]',
    relationMapWithIndexTs: true,
    pattern: 'directory',
    ...entryOptions,
  };

  // @ts-ignore
  return new Promise((rs, rj) => {
    readPath = handlePathScope(readPath, options.pathScope);
    writePath = handlePathScope(writePath, options.pathScope);
    const cacheSwaggerPath = `${writePath}/swagger.cached.json`;
    const isExistCacheFile = jetpack.exists(cacheSwaggerPath);
    console.log('isExistCacheFile', isExistCacheFile);

    if (isExistCacheFile == 'file' && options.loadFromMainPath == false) {
      console.log('here', 1);

      readSwaggerFile(cacheSwaggerPath, options.pathScope).then((swaggerObject) => {
        if (options.pattern == 'directory') {
          generateApiConfigsByPath(swaggerObject.data, writePath, {
            dynamicMethodName: options.dynamicMethodName,
            exportMode: options.exportMode,
            paramsScopeInFile: options.paramsScopeInFile,
            pathScope: options.pathScope,
            relationMapWithIndexTs: options.relationMapWithIndexTs,
          });
        } else {
          generateApiConfigsAsObject(swaggerObject.data, writePath, {
            dynamicMethodName: options.dynamicMethodName,
            exportMode: options.exportMode,
            paramsScopeInFile: options.paramsScopeInFile,
            pathScope: options.pathScope,
            relationMapWithIndexTs: options.relationMapWithIndexTs,
          });
        }

        rs({ message: `configs created in ${writePath} successfully` });
      });
    } else {
      console.log('here', 2);

      readSwaggerFile(readPath, options.pathScope, cacheSwaggerPath).then((swaggerObject) => {
        console.log('here', 3);

        if (options.pattern == 'directory') {
          console.log('here', 4);

          generateApiConfigsByPath(swaggerObject.data, writePath, {
            dynamicMethodName: options.dynamicMethodName,
            exportMode: options.exportMode,
            paramsScopeInFile: options.paramsScopeInFile,
            pathScope: options.pathScope,
            relationMapWithIndexTs: options.relationMapWithIndexTs,
          });
        } else {
          console.log('here', 5);

          generateApiConfigsAsObject(swaggerObject.data, writePath, {
            dynamicMethodName: options.dynamicMethodName,
            exportMode: options.exportMode,
            paramsScopeInFile: options.paramsScopeInFile,
            pathScope: options.pathScope,
            relationMapWithIndexTs: options.relationMapWithIndexTs,
          });
        }

        rs({ message: `configs created in ${writePath} successfully` });
      });
    }
  });
};

export default { makeApiConfig, readSwaggerFile };
