import multer from "multer";
const multerFile = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: "../frontend/public/uploads",
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  const upload = multer({ storage: storage });
  upload.single("profilePhoto")
};

export default multerFile;
