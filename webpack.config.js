const path = require("path");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const IS_DEV = process.env.NODE_ENV !== "production";
const distDir = IS_DEV ? "public" : "dist";
const pkg = require("./package.json");

console.log(distDir);
module.exports = {
	mode: IS_DEV ? "development" : "production",
	devtool: IS_DEV ? "eval-source-map" : "eval",
	entry: "./src/index.ts",
	output: {
		filename: `miToast-${pkg.version}.min.js`,
		path: path.resolve(__dirname, distDir),
		umdNamedDefine: true,
		library: "miToast",
		libraryTarget: "umd",
		libraryExport: "default",
	},
	devServer: {
		contentBase: path.join(__dirname, distDir),
		compress: true,
		host: "localhost",
		port: 1024,
		overlay: true,
		quiet: true,
    open: true
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		unknownContextCritical: false,
		rules: [
      {
        test: /\.html$/, use: 'html-loader'
      },
			{
				test: /\.ts$/,
				use: "ts-loader",
				include: [path.resolve(__dirname, "src")],
			},
      {
        test: /\.less$/,
        use: 'style-loader!css-loader!less-loader'
      }
		],
	},
	plugins: [
		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				messages: [`Your application is running here: http://localhost:1024/`],
			},
			clearConsole: true,
		}),
    // new HtmlWebpackPlugin({
    //   filename: 'public/index.html'
    // })
	],
	performance: {
		hints: false,
	},
};
