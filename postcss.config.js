module.exports = {
    plugins: [
        require('postcss-pxtorem')({
            rootValue: 100,
            unitPrecision: 5,
            propList: ['*', "!font-size", "!border"],
            selectorBlackList: ["html", "body"],
            exclude: /node_modules/
        })
    ]
}