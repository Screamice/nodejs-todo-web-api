const express = require('express');
const bodyParser = require('body-parser');
const site = require('./routes/site');

// Global settings.
const app = express();
const PORT = 3000;
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => {
	console.log(`Servidor Inciado en el puerto ${PORT}`);
});

// General Routes.
app.get('/', site.index);
app.post('/new-todo', site.newTodo);
app.get('/listall', site.listall);
app.put('/update', site.update);
app.delete('/delete', site.delete);