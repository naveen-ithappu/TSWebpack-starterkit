# Webpack 4 + Typescript 2.9 + Scss Starter Kit

This is sample project setup to get started with **WebpackV4** with **Typescript** and **Scss**

###Loaders & Plugins Used
- CSS
    - MiniCssExtractPlugin
    - css-loader
    - sass-loader

- TypeScript
    - ts-loader
    - fork-ts-checker-webpack-plugin
    
- Font
    - file-loader
- Images
    - url-loader
    - file-loader (fall back for large images)
- JSON
    - json-loader

- Others
    
    `html-webpack-plugin` -  Auto inject Script and style tag
    
    `clean-webpack-plugin` - Clear dist folder
    
    `webpack-manifest-plugin` - generate manifest.json file

         
###TSConfig
```
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "lib": [
            "es2016",
            "dom"
        ],
        "allowJs": false,
        "jsx": "react",
        "sourceMap": true,
        "strict": true,
        "noImplicitAny": true,
        "alwaysStrict": true,
        "baseUrl": "./",
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules"
    ]
}
```
                    
###NPM Commands
`npm run dev`  - To start a dev server

`npm run build` - To generate bundle

###.ENV
`.env` folder contains environment specific configuration  variables to handle `dev` and `production` modes independently   
