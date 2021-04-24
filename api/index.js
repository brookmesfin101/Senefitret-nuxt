const bodyParser = require('body-parser');
const app = require('express')();
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const fsPromises = fs.promises;

app.use(bodyParser.json());
app.use(cors());

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["pdf", "docx", "doc"];
    if (!allowedTypes.includes(file.mimetype)){
        const error = new Error("Incorrect file");
        error.code = "INCORRECT_FILETYPE";
        return cb(error, false)
    }
    cb(null, true);
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './static')
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
    storage : storage   
})

app.post('/single-file', upload.single('file'), (req, res) => {
  res.json({ data: 'data' });
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
    if (err.code === "INCORRECT_FILETYPE") {
        res.status(422).json({ error: 'Only images are allowed' });
        return;
    }
});

module.exports = app;
