const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const morgan = require('morgan');
const mysqlConnection = require('./database');
const fs = require('fs').promises;


const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan('dev'));


//SUBIR IMAGENES CON MULTER

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {

        cb(null, file.originalname)
    }

});

const upload = multer({ storage });

//SUBIR IMAGENES Y PASSWORD

app.post('/file', upload.single('file'), async(req, res, next) => {

    const file = req.file;
    const password = req.body.password;

    let passwordHash = await bcrypt.hash(password, 8);

    const filesImg = {

        id: null,
        nombre: file.filename,
        imagen: file.path,
        password: passwordHash,

    }

    if (!file) {

        const error = new Error('No file');
        error.httpStatusCode = 400;
        return next(error);

    }

    res.send(file)
    console.log(filesImg);

    mysqlConnection.query('INSERT INTO files set ?', [filesImg]);

});

// //MOSTRAR TODA LAS IMAGENES

// app.get('/upload', (req, res) => {

//     mysqlConnection.query('SELECT * FROM files', (err, rows, fileds) => {

//         if (!err) {

//             res.json(rows);

//         } else {

//             console.log(err);
//         }

//     });

// });

// //MOSTRAR UNA SOLA IMAGEN

// app.get('/imagen/:id', (req, res) => {

//     const id = req.params.id;

//     mysqlConnection.query('SELECT imagen FROM files WHERE id = ?', id, (err, rows, fields) => {
//         [{ imagen }] = rows;

//         res.send({ imagen });
//     });

// });




// //ELIMINAR IMAGENES

// app.delete('/delete/:id', (req, res) => {

//     const { id } = req.params;
//     deleteFile(id);
//     mysqlConnection.query('DELETE FROM files WHERE id=?', [id]);
//     res.json({ message: "Imagen y password eliminados correctamente" });

// });

// function deleteFile(id) {

//     mysqlConnection.query('SELECT * FROM files WHERE id = ?', [id], (err, rows, fields) => {

//         [{ imagen }] = rows;

//         fs.unlink(path.resolve('./' + imagen)).then(() => {
//             console.log('Imagen eliminada del servidor');
//         })
//     });

// }

// //LOGIN

// app.post('/auth/:id', (req, res) => {

//     const id = req.params.id;

//     let pass = req.body.password;

//     mysqlConnection.query('SELECT id, password FROM files WHERE id= ?', id, (err, rows, fields) => {


//         [{ password }] = rows;

//         let passVerificado = bcrypt.compareSync(pass, password);

//         if (!passVerificado) {

//             res.status('400').json({ message: 'El password es invalido' });

//         } else {

//             res.send({ message: 'OK' });

//         }

//     })

// });




//PUERTO DE CONEXIÓN

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000...');
});