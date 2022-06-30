const proxy = require("http-proxy-middleware");

module.exports = (app)=>{
    app.use("/ajax",proxy({
        target:"https://m.biyao.com",
        changeOrigin:true,
        pathRewrite:{
            "^/ajax":""
        }
    }))
}
