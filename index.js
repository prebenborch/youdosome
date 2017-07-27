let config = require('./src/config');
let express = require('express');
let app = express();
let path = require('path');
let dust = require('express-dustjs')
let crypto = require('crypto')
let dir = require('./src/directory.js');

dir.directory.crawl(__dirname + '/src/content-types').then(function(res) {
console.log(JSON.stringify(res, null, 3));
});

console.log(__dirname + '/src/content-types');

app.use(express.static('_public'))

dust._.optimizers.format = function (ctx, node) {
  return node
}

dust._.helpers.demo = function (chk, ctx, bodies, params) {
  return chk.w('demo')
}

app.engine('dust', dust.engine({
  useHelpers: true
}))

app.set('view engine', 'dust')
app.set('views', path.resolve(__dirname, './views'))

app.get('/', function (req, res) {
  // Render template with locals
  res.render('index', {
    title: 'Hello world',
    name: 'Joe',
    sentence: 'The quick brown fox jumps over the lazy dog',
    number: req.query.number || 0
  })
})

require('crypto').randomBytes(16, function(err, buffer) {
  var token = buffer.toString('hex');
console.log(token);
});

app.listen(config.port, function () {
    console.log('Listening on port ' + config.port + '!');
});
