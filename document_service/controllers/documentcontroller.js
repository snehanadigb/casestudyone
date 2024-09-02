const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('document');

const uploadDocument = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: 'Error uploading document', err });
    }

    const { customerId } = req.body;

    try {
      const document = await prisma.document.create({
        data: {
          customerId: parseInt(customerId),
          path: req.file.path,
        }
      });

      // Simulate sending the path to another API for verification
      // Assuming API response as verified (you can implement real API call)
      setTimeout(async () => {
        await prisma.document.update({
          where: { id: document.id },
          data: { verificationStatus: 'verified' }
        });
      }, 2000);

      res.status(200).json({ message: 'Document uploaded and sent for verification', document });
    } catch (error) {
      res.status(500).json({ message: 'Error saving document', error });
    }
  });
};

module.exports =  uploadDocument ;
