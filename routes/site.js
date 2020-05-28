const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost:27017/todos',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const ToDo = mongoose.model('ToDo', {name: String, status: Boolean});

exports.index = function (req, res){
    res.render('index', {title: 'TODO List'});
};

exports.newTodo = function (req, res){
    const database = new ToDo({name: req.body.name, status: false});
    database.save().then(() => {
        res.send({response: 'success'});
    });
};

exports.listall = function (req, res){
    ToDo.find({}, "name status")
    .then(doc => {
        res.json({response: 'success', data: doc});
    })
    .catch(err => {
        console.log("Error al consultar elementos. ", err.message);
    });
}

exports.update = function (req, res){
    ToDo.findByIdAndUpdate({_id: req.body.id}, {$set: {status: req.body.status}})
    .then(doc => {
        res.json({response: 'success'});
    })
    .catch(err => {
        console.error(err);
    });
}

exports.delete = function (req, res){
    ToDo.findByIdAndDelete({_id: req.body.id})
    .then(doc => {
        res.json({response: 'success'});
    })
    .catch(err => {
        console.error(err);
    });
};