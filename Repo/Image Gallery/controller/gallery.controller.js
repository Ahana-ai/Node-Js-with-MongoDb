const ImgGallery = require('../models/gallery.model');
const fs = require('fs');

class Gallery{
    async index(req, res) {
        res.render('imgForm', {
            Page_title: 'Gallery Form'
        })
    }

    async insert(req, res) {
        try{
            console.log(req.body);
            console.log(req.file);
            req.body.image = req.file.filename;
            let saveImg = await ImgGallery.create(req.body);
            if(saveImg && saveImg._id) {
                console.log("Data Added Successfully");
                res.redirect('/')

            }else {
                console.log("Data Not Added");
                res.redirect('/')
            }
        }catch(err){
            throw err;
        }
    }

    async view(req, res){
        try{
            let galleryData = await ImgGallery.find({});
            console.log(galleryData);
            res.render('gallery', {
                Page_title: 'Image Gallery',
                galleryData
            })
        } catch(err){
            throw err;
        }
    }
}

module.exports = new Gallery();