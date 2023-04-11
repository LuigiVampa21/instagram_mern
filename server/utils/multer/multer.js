import multer from 'multer';

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
  };

// FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
          error = null;
        }
        cb(error, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '_' + file.originalname);
    },
});

export const uploadPicture = multer({ storage });