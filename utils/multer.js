/* eslint-disable consistent-return */
const multer = require('multer');
const fs = require('fs')

// create public folder
if(!fs.existsSync('./public')){
    fs.mkdirSync('./public')
}

// create profile folder
if(!fs.existsSync('./public/profile')){
    fs.mkdirSync('./public/profile')
}


// create investigation folder
if(!fs.existsSync('./public/investigation')){
    fs.mkdirSync('./public/investigation')
}




// image filter
const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only images are allowed!';
        return cb(new Error('Only images are allowed!'), false);
    }
    cb(null, true);
};

// video filter
const imageAndVideoFilter = (req, file, cb) => {
    if (!file.originalname.match(
        /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|mp4|MP4|m4a|M4A|m4b|M4B|f4v|F4V|mov|MOV)$/)) {
        req.fileValidationError = 'Only images and video are allowed!';
        return cb(new Error('Only images and video are allowed!'), false);
    }
    cb(null, true);
};



// upload profile image
const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/profile');
    },
    filename: async (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname.toLowerCase().replaceAll(' ', '')}`);
    },
});

const uploadProfile = multer({
    storage: profileStorage,
    limits: {
        fileSize: 1024 * 1024,
        files: 1
    },
    fileFilter: imageFilter
});


// upload investigation

// upload profile image
const investigationStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/investigation');
    },
    filename: async (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname.toLowerCase().replaceAll(' ', '')}`);
    },
});

const uploadInvestigation = multer({
    storage: investigationStorage,
    limits: {
        fileSize: 1024 * 1024,
        files: 1
    },
    fileFilter: imageFilter
});


exports.uploadProfile = uploadProfile;
exports.uploadInvestigation = uploadInvestigation;