import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads/"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  console.log("Uploaded File Type:", file.mimetype);
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files can be uploaded!"), false);
  }
};

const upload = multer({ storage, fileFilter });

const uploadMiddleware = (req, res, next) => {
  console.log("Starting upload...");
  
  upload.single("profile_picture")(req, res, function (err) {
    if (err) {
      console.error("Multer Error:", err.message);
      return res.status(400).json({ error: err.message });
    }

    console.log("Upload Successful!");
    
    if (!req.file) {
      console.log("No file uploaded!");
      return res.status(400).json({ error: "Please upload a photo." });
    }

    console.log("File Path:", req.file.path);
    
    req.body.profile_picture = `/uploads/${req.file.filename}`;
    next();
  });
};

export default uploadMiddleware;
