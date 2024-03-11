const mongoose = require('mongoose');

const notesModel = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, "Title can not be more than 100 characters"]
    },
    content: {
        type: String,
        required: true,
        trim: true 
    },
    tag: {
        type: String,
        trim: true
    }

},{
    timestamps: true
}
);

module.exports = mongoose.model('Notes', notesModel);