export type Alias<F = any, T = any> = {
  replacement: string;
  transformVariables?: (variables: F) => T;
};

export type Aliases = {
  [key: string]: Alias;
};
