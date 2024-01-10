import multer from "multer";

// Configure storage with filename and location

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        const name = Date.now() + '_' + file.originalname;
        cb(null, name);
    }
});

export const upload = multer({ 
    storage: storage,
});