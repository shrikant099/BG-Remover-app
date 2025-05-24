import multer from "multer";

const storage = multer.memoryStorage(); // use memory for buffer
const upload = multer({ storage });

export default upload;
