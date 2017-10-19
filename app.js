
var fontCarrier = require('font-carrier');
var font = fontCarrier.create();
var fs = require('fs');//fs
var files = fs.readdirSync('./svg/');
var fontArr = [];
var fontString = '';
//模板
var view = fs.readFileSync('./view/index.html').toString();
var foot = fs.readFileSync('./view/foot.html').toString();

for (var i in files) {
    var _id = files[i].replace('.svg', '') - 0;
    _id += 600;
    fontArr[i] = _id;
    font.setSvg('&#xe' + _id, fs.readFileSync('./svg/' + files[i]).toString());
}
//console.log(font)

fontArr.sort(arrsort);
for (var i in fontArr) {
    if (fontArr[i] - 0) {
        fontArr[i] = '&#xe' + fontArr[i];
    } else {
        fontArr[i] = false;
    }
}
for (var i = 0; i < fontArr.length; i++) {
    if (fontArr[i]) {
        fontString += '<li>' +
            '<i class="icon iconfont">' + fontArr[i] + '</i>' +
            '<div class="name">&nbsp;</div>' +
            '<div class="code">' + fontArr[i].toString().replace('&', '&amp;') + ';</div>' +
            '</li>';
    }
}
view += fontString + foot;
font.output({
    path: './demo/iconfont'
});
fs.writeFile('./demo/index.html', view, 'UTF-8');

//压缩
fs.unlink('demo/iconfont.tar.gz');//删除
var fstream = require('fstream'),
    tar = require('tar'),
    zlib = require('zlib');

fstream.Reader({ 'path': 'demo', 'type': 'Directory' }) /* Read the source directory */
    .pipe(tar.Pack()) /* Convert the directory to a .tar file */
    .pipe(zlib.Gzip()) /* Compress the .tar file */
    .pipe(fstream.Writer({ 'path': 'demo/iconfont.tar.gz' })); /* Give the output file name */

//sort
function arrsort(a, b) {
    return a - b;
}

console.log('iconfont ok');