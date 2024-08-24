// Import the Router function from Express, which is used to create a new router object.
import { Router } from 'express';

// Import the Song model that was defined in song.ts. 
// This model is used to interact with the MongoDB collection for songs.
import Song from '../models/song';

// Create a new router object. This router will handle all the routes related to songs.
const router = Router();

/* 
  Route: POST /api/songs
  Purpose: Create a new song in the database.
  - The route handler listens for POST requests at the '/songs' endpoint.
  - It expects a song object in the request body, creates a new Song instance, 
    and saves it to the database.
*/
router.post('/songs', async (req, res) => {
    try {
        // Create a new Song document using the data from the request body.
        const newSong = new Song(req.body);

        // Save the new Song document to the database.
        const savedSong = await newSong.save();

        // Respond with a 201 status code (Created) and the saved song as JSON.
        res.status(201).json(savedSong);
    } catch (error) {
        // If there is an error, check if it's an instance of Error and respond accordingly.
        if (error instanceof Error) {
          res.status(400).json({ message: error.message });
        } else {
          res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});

/* 
  Route: GET /api/songs
  Purpose: Retrieve all songs from the database.
  - The route handler listens for GET requests at the '/songs' endpoint.
  - It retrieves all songs from the database and sends them as a JSON response.
*/
router.get('/songs', async (req, res) => {
    try {
        // Retrieve all Song documents from the database.
        const songs = await Song.find();

        // Respond with the list of all songs as JSON.
        res.json(songs);
    } catch (error) {
        // If there is an error, respond with a 500 status code (Internal Server Error).
        if (error instanceof Error) {
          res.status(500).json({ message: error.message });
        } else {
          res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

/* 
  Route: GET /api/songs/:id
  Purpose: Retrieve a specific song by its ID from the database.
  - The route handler listens for GET requests at the '/songs/:id' endpoint.
  - It retrieves the song with the specified ID from the database and sends it as a JSON response.
*/
router.get('/songs/:id', async (req, res) => {
    try {
        // Find the Song document by its ID (provided in the URL parameters).
        const song = await Song.findById(req.params.id);

        if (song) {
            // If the song is found, respond with the song as JSON.
            res.json(song);
        } else {
            // If the song is not found, respond with a 404 status code (Not Found).
            res.status(404).json({ message: 'Song not found' });
        }
    } catch (error) {
        // If there is an error, respond with a 500 status code (Internal Server Error).
        if (error instanceof Error) {
          res.status(500).json({ message: error.message });
        } else {
          res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

/* 
  Route: PUT /api/songs/:id
  Purpose: Update a specific song by its ID in the database.
  - The route handler listens for PUT requests at the '/songs/:id' endpoint.
  - It updates the song with the specified ID using the data from the request body, 
    and returns the updated song as a JSON response.
*/
router.put('/songs/:id', async (req, res) => {
    try {
        // Find the Song document by its ID and update it with the data from the request body.
        const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (updatedSong) {
            // If the song is successfully updated, respond with the updated song as JSON.
            res.json(updatedSong);
        } else {
            // If the song is not found, respond with a 404 status code (Not Found).
            res.status(404).json({ message: 'Song not found' });
        } 
    } catch (error) {
        // If there is an error, respond with a 400 status code (Bad Request).
        if (error instanceof Error) {
          res.status(400).json({ message: error.message });
        } else {
          res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});

/* 
  Route: DELETE /api/songs/:id
  Purpose: Delete a specific song by its ID from the database.
  - The route handler listens for DELETE requests at the '/songs/:id' endpoint.
  - It deletes the song with the specified ID from the database and returns a confirmation message.
*/
router.delete('/songs/:id', async (req, res) => {
    try {
        // Find the Song document by its ID and delete it from the database.
        const deletedSong = await Song.findByIdAndDelete(req.params.id);

        if (deletedSong) {
            // If the song is successfully deleted, respond with a confirmation message.
            res.json({ message: 'Song deleted' });
        } else {
            // If the song is not found, respond with a 404 status code (Not Found).
            res.status(404).json({ message: 'Song not found' });
        }
    } catch (error) {
        // If there is an error, respond with a 500 status code (Internal Server Error).
        if (error instanceof Error) {
          res.status(500).json({ message: error.message });
        } else {
          res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

// Export the router object so that it can be used in other parts of the application.
// This router will handle all routes related to the 'Song' model.
export default router;