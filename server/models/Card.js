const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    column: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Column",
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model('Card', cardSchema);