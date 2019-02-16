// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081/api/v1/',
 // apiUrl: 'https://tplanner-backend.herokuapp.com/api/v1/',
  newsApiKey: '5b16581cee2e4a60be96e7b3b603a422',
  appName: 'Tplanner'
};
