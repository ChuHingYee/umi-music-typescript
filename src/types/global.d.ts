declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

declare type LocationUmi = {
  query: {
    [props: string]: string;
  };
  hash: string;
  key: string;
  pathname: string;
  search: string;
  [props: string]: any;
};

declare type DvaLoadingModel = {
  effects: {
    [props: string]: boolean;
  };
  global: boolean;
  models: {
    [props: string]: boolean;
  };
};
