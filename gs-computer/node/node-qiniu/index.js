for ( var i = 1; i < 1001; i ++) {
    var mFs = require('fs');
    var readStream = mFs.createReadStream('./laobannian.jpg');
    var writeStream = mFs.createWriteStream('./images/laobannian'+i+'.jpg');
    readStream.pipe(writeStream);
    readStream.on('end', function () {
        console.log('copy end');
    });
    readStream.on('error', function () {
        console.log('copy error');
    });
}