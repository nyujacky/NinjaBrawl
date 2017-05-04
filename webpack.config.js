module.exports = {
  entry: "./lib/app.js",
  output: {
    path: __dirname,
    filename: "./lib/bundle.js"
	},
	devtool: "source-map"
};
