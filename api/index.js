const bodyParser = require('body-parser');
const app = require('express')();
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const fsPromises = fs.promises;

app.use(bodyParser.json());

const corsOptions = {
    origin: 'https://senefitret.com',
  };

app.use(cors(corsOptions));

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

const upload = multer({
    storage : storage,
    fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname);

        if(['.pdf', '.jpg', '.png', '.jpeg'].indexOf(ext) < 0){
            console.log('Before sending error, ext: ', ext, 'indexOfResult: ', ['.pdf', '.jpg', '.png', '.jpeg'].indexOf(ext) < 0);
            req.fileValidationError = 'wrong mimetype';
            return cb(new Error('ONLY_PDFS'));
        }
        cb(null, true);
    }
}).fields([{ name: 'file', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }])

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

app.post('/upload/manuscripts', (req, res) => {
    upload(req, res, (err) => {
        if(err !== void 0){
            console.log('err is :', err);
            res.status(500).send('Error Uploading Manuscript');
        } else {
            res.json('Success');
        }
    })
});

app.post('/upload/biologicalsciences', (req, res) => {
    upload(req, res, (err) => {
        if(err !== void 0){
            console.log('err is :', err);
            res.status(500).send('Error Uploading Biological Science Document');
        } else {
            res.json('Success');
        }
    })
});

app.post('/upload/sciencesociety', (req, res) => {
    upload(req, res, (err) => {
        if(err !== void 0){
            console.log('err is :', err);
            res.status(500).send('Error Uploading Science Society Document');
        } else {
            res.json('Success');
        }
    })
});

app.post('/upload/religionscience', (req, res) => {
    upload(req, res, (err) => {
        if(err !== void 0){
            console.log('err is :', err);
            res.status(500).send('Error Uploading Religion Science Document');
        } else {
            res.json('Success');
        }
    })
});

app.post('/upload/culture', (req, res) => {
    upload(req, res, (err) => {
        if(err !== void 0){
            console.log('err is :', err);
            res.status(500).send('Error Uploading Culture Document');
        } else {
            res.json('Success');
        }
    })
});

app.post('/upload/history', (req, res) => {
    upload(req, res, (err) => {
        if(err !== void 0){
            console.log('err is :', err);
            res.status(500).send('Error Uploading History Document');
        } else {
            res.json('Success');
        }
    })
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

app.use((err, req, res, next) => {
    if (err.code === "ONLY_PDFS") {        
        res.status(422).json({ error: 'One of the files submitted was of the wrong filetype' });
        return;
    }
});

module.exports = app;
