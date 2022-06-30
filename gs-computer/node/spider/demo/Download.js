var request = require('request');
var fs = require('fs');

function savedImg(url, filename) {
    request.head(url,function(err,res,body){
        if (err){
            console.log(err);
        } else {
            request(url).pipe(fs.createWriteStream('./'+filename));
        }
    });
}

function sopyImg(fromUrl, toUrl) {
    var readStream = fs.createReadStream(fromUrl);
    var writeStream = fs.createWriteStream(toUrl);
    readStream.pipe(writeStream);
    readStream.on('end', function () {
        console.log('copy end');
    });
    readStream.on('error', function () {
        console.log('copy error');
    });
}