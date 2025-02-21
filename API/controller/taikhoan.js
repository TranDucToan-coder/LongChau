const mysql2 = require('mysql2');
const nodemailer = require("nodemailer");
const PayOS = require('@payos/node');
const { Description } = require('@headlessui/react');

const connect = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Toan2003@@',
    database: 'qlnhathuoclongchau',
    connectTimeout: 3000,
});
const payos = new PayOS(
    '68a19110-25eb-4cd0-b47e-475dce828b43'
    ,'f22e4fcb-7962-456c-8760-a1481b5a657f'
    ,'e4b821ad5eb5ea8edd4a1b345cc4715617f1e5bc168490b71a074961cf31fd9d'
);
const YOUR_DOMAIN = 'http://localhost:5173';

const TaiKhoanController = {
    getTaiKhoan: async(req, res) => {
        try {
            const  email  = req.params.id;
            let query = "Select * from khachhang where Email = ?";
            connect.query(query, [email], (error,results) =>{
                res.status(201).json(results)
            })
        } catch (error) {
            console.log("Failled!")
        }
    },
    getTaiKhoanNhanVien: async(req, res) => {
        try {
            const  email  = req.params.id;
            let query = "Select * from nhanvien where Email = ?";
            connect.query(query, [email], (error,results) =>{
                res.status(201).json(results)
            })
        } catch (error) {
            console.log("Failled!")
        }
    },
    getLoaiTaiKhoan: async(req, res) => {
        try {
            const query = "Select * from taikhoan";
            connect.query(query, (error,results) =>{
                res.status(200).json(results);
            })
        } catch (error) {
            console.log("Failled!")
        }
    },
    getLoaiTaiKhoanById: async(req, res) => {
        try {
            const Email = req.params.id;
            const query = "Select * from taikhoan where Email = ?";
            connect.query(query, [Email],(error,results) =>{
                res.status(200).json(results);
            })
        } catch (error) {
            console.log("Failled!")
        }
    },
    UpdateLoaiTaiKhoanById: async(req, res) => {
        try {
            const Email = req.params.id;
            const LoaiTaiKhoan = req.body;
            const query = "Update taikhoan set LoaiTaiKhoan = ? where Email = ?"
            connect.query(query, [LoaiTaiKhoan, Email],(error,results) =>{
                res.status(200).json(results);
            })
        } catch (error) {
            console.log("Failled!")
        }
    },
    InsertDonHang: async (req, res) => {
        const {TongTien, NgayTaoDonHang, PhuongThucThanhToan, TinhTrangThanhToan, TinhTrangGiaoHang, emailKhachHang, emailNhanVien} = req.body;
        const query = `
            INSERT INTO donhang (TongTien, NgayTaoDonHang, PhuongThucThanhToan, TinhTrangThanhToan, TinhTrangGiaoHang, emailKhachHang, emailNhanVien)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        try {
            connect.query(query, [TongTien, NgayTaoDonHang, PhuongThucThanhToan, TinhTrangThanhToan, TinhTrangGiaoHang, emailKhachHang, emailNhanVien], (err, results) => {
                if (err) {
                    console.error("Error inserting order:", err);
                    return res.status(500).json({success: false, message: "Failed to add order"});
                }
                const orderId = results.insertId; 
                res.status(201).json({success: true, MaDonHang: orderId});
            });
        } catch (error) {
            console.error("Unexpected error:", error);
            res.status(500).json({success: false, message: "Internal server error"});
        }
    },
    InsertChiTietDonHang: async (req, res) => {
        const orderDetails = req.body;  
        console.log("Received order details:", orderDetails);  
        if (!orderDetails || orderDetails.length === 0) {
            return res.status(400).json({ message: 'Không có dữ liệu chi tiết đơn hàng' });
        }
        const values = orderDetails.map(item => [
            item.MaDonHang, 
            item.MaSanPham, 
            item.SoLuongDat, 
            item.DonGia      
        ]);
        const query = `INSERT INTO chitietdonhang (MaDonHang, MaSanPham, SoLuongDat, DonGia) VALUES ?`;
        connect.query(query, [values], (err, results) => {
            if (err) {
                console.error("Error inserting into database:", err);
                return res.status(500).json({ message: 'Lỗi khi thêm chi tiết đơn hàng vào database', error: err.message });
            }
            return res.status(201).json({ message: "Thêm chi tiết đơn hàng thành công", data: results });
        });
    },
    handleOrderDetailsAndUpdateStock: async (req, res) => {
        const orderDetails = req.body;
        console.log("Received Order Details:", orderDetails);
        try {
            const insertDetailsQuery = `INSERT INTO chitietdonhang (MaDonHang, MaSanPham, SoLuongDat, DonGia) VALUES (?, ?, ?, ?)`;
            for (let i = 0; i < orderDetails.length; i++) {
                const { MaDonHang, MaSanPham, SoLuongDat, DonGia } = orderDetails[i];
    
                if (!MaDonHang) {
                    console.error(`Chi tiết đơn hàng thiếu MaDonHang:`, orderDetails[i]);
                    return res.status(400).json({
                        message: `Chi tiết đơn hàng thiếu MaDonHang tại sản phẩm ${MaSanPham}`,
                    });
                }
                await new Promise((resolve, reject) => {
                    connect.query(insertDetailsQuery, [MaDonHang, MaSanPham, SoLuongDat, DonGia * SoLuongDat], (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(results);
                    });
                });
                console.log(`Thêm chi tiết đơn hàng thành công cho sản phẩm: ${MaSanPham}`);
    
                const updateStockQuery = `UPDATE sanpham SET SoLuongTon = SoLuongTon - ? WHERE MaSanPham = ?`;
                await new Promise((resolve, reject) => {
                    connect.query(updateStockQuery, [SoLuongDat, MaSanPham], (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        if (results.affectedRows === 0) {
                            return reject(new Error(`Không tìm thấy sản phẩm với mã ${MaSanPham}`));
                        }
                        resolve(results);
                    });
                });
                console.log(`Cập nhật tồn kho thành công cho sản phẩm: ${MaSanPham}`);
            }
            res.status(200).json({
                message: "Thêm chi tiết đơn hàng và cập nhật tồn kho thành công.",
            });
        } catch (error) {
            console.error("Lỗi khi xử lý đơn hàng và cập nhật tồn kho:", error);
            res.status(500).json({
                message: "Có lỗi xảy ra khi xử lý đơn hàng hoặc cập nhật tồn kho.",
                error: error.message,
            });
        }
    },   
    GetHoaDon: async(req, res) => {
        const query = "Select * from DonHang";
        connect.query(query, (err, results) => {
            res.status(201).json(results)
        })
    },
    GetHoaDonByIdOrder: async(req, res) => {
        const MaDonHang = req.params.id;
        const query = `Select * from donhang 
                       where MaDonHang = ?`;
        connect.query(query, [MaDonHang], (err, results)=>{
        if (err) {
            return res.status(500).json({ message: "Lỗi truy vấn cơ sở dữ liệu", error: err });
        }
    
        if (results.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
        }
        res.status(200).json(results)
        })
    },
    GetHoaDonById: async(req, res) => {
        try {
            console.log("req.params:", req.params);
            const emailKhachHang = req.params.id;
            if (!emailKhachHang) {
                return res.status(400).json({ message: "Thiếu email trong yêu cầu" });
            }
            const query = `Select * from donhang 
                           where donhang.emailKhachHang = ?`;
            connect.query(query, [emailKhachHang], (err, results)=>{
            if (err) {
                return res.status(500).json({ message: "Lỗi truy vấn cơ sở dữ liệu", error: err });
            }
    
            if (results.length === 0) {
                return res.status(404).json({ message: "Không tìm thấy hóa đơn cho khách hàng này" });
            }
            res.status(200).json(results)
        })
        } catch (error) {
            console.log(error)
        }
    },
    GetDetailOfOrder: async(req, res) => {
        const MaDonHang = req.params.id;
        const query = `SELECT MaDonHang, TenSanPham, SoLuongDat, DonGia FROM qlnhathuoclongchau.chitietdonhang, SanPham 
                       where SanPham.MaSanPham = chitietdonhang.MaSanPham and MaDonHang = ?`;
        connect.query(query, [MaDonHang], (err, results)=>{
        if (err) {
            return res.status(500).json({ message: "Lỗi truy vấn cơ sở dữ liệu", error: err });
        }
    
        if (results.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
        }
        res.status(200).json(results)
        })
    },
    UpdateHoaDon: async (req, res) => {
        const MaDonHang = req.params.id;
        const { TinhTrangGiaoHang, TinhTrangThanhToan } = req.body;
        const query = `UPDATE donhang SET TinhTrangThanhToan = ?, TinhTrangGiaoHang = ? WHERE MaDonHang = ?`;
        connect.query(query, [TinhTrangThanhToan, TinhTrangGiaoHang, MaDonHang], (err, results) => {
            if (err) {
                console.error("Database query error:", err);
                return res.status(500).json({ message: "Lỗi truy vấn cơ sở dữ liệu", error: err });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Không tìm thấy đơn hàng cần cập nhật." });
            }
    
            res.status(200).json({ message: "Cập nhật thành công", results });
        });
    },
    sendOTP: async(req, res) => {
        const { email } = req.body;
        const otp = generateOTP();
        const mailOptions = {
            from: "ductoantran17@gmail.com",
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otp}`,
        };
        try{
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "OTP sent successfully!", otp });
        }catch (err){
            console.error("Error sending email:", err);
            res.status(500).json({ message: "Failed to send OTP." });
        }
    },
    //PAYOS
    createPayLink: async(req, res) => {
        const order = {
            amount: 10000,
            description: 'Thanh toán đơn hàng',
            oderCode: 10,
            returnUrl: `${YOUR_DOMAIN}/payment-success`,
            cancelUrl: `${YOUR_DOMAIN}/payment-cancel`
        };
        const PaymentLink = await payos.createPaymentLink(order);
        res.redirect(303, PaymentLink.checkoutUrl)
    },
    Webhook: async(req, res) => {
        const paymentData = req.body;
        const isValid = verifyChecksum(paymentData, 'e4b821ad5eb5ea8edd4a1b345cc4715617f1e5bc168490b71a074961cf31fd9d');
        if (!isValid) {
            return res.status(400).send('Invalid checksum');
        }
        console.log("Thành công")
        InsertDonHang();
        res.json();
    }
}
module.exports = TaiKhoanController

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "anhlatatca17@gmail.com", 
        pass: "Fake love", 
    },
});