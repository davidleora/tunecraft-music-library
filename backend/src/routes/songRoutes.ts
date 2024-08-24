import { Router } from 'express';
import Song from '../models/song';

const router = Router();

// Create a new song
router.post('/songs', async (req, res) => {
    try {
        const newSong = new Song(req.body);
        const savedSong = await newSong.save();
        res.status(201).json(savedSong);
    } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ message: error.message });
        } else {
          res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});

// Get all songs
router.get('/songs', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: error.message });
        } else {
          res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

// Get a song by ID
router.get('/songs/:id', async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (song) {
            res.json(song);
        } else {
            res.status(404).json({ message: 'Song not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: error.message });
        } else {
          res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

// Update a song by ID
router.put('/songs/:id', async (req, res) => {
    try {
        const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedSong) {
            res.json(updatedSong);
        } else {
            res.status(404).json({ message: 'Song not found' });
        } 
    } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ message: error.message });
        } else {
          res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});

// Delete a song by ID
router.delete('/songs/:id', async (req, res) => {
    try {
        const deletedSong = await Song.findByIdAndDelete(req.params.id);
        if (deletedSong) {
            res.json({ message: 'Song deleted' });
        } else {
            res.status(404).json({ message: 'Song not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: error.message });
        } else {
          res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

export default router;