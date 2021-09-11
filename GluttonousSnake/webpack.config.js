// 引入一个node.js中的模块，用于拼接路径。
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 因为clean-webpack-plugin不是默认的，所以需要加大括号括起来变量名。
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// webpack中的所有的配置信息都应该写在module.exports中
module.exports = {
    // 设置开发环境，可选值为development、production、none
    mode: "production",
    // 指定入口文件
    entry: "./src/index.ts",
    // 指定打包文件所在目录，即输出目录
    output: {
        // 指定打包后的文件目录
        path: path.resolve(__dirname,"dist"),  // 这条代码与 path: "./dist" 效果一样，只不过path模块会自动拼接出来。
        // 打包后的文件名称
        filename: "bundle.js",
        // webpack环境设置
        environment: {
            // 告诉webpack不使用箭头函数
            arrowFunction: false,
            // 不使用const关键字
            const: false
        }
    },
    // 指定webpack打包编译时要使用的模块
    module: {
        // 指定打包编译规则
        rules: [
            // 设置ts文件的处理规则
            {
                // 指定规则对哪些文件生效，用正则表达式表示
                test: /\.ts$/,
                // 指定使用什么模块(加载器)处理test表示的文件。
                // 加载规则是从后往前。即先使用ts-loader将ts编译为js，再使用babel将js编译为适配不同平台浏览器的js代码。
                use: [
                    // 配置babel
                    {
                        // 指定加载器
                        loader: "babel-loader",
                        // 设置babel选项
                        options: {
                            // 设置预定义环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            // 表示至少到兼容chrome浏览器版本88
                                            "chrome": "88",
                                            // 表示兼容ie浏览器版本11
                                            "ie": "11"
                                        },
                                        // 指定core-js的版本，即package.json中的版本（安装的版本）
                                        "corejs": "3",
                                        // 使用core-js的方法，"usage"表示按需加载。即ts文件中使用哪些新技术就编译哪些，不会全部编译。
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 指定哪些文件不需要编译处理，用正则表达式表示
                exclude: /node_modules/
            },
            // 设置less文件的处理规则
            {
                test: /\.less$/,
                // 必须按照这个顺序。即先使用less-loader，再使用css-loader，最后使用style-loader
                use: [
                    "style-loader",
                    "css-loader",
                    // 引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        // 指定预置环境插件
                                        "postcss-preset-env",
                                        {
                                            // 兼容的浏览器版本，此处表示兼容最新的最近的两个版本。
                                            browsers: "last 2 versions"
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    // 配置webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: "自定义html文件的title"
            // 将该html文件作为模板，由HTMLWebpackPlugin把编译好的js文件和其他资源引入到模板中
            template: "./src/index.html"
        })
    ],
    // 用来设置引用模块
    resolve: {
        // 告诉webpack以ts、js结尾的文件都可以作为模块引用。
        extensions: ['.ts','.js']
    }

}