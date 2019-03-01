import mongoose, { Schema } from 'mongoose';

const urlShortenSchema = new Schema({
    url: { type: String, index: true },
    urlCode: { type: String, index: true },
    shortUrl: String,
    faction: String,
    name: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('UrlShorten', urlShortenSchema);
