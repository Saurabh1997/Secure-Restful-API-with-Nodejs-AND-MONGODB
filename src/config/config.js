export const config = {
  production: {
    secret: process.env.secret,
    MONGO_URI: process.env.MONGO_URI,
    port: process.env.PORT,
  },
  development: {
    secret: "CODER_MANIAC",
    MONGO_URI: "mongodb://localhost/music_api",
    port: 3000,
  },
};
export const getConfig = (env) => {
  return config[env] || config.development;
};
