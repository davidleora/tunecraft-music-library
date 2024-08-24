import mongoose, { Schema, Document } from 'mongoose';

export interface ISong extends Document {
    title: string;
    artist: string;
    album: string;
    year: number;
}

const SongSchemma: Schema = new Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    year: { type: Number, required: true }
});

export default mongoose.model<ISong>('Song', SongSchemma);