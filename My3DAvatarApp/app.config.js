import dev from "./app.config.dev";
import prod from "./app.config.prod";

const APP_CONFIG = process.env.APP_CONFIG || "development";

export default ({ config }) => {
  const chosen = APP_CONFIG === "production" ? prod : dev;
  return {
    ...config,
    ...chosen,
  };
};
