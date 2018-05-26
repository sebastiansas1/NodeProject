const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, fn) {
    fn(null, new Date().getTime().toString() + '-' + file.fieldname + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 200000
  },
  fileFilter: function (req, file, callback) {
    validateFile(file, callback);
  }
}).single('restaurantImage');

var validateFile = function (file, cb) {
  allowedFileTypes = /jpeg|jpg|png|gif/;
  const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedFileTypes.test(file.mimetype);
  if (extension && mimeType) {
    return cb(null, true);
  } else {
    cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
  }
}

// Multer Configuration
const multerConfig = {

  storage: multer.diskStorage({
    // Setup where the user's file will go
    destination: function (req, file, next) {
      next(null, './public/uploads');
    },

    // Then give the file a unique name
    filename: function (req, file, next) {
      console.log(file);
      const ext = file.mimetype.split('/')[1];
      var now = new Date();
      var isoString = now.toISOString();
      next(null, file.fieldname + '-' + isoString + '.' + ext);
    }
  }),

  // A means of ensuring only images are uploaded. 
  fileFilter: function (req, file, next) {
    if (!file) {
      next();
    }
    const image = file.mimetype.startsWith('image/');
    if (image) {
      console.log('photo uploaded');
      next(null, true);
    } else {
      console.log("file not supported");
      //TODO:  A better message response to user on failure.
      return next();
    }
  }
};

exports.configuration = multer(multerConfig).array('restaurantImage', 5);