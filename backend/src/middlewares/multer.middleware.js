import multer from "multer";

const storage = multer.memoryStorage(); // file will be in memory (buffer)
export const upload = multer({ storage });
