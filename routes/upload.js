const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req, file, fn){
    fn(null,  new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname));
  }
}); 

const upload =  multer({
  storage: storage,
  limits: { fileSize:200000 },
  fileFilter: function(req, file, callback){
    validateFile(file, callback);
  }
}).single('restaurantImage');

var validateFile = function(file, cb ){
  allowedFileTypes = /jpeg|jpg|png|gif/;
  const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType  = allowedFileTypes.test(file.mimetype);
  if(extension && mimeType){
    return cb(null, true);
  }else{
    cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
  }
} 
module.exports = upload;