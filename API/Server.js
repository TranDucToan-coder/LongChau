const express = require('express');
const fileUpload = require('express-fileupload');
const mysql2 = require('mysql2');
const cors = require('cors');
const path = require('path');

const router = require('./route/route')

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

const connect = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Toan2003@@',
    database: 'qlnhathuoclongchau',
    connectTimeout: 3000,
});
connect.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});



app.use('/HinhAnhNhaThuocLongChau', express.static(path.join(__dirname, 'HinhAnhNhaThuocLongChau')));
app.use('/ThuongHieu', express.static(path.join(__dirname, 'ThuongHieu')));

app.use("/", router);

app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
})
module.exports = connect