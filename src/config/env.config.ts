export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV,
  email: process.env.SEED_EMAIL,
  password: process.env.SEED_PASSWORD,
});
