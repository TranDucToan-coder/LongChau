const mysql2 = require('mysql2');

const connect = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Toan2003@@',
    database: 'qlnhathuoclongchau',
    connectTimeout: 3000,
});

const KhachHangController = {
    getKhachHang: async(req, res) => {
        try {
            const  email  = req.params.id;
            let query = "Select * from khachhang";
            connect.query(query, [email], (error,results) =>{
                res.status(200).json(results);
            })
        } catch (error) {
            console.log("Failled!")
        }
    },
    getKhachHangById: async(req, res) => {
        try {
            const  email  = req.params.id;
            let query = "Select * from khachhang where Email = ?";
            connect.query(query, [email], (error,results) =>{
                res.status(200).json(results);
            })
        } catch (error) {
            console.log("Failled!")
        }
    },
    updateKhachHang: async(req, res) => {
        try {
            const Email = req.params.id;
            const {MaSoDienThoaiKhachHang, TenKhachHang, GioiTinh, DiaChi} = req.body;
            const query =`Update khachhang set MaSoDienThoaiKhachHang = ?, TenKhachHang = ?, GioiTinh = ?, DiaChi = ? where Email = ?`;
            connect.query(query, [MaSoDienThoaiKhachHang, TenKhachHang, GioiTinh, DiaChi, Email], (err, results) => {
                res.status(200).json(results);
            })
        } catch (error) {
            console.log("Failled!")
        }
    },
    deleteKhachHang: async(req, res) => {
        const Email = req.params.id;
        const query = `Delete from khachhang where Email = ?`;
        const query2 = `Delete from taikhoan where Email = ?`;
        connect.query(query, Email, (err, results) => {
            if(query)
            {
                connect.query(query2, Email, (err, results) => {
                    if(query2)
                        res.status(200).json("Xóa tài khoản thành công!")
                })
            }
        })
    },
    insertKhachHang: async(req, res) => {
        const {Email, LoaiTaiKhoan, MaSoDienThoaiKhachHang, TenKhachHang, GioiTinh, DiaChi} = req.body;
        const query1 = `INSERT INTO taikhoan (Email, LoaiTaiKhoan) VALUES (?, ?)`;
        const query2 = `INSERT INTO khachhang (Email, MaSoDienThoaiKhachHang, TenKhachHang, GioiTinh, DiaChi) VALUES (?, ?, ?, ?, ?)`;
        try {
            connect.query(query1, [Email, LoaiTaiKhoan], (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error inserting into taikhoan', details: err });
                }
                connect.query(query2, [Email, MaSoDienThoaiKhachHang, TenKhachHang, GioiTinh, DiaChi], (err, results) => {
                    if (err) {
                        return res.status(500).json({ error: 'Database error inserting into khachhang', details: err });
                    }
                    res.status(200).json({ message: 'Khach hang đã được thêm thành công' });
                })
            })
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = KhachHangController