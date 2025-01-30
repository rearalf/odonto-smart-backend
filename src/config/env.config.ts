export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV,
  email: process.env.SEED_EMAIL,
  password: process.env.SEED_PASSWORD,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expiresin: process.env.JWT_EXPIRESIN,
  jwt_expiresin_refresh: process.env.JWT_EXPIRENSIN_REFRESH,
});
