import { resolveRefs } from 'json-refs';
import jsonSchemaToZod from 'json-schema-to-zod';
import { format } from 'prettier';
export async function jsonSchemaToZodSchema(jsonSchema: Record<string, unknown>): Promise<string> {
  const { resolved } = await resolveRefs(jsonSchema);
  const code = jsonSchemaToZod(resolved, { module: 'esm' });
  const formatted = format(code, { parser: 'typescript' });
  return formatted;
}
export default { jsonSchemaToZodSchema };
