import 'babel-polyfill';
import lineReader from 'line-reader';
import rd from 'rd';
import officegen from 'officegen';
import fs from 'fs';
import path from 'path';
import async from 'async';
import Promise from 'bluebird';
import config from './config';
var docx = officegen('docx');

var eachLine = Promise.promisify(lineReader.eachLine);
docx.on('finalize', function(written) {
  console.log('Finish to create Word file.nTotal bytes created ' + written + 'n');
});
docx.on('error', function(err) {
  console.log(err);
});

console.log('word 书写中请稍等');

let file = rd.readFileFilterSync(config.path, arr2Reg(config.file));

async.eachSeries(file, function(v, callback) {
    if(isRead(v)) {
      var pObj = docx.createP();
      pObj.addText(path.basename(v), {bold: true,color: '0000FF'});
      eachLine(v, {encoding: 'utf8'}, line => {
        var pObj = docx.createP();
        pObj.addText(line);
      }).then(err => {
        callback();
      }).catch(err => {
        console.error(err);
        callback();
      });
    }else {
      setTimeout(callback, 0);
    }

}, function(err) {
  var out = fs.createWriteStream(config.docx);
  out.on('error', function (err) {
    console.log ( err );
  });
  var result = docx.generate(out);
});

function arr2Reg(arr) {
  var reg;
  if(arr.length > 0) {
    reg = '/';
    for(var i = 0; i < arr.length; i++) {
      if((i+1) == arr.length) {
        reg += '(\\.'+arr[i]+')$/';
      }else {
        reg += '(\\.'+arr[i]+')$|';
      }
    }
  }else {
    reg = null;
  }
  return eval(reg);
}

function isRead(f) {
  var flag = true;
  var arr = config.dir;

  if(arr.length > 0) {
    for(var i = 0; i < arr.length; i++) {
      if(f.indexOf(arr[i]) > 0) {
        flag = false;
      }
    }
  }
  
  return flag;
}