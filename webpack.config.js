const path = require("path");
const AutoPrefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

//import path from "path";
const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname , "assets", "js", "main.js");
const OUTPUT_DIR= path.join(__dirname, "static");

const config = {
    entry : ["@babel/polyfill" , ENTRY_FILE],
    mode: MODE,
    module : { //모듈을 발견할때마다 이 룰을 따른다
        rules: [ 
                {
                    test : /\.(js)$/,
                    use : [
                        {
                            loader : "babel-loader"
                        }
                    ]
                },
                {
                //loader 는 webpack이 파일을 처리하는 방법이라고 생각하면 됨
                test : /\.(scss)$/,
                use: ExtractCSS.extract([
                {
                    loader : "css-loader" //최종적 CSS이해
                }, 
                {
                    loader: "postcss-loader", // plugin들을 CSS에 대해 실행 시켜줌
                    options : {
                        plugins() {
                            return [AutoPrefixer({ browsers : "cover 99.5%"})];
                        }
                    }
                },
                {
                    loader : "sass-loader"  //SCSS 를 받아서 CSS 변환
                }
            ])

            }
        ]
    },
    output : {
        path : OUTPUT_DIR,
        filename : "[name].js" //The name of the input file and the format of the input file.
    },
    plugins : [new ExtractCSS("styles.css")]
};

module.exports = config; // 옛날 방식
//100% client code, babel node not use!
//webpack entry output 두가지를 가지고 있음