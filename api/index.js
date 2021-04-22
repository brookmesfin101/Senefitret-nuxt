const bodyParser = require('body-parser');
const app = require('express')();
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

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

const listPDFS = () => {
    var pdfs = [];
    fs.readdir('./static/pdfs', (err, files) => {
        for (var i = 0; i < files.length; i++) {
            if (files[i].includes('.pdf')) {
                pdfs.push(files[i]);
                console.log(pdfs);
            }
        }
    });
    console.log(pdfs);
    return pdfs;
}

const upload = multer({
    storage : storage   
})

app.post('/single-file', upload.single('file'), (req, res) => {
  res.json({ data: 'data' });
});

app.get('/list-pdfs', async (req, res) => {
    var pdfs = listPDFS();
    res.json({ pdfs });
});

app.use((err, req, res, next) => {
    if (err.code === "INCORRECT_FILETYPE") {
        res.status(422).json({ error: 'Only images are allowed' });
        return;
    }
});

module.exports = app;
