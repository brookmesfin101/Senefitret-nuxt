const bodyParser = require('body-parser');
const app = require('express')();
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const fsPromises = fs.promises;

app.use(bodyParser.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: function(req, file, cb) {        
        if(String(file.mimetype).includes('application/pdf')){            
            cb(null, './static/pdfs');
        } else {            
            cb(null, './static');
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const getManuscript_PDFs = async() => {
    try {
        return await fsPromises.readdir('./static/pdfs');
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

const upload = multer({
    storage : storage,
    fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        
        if(ext !== '.pdf') {
            req.fileValidationError = 'wrong mimetype';
            return cb(new Error('ONLY_PDFS'));
        }
        cb(null, true);
    }
}).single('file');

app.post('/single-file', (req, res) => {    
  upload(req, res, (err) => {
      if(err !== void 0){        
        res.status(500).send('Error Uploading Single File');
      } else {        
        res.json('Success');
      }
  });
});

// app.post('/single-file', (req, res) => {
//     upload(req, res, function(err) {
//         console.log(req);
//         if(req.fileValidationError){
//             console.log(req.fileValidationError);
//             return res.end(req.fileValidationError);
//         }
//     })
// })

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
        console.log("INCORRECT_FILETYPE");
        res.status(422).json({ error: 'Only images are allowed' });
        return;
    }
});

module.exports = app;
