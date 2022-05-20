declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    LOG_LEVEL: string;
    REMOTE_URL: string;
    DB_CONNECTION: string;
  }
}
