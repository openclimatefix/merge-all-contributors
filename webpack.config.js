const path = require("path");

module.exports = {
  entry: "./index.js",  // This is your main file
  output: {
    filename: "index.js",  // The output file name
    path: path.resolve(__dirname, "dist"),  // Output will go into the "dist" folder
  },
  mode: "production",
  target: "node", // Since this is likely a CLI tool, set it to "node"
};
