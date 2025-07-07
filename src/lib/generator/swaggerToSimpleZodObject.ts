import { jsonSchemaToZodSchema } from './jsonSchemaToZodSchema';

async function swaggerToZodTypescript(
  swaggerSchema: Record<string, unknown>
): Promise<Record<string, string>> {
  // OpenAPI v3 puts schemas under "components.schemas"
  if (
    !swaggerSchema ||
    typeof swaggerSchema !== 'object' ||
    !('components' in swaggerSchema) ||
    !swaggerSchema.components ||
    typeof swaggerSchema.components !== 'object' ||
    !('schemas' in swaggerSchema.components)
  ) {
    throw new Error('Invalid OpenAPI v3 schema: missing "components.schemas"');
  }

  const schemas = (swaggerSchema as any).components.schemas;
  const result: Record<string, string> = {};

  for (const [name, schema] of Object.entries(schemas)) {
    result[name] = await jsonSchemaToZodSchema(schema as Record<string, unknown>);
  }

  return result;
}

export default { swaggerToZodTypescript };
