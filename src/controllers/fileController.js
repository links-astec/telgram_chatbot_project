const client = require('../config/dbConfig');
const multer  = require('multer')
const Fuse = require('fuse.js');


const upload = multer({ dest: 'uploads/' });

const fileController = {
  
  uploadFile: [
    upload.single('file'),
    async (req, res) => {
      console.log('Form Data:', req.body);
      const { file } = req;
      const { file_type, level, user_id } = req.body;
      let file_path = req.file.path;
  
      const originalFileName = req.file.originalname;
      const file_name = originalFileName.substring(0, originalFileName.lastIndexOf('.'));
  
      // Replace double slashes with forward slashes
      file_path = file_path.replace(/\\/g, '/');
  
      // Check if the file with the same name and user ID already exists
      const checkFileQuery = {
        text: 'SELECT * FROM files WHERE file_name = $1 AND user_id = $2',
        values: [file_name, user_id],
      };
  
      try {
        const existingFile = await client.query(checkFileQuery);
  
        if (existingFile.rows.length > 0) {
          // File with the same name and user ID already exists
          return res.status(400).send('File with the same name already exists for this user.');
        }
  
        // If the file doesn't exist, proceed to insert it into the database
        const insertFileQuery = {
          text: 'INSERT INTO files (file_name, file_path, file_type, level, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          values: [file_name, file_path, file_type, level, user_id],
        };
  
        const result = await client.query(insertFileQuery);
        console.log('File uploaded successfully:', result.rows[0]);
        res.json(result.rows[0]);
      } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Internal Server Error');
      }
    }
  ],
  


  // Get all files
  getAllFiles: async (req, res) => {
    const query = 'SELECT * FROM files';

    try {
      const result = await client.query(query);
      res.json(result.rows);
    } catch (error) {
      console.error('Error retrieving files:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  getFileByName: async (req, res) => {
    const userInput = req.params.fileName;

    // Fetch all files from the database
    const queryAllFiles = 'SELECT * FROM files';
    const resultAllFiles = await client.query(queryAllFiles);
    const allFiles = resultAllFiles.rows;

    // Define fuse.js options
    const fuseOptions = {
      keys: ['file_name'],
      threshold: 0.3,
    };

    // Create a new fuse instance with the options
    const fuse = new Fuse(allFiles, fuseOptions);

    // Use fuse to search for matching files
    const results = fuse.search(userInput);

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send('File not found');
    }
  },

   updateFile : [
    upload.single('file'),
    async (req, res) => {
      try {
        const { file } = req;
        const { file_id, file_name, file_type, level, user_id } = req.body;
  
        // Check if the file exists
        const checkFileQuery = {
          text: 'SELECT * FROM files WHERE file_id = $1',
          values: [file_id],
        };
        const fileExists = await client.query(checkFileQuery);
  
        if (fileExists.rows.length === 0) {
          return res.status(404).send('File not found');
        }
  
        let file_path = req.file ? req.file.path : fileExists.rows[0].file_path;
  
        // Replace double slashes with forward slashes
        file_path = file_path.replace(/\\/g, '/');
  
        const updateQuery = {
          text: 'UPDATE files SET file_name = $1, file_path = $2, file_type = $3, level = $4, user_id = $5 WHERE file_id = $6 RETURNING *',
          values: [file_name, file_path, file_type, level, user_id, file_id],
        };
  
        const result = await client.query(updateQuery);
        console.log('File updated successfully:', result.rows[0]);
        res.json(result.rows[0]);
      } catch (error) {
        console.error('Error updating file:', error);
        res.status(500).send('Internal Server Error');
      }
    },
  ],

  // Delete a file by ID
  deleteFile: async (req, res) => {
    const fileId = req.params.fileId;

    const query = {
      text: 'DELETE FROM files WHERE file_id = $1 RETURNING *',
      values: [fileId],
    };

    try {
      const result = await client.query(query);
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).send('File not found');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = {
  fileController,
};
