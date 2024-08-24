// Importing Mongoose and specific types from it.
// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
// It provides a straightforward way to interact with MongoDB databases.
import mongoose, { Schema, Document } from 'mongoose';

// Define a TypeScript interface that extends the Mongoose Document interface.
// This interface represents the shape of a Song document in MongoDB.
// It ensures that each Song has a title, artist, album, and year, all of which are required.
export interface ISong extends Document {
    title: string;
    artist: string;
    album: string;
    year: number;
}

// Create a Mongoose Schema for the Song model.
// A Schema defines the structure of the document, the data types, and any validation or constraints.
const SongSchemma: Schema = new Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    year: { type: Number, required: true }
});

// Export the Song model.
// The model represents the collection of songs in MongoDB and allows you to interact with it (e.g., create, read, update, delete).
// The model is created by passing the schema and the interface to mongoose.model, which returns a Mongoose model.
export default mongoose.model<ISong>('Song', SongSchemma);