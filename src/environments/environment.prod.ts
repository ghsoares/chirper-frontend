import { User } from "src/app/models/user";

type EnvironmentVariables = {
  production: boolean;
  apiPath: string;
};

type GlobalVariables = {
  user: User;
};

export const environment: EnvironmentVariables = {
  production: true,
  apiPath: "http://localhost:8080"
};

export const globals: GlobalVariables = {
  user: null
};