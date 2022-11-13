// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { User } from "src/app/models/user";

type EnvironmentVariables = {
  production: boolean;
  apiPath: string;
};

type GlobalVariables = {
  user: User;
};

export const environment: EnvironmentVariables = {
  production: false,
  apiPath: "http://localhost:8080"
};

export const globals: GlobalVariables = {
  user: null
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
