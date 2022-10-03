const fs = require('fs');
const path = require('path');

const removeFile = (filePath, callback) => {
    const deletePath = path.join('client', 'dist', filePath);
    fs.unlink(deletePath, (err) => {
        if(err){
            callback(err);
        } else {
            callback(undefined, 'File deleted');
        }
    });
};

module.exports = { removeFile };