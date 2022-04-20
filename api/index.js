const bodyParser = require('body-parser');
const app = require('express')();
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const { json } = require('body-parser');
const fsPromises = fs.promises;

app.use(bodyParser.json());

const corsOptions = {
    origin: 'https://senefitret.com',
  };

app.use(cors());

const storage = multer.diskStorage({
    destination: function(req, file, cb) {                   
        var articleType = (req.url).replace('/upload/', '');
        var fileType = file.mimetype;

        if(String(fileType).includes('application/pdf')){        
            console.log(`saved to ${articleType} pdfs`);
            cb(null, `./static/pdfs/${articleType}`);
        } else if (['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].indexOf(fileType) >= 0) {            
            console.log(`saved to ${articleType} images`);
            cb(null, `./static/images/${articleType}`);
        } else {
            console.log('saved to static');
            cb(null, './static');
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        var imageType = req.params.type;

        console.log('In image storage, imageType: ', imageType);

        cb(null, `./static/images/${imageType}`);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({
    storage : storage,
    fileFilter: function (req, file, cb) {
        var mimeType = file.mimetype;        

        if(['application/pdf', 'image/png', 'image/jpeg', 'image/gif'].indexOf(mimeType) < 0){
            console.log("Error ocurred while trying to upload. Details below:");

            console.log(file.fieldname);
            console.log(file.originalname);
            console.log(file.mimetype);
            
            if(file.fieldname == 'file'){
                req.fileValidationError = 'Wrong article file mimetype.';
                return cb(new Error('WRONG_ARTICLE_MIMETYPE'));
            } else if (file.fieldname == 'thumbnail'){
                req.fileValidationError = 'Wrong thumbnail file mimetype.';
                return cb(new Error('WRONG_IMAGE_MIMETYPE'));
            }            
        }
        cb(null, true);
    }
}).fields([{ name: 'file', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]);

const uploadImage = multer({
    storage : imageStorage
}).fields([{ name: 'thumbnail', maxCount: 1 }]);

const getManuscript_PDFs = async() => {
    try {
        return await fsPromises.readdir('./static/pdfs/manuscripts');
    } catch (err) {
        console.error(err);
    }    
}

const getManuscript_MDs = async() => {
    try {
        return await fsPromises.readdir('./content/manuscripts');
    } catch (err) {
        console.log(err);
    }
}

const setUpNodeMailer = () => {
    const authUser = 'senefitret@gmail.com';
    const authPass = 'klamath9542!';
    let transporter;

    try {
        transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports,            
            auth: {
              user: authUser, // generated ethereal user
              pass: authPass // generated ethereal password
            }
          });
    } catch (err) {
        console.error(err);
    }
    
    return transporter;
}

app.post('/contact/submit', (req, res) => {
    
    const from = req.body.from;
    const email = req.body.email;
    const subject = req.body.subject;
    const body = req.body.emailBody;

    try {
        let transporter = setUpNodeMailer();
    
        // send mail with defined transport object
        let info = transporter.sendMail({
            from: `${from} - ${email}`, // sender address
            to: "senefitret@gmail.com", // list of receivers
            subject: subject, // Subject line
            text: body // plain text body
            // html: "<b>Hello world?</b>", // html body
        });
    } catch (err) {
        console.error(err);
    }
    
    return res.json('Success');
});

app.post('/upload/manuscripts', (req, res) => {
    upload(req, res, (err) => {
        if(err !== void 0){
            var errorText = '';
            console.log('Error Uploading Manuscript');
            console.log('Error is :', err);                        
            
            if (err.message === 'WRONG_ARTICLE_MIMETYPE') {                        
                errorText = 'Article submitted was of the wrong filetype';               
            } else if (err.message === 'WRONG_IMAGE_MIMETYPE') {
                errorText = 'Thumbnail submitted was of the wrong filetype.';
            }
            
            res.status(422).json({ error: errorText });        
        } else {
            res.json('Success');
        }
    })
});

app.post('/upload/biologicalsciences', (req, res) => {
    upload(req, res, (err) => {
        if(err !== void 0){
            var errorText = '';
            console.log('Error Uploading Biological Science Document');
            console.log('Error is :', err);

            if (err.message === 'WRONG_ARTICLE_MIMETYPE') {                        
                errorText = 'Article submitted was of the wrong filetype';               
            } else if (err.message === 'WRONG_IMAGE_MIMETYPE') {
                errorText = 'Thumbnail submitted was of the wrong filetype.';
            }
            
            res.status(422).json({ error: errorText });   
        } else {
            res.json('Success');
        }
    })
});

app.post('/upload/sciencesociety', (req, res) => {
    upload(req, res, (err) => {
        if(err !== void 0){
            var errorText = '';
            console.log('Error Uploading Science Society Document');
            console.log('Error is :', err);

            if (err.message === 'WRONG_ARTICLE_MIMETYPE') {                        
                errorText = 'Article submitted was of the wrong filetype';               
            } else if (err.message === 'WRONG_IMAGE_MIMETYPE') {
                errorText = 'Thumbnail submitted was of the wrong filetype.';
            }
            
            res.status(422).json({ error: errorText });     
        } else {
            res.json('Success');
        }
    })
});

app.post('/upload/religionscience', (req, res) => {
    upload(req, res, (err) => {
        if(err !== void 0){
            var errorText = '';
            console.log('Error Uploading Religion Science Document');
            console.log('Error is :', err);                               

            if (err.message === 'WRONG_ARTICLE_MIMETYPE') {                        
                errorText = 'Article submitted was of the wrong filetype';               
            } else if (err.message === 'WRONG_IMAGE_MIMETYPE') {
                errorText = 'Thumbnail submitted was of the wrong filetype.';
            }
            
            res.status(422).json({ error: errorText });     
        } else {
            res.json('Success');
        }
    })
});

app.post('/upload/culture', (req, res) => {
    upload(req, res, (err) => {
        if(err !== void 0){
            var errorText = '';
            console.log('Error Uploading Culture Document');
            console.log('Error is :', err);

            if (err.message === 'WRONG_ARTICLE_MIMETYPE') {                        
                errorText = 'Article submitted was of the wrong filetype';               
            } else if (err.message === 'WRONG_IMAGE_MIMETYPE') {
                errorText = 'Thumbnail submitted was of the wrong filetype.';
            }
            
            res.status(422).json({ error: errorText });    
        } else {
            res.json('Success');
        }
    })
});

app.post('/upload/history', (req, res) => {
    upload(req, res, (err) => {
        if(err !== void 0){
            var errorText = '';
            console.log('Error Uploading History Document');
            console.log('Error is :', err);

            if (err.message === 'WRONG_ARTICLE_MIMETYPE') {                        
                errorText = 'Article submitted was of the wrong filetype';               
            } else if (err.message === 'WRONG_IMAGE_MIMETYPE') {
                errorText = 'Thumbnail submitted was of the wrong filetype.';
            }
            
            res.status(422).json({ error: errorText });   
        } else {
            res.json('Success');
        }
    })
});

app.post('/upload/test', (req, res) => {
    upload(req, res, (err) => {
        if(err !== void 0){
            var errorText = '';
            console.log('Error Uploading Test Document');
            console.log('Error is :', err);

            if (err.message === 'WRONG_ARTICLE_MIMETYPE') {                        
                errorText = 'Article submitted was of the wrong filetype';               
            } else if (err.message === 'WRONG_IMAGE_MIMETYPE') {
                errorText = 'Thumbnail submitted was of the wrong filetype.';
            }
            
            res.status(422).json({ error: errorText });   
        } else {
            res.json('Success');
        }
    })
});

app.post('/delete/image', (req, res) => {
    var originalThumbnailPath = `./static${req.body.thumbnailPath}`;    

    fsPromises.unlink(originalThumbnailPath)
        .then(() => {
            res.json('Thumbnail successfully deleted');
        })
        .catch((err) => {
            console.log('Error within deleteImage function: ', err);

            res.json('Error during thumbnail deletion');
        });
});

app.post('/delete/pdf', (req, res) => {
    var originalFilePath = req.body.filePath;

    fsPromises.unlink(originalFilePath)
        .then(() => {
            res.json('PDF successfully deleted');
        })
        .catch((err) => {
            console.log('Error within delete pdf function: ', err);

            res.json('Error during pdf deletion');
        })
});

app.post('/upload/image/:type', (req, res) => {
    console.log('within upload image, before upload, type: ', req.params.type);
    uploadImage(req, res, (err) => {
        if(err !== void 0){
            console.log('Error uploading new image');
            console.log('Error is :', err);

            res.status(422).json({ error: err});
        } else {
            res.json('Success uploaded new thumbnail');
        }
    });
});

app.get('/test/connection', (req, res) => {
    res.json(req.url);
});

app.get('/list-pdfs', async (req, res) => {    
    const manuscriptPDFs = await getManuscript_PDFs();
    const manuscriptMDs = await getManuscript_MDs();    

    let manuscripts = manuscriptPDFs.concat(manuscriptMDs);

    let indexStartAt = 1000;

    let manuscriptMarkdowns = manuscripts.map((val) => {
        let name;
        let ext;
        if (String(val).includes(".md")){
            var split = String(val).split(".md");
            name = split[0];
            ext = "md";
        }
        if (String(val).includes(".pdf")){
            var split = String(val).split(".pdf");            
            name = split[0];
            ext = "pdf";
        }
        indexStartAt++;

        return {name, type : "Manuscript", id : indexStartAt, ext};
    });

    res.json(manuscriptMarkdowns);
});

module.exports = app;
