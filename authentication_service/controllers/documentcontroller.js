const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Function to save document details to the database
const saveDocument = async (filePath, customerId) => {
    try {
        const document = await prisma.document.create({
            data: {
                filePath: filePath,
                customerId: 14,
                verificationStatus: 'Pending' // Assuming 'Pending' is the initial status
            }
        });
        return document;
    } catch (error) {
        console.error('Error saving document:', error);
        throw new Error('Document saving failed');
    }
};

// Route to handle document upload
router.post('/upload', upload.single('document'), async (req, res) => {
    try {
        const customerId = req.query.customerId;

        if (!req.file) {
            console.error('No file uploaded');
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = req.file.path;
        const document = await saveDocument(filePath, customerId);

        res.status(201).json({ message: 'Document uploaded successfully', document });
    } catch (error) {
        console.error('Error during document upload:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;
