interface IEnvConfig {
  enviroment: string;
  port: number;
  host: string;
  db_host: string;
  db_port: number;
  db_user: string;
  db_password: string;
  db_name: string;
  db_type: string;
}

export const EnvConfig = (): IEnvConfig => ({
  enviroment: process.env.NODE_ENV || 'development',
  port: process.env.PORT ? +process.env.PORT : 3000,
  host: process.env.HOST || 'localhost',

  db_host: process.env.DB_HOST || 'localhost',
  db_port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  db_user: process.env.DB_USER || 'root',
  db_password: process.env.DB_PASSWORD || 'root',
  db_name: process.env.DB_NAME || 'database',
  db_type: process.env.DB_TYPE || 'postgres',
});
