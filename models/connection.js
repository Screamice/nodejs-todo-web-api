const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost:27017/todos',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

export const ToDo = mongoose.model('ToDo', {name: String, status: Boolean});