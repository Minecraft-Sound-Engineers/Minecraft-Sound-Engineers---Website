const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mversion: {
        type: String,
        required: true,
    },
    version: {
        type: Number,
        required: true,
    },
    uploaded: {
        type: Date,
        required: true,
        default: Date.now,
    },
    downloads: {
        type: Number,
        required: false,
        default: 0
    }
}, {timestamps: true});

module.exports= mongoose.model('version', versionSchema);