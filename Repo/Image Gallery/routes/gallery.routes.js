const router = require('express').Router();
const galleryController = require('../controller/gallery.controller');
const multer = require('multer');
const path = require('path');
const express = require('express');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+'-'+Date.now()+'myimg'+path.extname(file.originalname));
    }
})

const maxSize = 1*1024*1024;

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
            cb(null, true)
        }else {
            cb(null, false);
            return cb(new Error('only jpg and png allowed'));
        }
    },
    limits: maxSize
})

router.get('/', galleryController.index);
// router.post('/create', galleryController.create);
router.post('/insert', upload.single('image'), galleryController.insert);
router.get('/view', galleryController.view)

module.exports = router;