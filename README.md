# km-swagger-to-km-api

Description:convert swagger json file to km-api config.

## Installation

Use the package manager [npm](https://www.npmjs.com/package/km-swagger-to-km-api) to install km-swagger-to-km-api.

```bash
npm install km-swagger-to-km-api
```

## Usage

```typescript
// example of use with external path
const swaggerPath: string = 'https://example/.../swagger/v1/swagger.json';

kmSwaggerToKmApi.makeApiConfig(swaggerPath, '/src/swagger', {
  pathScope: 'repository',
  saveInCache: true,
  loadFromMainPath: false,
});

// example of use with internal path
kmSwaggerToKmApi.makeApiConfig('/src/lib/swagger.json', '/src/swagger', {
  pathScope: 'repository',
  saveInCache: true,
  loadFromMainPath: false,
});
```

## dependensies

Required Dependensies is [ZOD,km-api](https://zod.dev/) , [km-api](https://github.com/komeilm76/km-api)

## License

[MIT](https://choosealicense.com/licenses/mit/)
