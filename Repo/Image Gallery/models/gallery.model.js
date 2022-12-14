const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new Schema ({
    artistName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = new mongoose.model('imageGallery', GallerySchema);