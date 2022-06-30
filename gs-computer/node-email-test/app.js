const nodemailer  = require("nodemailer");
const smtpTransport = nodemailer.createTransport({
    //service: 'qq',
    host: 'smtp.exmail.qq.com',
    port: 465, // smtp 端口
    secureConnection: true,
    auth: {
        user: 'yuxiaochao@idstaff.com',
        pass: 'phFSULpnU4RXiRxj'//注：此处为授权码，并非邮箱密码  qq邮箱：tapzbbxkwzpdbici 企业微信: phFSULpnU4RXiRxj 登录码：KYXPHzfEafTzCYMY
    }
});
smtpTransport.sendMail({
    from    : 'yuxiaochao@idstaff.com',//发件人邮箱
    to      : 'yuxiaochao@idstaff.com',//收件人邮箱，多个邮箱地址间用','隔开
    subject : '邮件发送测试',//邮件主题
    text: 'Hi!' //text和html两者只支持一种
}, function(err, res) {
    console.log(err, res);
});