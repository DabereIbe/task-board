const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    title: {
        type: String,
        required: true
    }
    // columns: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Column'
    // }]
})

module.exports = mongoose.model('Board', boardSchema);