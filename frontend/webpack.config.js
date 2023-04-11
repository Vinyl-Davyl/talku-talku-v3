//In summary, this code enables webpack to load environment variables from a .env file and make them available at build time via the process.env object.
const Dotenv = require("dotenv-webpack");
module.exports = {
  plugins: [new Dotenv()],
};
