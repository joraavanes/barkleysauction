const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'client/dist/media');
    },
    filename: (req, file, callback) => {
        callback(null, uuid.v4() + '.' + file.originalname.split('.')[1]);
    }
});

const fileFilter = (req, file, callback) => {
    if(file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        callback(null, true);
    }else{
        callback(null, false);
    }
};

module.exports = multer({
    storage,
    fileFilter
});