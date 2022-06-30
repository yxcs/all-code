// var base64 = require('./base64')
// var myString = "Man";

// /* Part 1: Encode `myString` to base64 using native UTF-16 */

// var aUTF16CodeUnits = new Uint16Array(myString.length);
// Array.prototype.forEach.call(aUTF16CodeUnits, function (el, idx, arr) { arr[idx] = myString.charCodeAt(idx); });
// var sUTF16Base64 = base64.base64EncArr(new Uint8Array(aUTF16CodeUnits.buffer));

// /* Show output */

// console.log(sUTF16Base64); // "OCY5JjomOyY8Jj4mPyY="

// /* Part 2: Decode `sUTF16Base64` to UTF-16 */

// var sDecodedString = String.fromCharCode.apply(null, new Uint16Array(base64.base64DecToArr(sUTF16Base64, 2).buffer));

// /* Show output */

// console.log(sDecodedString);

// var s1 = '00010000' // 16 Q
// var s2 = '00100110' // 38 m
// var s3 = '00100101' // 37 l
// var s4 = '00011001' // 25 Z
// var s5 = '00011000' // 24 Y
// var s6 = '00010110' // 22 W
// var s7 = '00111100' // 15 8

