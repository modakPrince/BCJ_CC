const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve a welcome page on the root route
app.get('/', (req, res) => {
    res.send('Welcome to the File Upload and Download API!');
});

// Define storage using multer.diskStorage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination folder where the file will be saved
        const uploadFolder = 'uploads';
        // Ensure the folder exists (asynchronously)
        fs.promises.mkdir(uploadFolder, { recursive: true })
            .then(() => cb(null, uploadFolder))
            .catch((err) => cb(err));
    },
    filename: (req, file, cb) => {
        // Sanitize the filename to avoid any path traversal issues
        const sanitizedFilename = path.basename(file.originalname);
        cb(null, sanitizedFilename);
    },
});

// Initialize multer with the defined storage configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        // Only allow specific file types (e.g., .jpg, .png)
        const allowedTypes = /jpeg|jpg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = allowedTypes.test(file.mimetype);

        if (extname && mimeType) {
            return cb(null, true);
        } else {
            return cb(new Error('Only .jpg, .jpeg, .png files are allowed.'));
        }
    },
});

// Upload file route
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    // Check if the file is present
    if (!file) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }
    // Send response after successful upload
    res.json({ success: true, message: 'File uploaded successfully.' });
});

// Download file route
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);
    // Check if the file exists
    if (fs.existsSync(filePath)) {
        // Send the file as a response
        res.sendFile(filePath);
    } else {
        res.status(404).json({ success: false, message: 'File not found.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
