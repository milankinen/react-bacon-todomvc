let express     = require('express'),
    React       = require('react'),
    fs          = require('fs'),
    path        = require('path'),
    serveStatic = require('serve-static'),
    bodyParser  = require('body-parser'),
    Application = require('./site/application')


let app    = express(),
    _index = fs.readFileSync(path.resolve(__dirname, '../public/_index.html')).toString()

app.use(bodyParser.json())
app.use('/public', serveStatic(path.resolve(__dirname, '../public')))


app.get('/', (req, res) => {
  let model = { author: 'Matti Lankinen' }
  let html  = _index
    .replace('{{MODEL}}', JSON.stringify(model))
    .replace('{{APP}}', React.renderToString(<Application {...model} />))

  res.set('Content-Type', 'text/html')
  res.send(html)
})


let server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening at port %s', server.address().port)
})
