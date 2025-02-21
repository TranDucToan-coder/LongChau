const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const router = express.Router();
const NhanVienController = require('../controller/nhanvien')
const HangHoaController = require('../controller/hanghoa')
const TaiKhoanController = require('../controller/taikhoan');
const KhachHangController = require('../controller/khachhang')

router.get('/data', NhanVienController.getNhanVien)
router.get('/data/:id', NhanVienController.getDetailNhanVien)
router.put('/data/Update/:id', NhanVienController.updateEmployee)
router.post('/data/New', NhanVienController.insertEmployee)
router.delete('/data/Delete/:id',NhanVienController.deleteEmployee)

router.get('/dataHangHoa', HangHoaController.getHangHoa)
router.get('/dataHangHoa/:id', HangHoaController.getProductById)
router.put('/dataHangHoa/Update/:id', HangHoaController.updateHangHoa)
router.delete('/dataHangHoa/Delete/:id', HangHoaController.deleteProduct)
router.post('/dataHangHoa/New', HangHoaController.insertHangHoa)

router.get('/dataHangHoaASC/', HangHoaController.getHangHoaASC)
router.get('/dataHangHoaOOP', HangHoaController.getProductByOOP)
router.get('/dataPopularCategory', HangHoaController.getPopularCategory)

router.get('/Brand', HangHoaController.getBrand)
router.get('/Brand/:id', HangHoaController.getBrandByID)
router.get('/dataFilterByBrand/:id', HangHoaController.getProductFilterByBrain)
router.put('/Brand/Update/:id', HangHoaController.updateBrand)
router.delete('/Brand/Delete/:id', HangHoaController.deleteBrand)
router.post('/Brand/New', HangHoaController.insertBrand)

router.get('/dataFilterByPrice', HangHoaController.getProductFilterByPrice)
router.get('/Type', HangHoaController.getType)
router.post('/Type/New', HangHoaController.insertType)
router.put('/Type/Update/:id', HangHoaController.updateType)
router.delete('/Type/Delete/:id', HangHoaController.deleteType)

router.get('/Discount', HangHoaController.getDiscount)
router.post('/Discount/New', HangHoaController.insertDiscount)
router.put('/Discount/Update/:id', HangHoaController.updateDiscount)
router.delete('/Discount/Delete/:id', HangHoaController.deleteDiscount)

router.get('/Manufacturer', HangHoaController.getManufacturer)
router.get('/Manufacturer/:id', HangHoaController.getManufacturerById)
router.post('/Manufacturer/New', HangHoaController.insertManufacturer)
router.put('/Manufacturer/Update/:id', HangHoaController.updateManufacturer)
router.delete('/Manufacturer/Delete/:id', HangHoaController.deleteManufacturer)

router.get('/Category', HangHoaController.getCatogery)

router.get('/TypeOfProduct1', HangHoaController.getTypeOfProduct1)
router.get('/TypeOfProduct2', HangHoaController.getTypeOfProduct2)
router.get('/TypeOfProduct3', HangHoaController.getTypeOfProduct3)
router.get('/TypeOfProduct4', HangHoaController.getTypeOfProduct4)
router.get('/TypeOfProduct5', HangHoaController.getTypeOfProduct5)

router.get('/TypeOfProduct/:id', HangHoaController.getProductByType)

router.get('/Account/:id', TaiKhoanController.getTaiKhoan)

router.get('/TypeAc', TaiKhoanController.getLoaiTaiKhoan)
router.get('/TypeAc/:id', TaiKhoanController.getLoaiTaiKhoanById)
router.put('/TypeAc/Update/:id', TaiKhoanController.UpdateLoaiTaiKhoanById)
router.post('/sendOTP', TaiKhoanController.sendOTP)

router.post('/AddDonHang', TaiKhoanController.InsertDonHang)

router.get('/OrderPage', TaiKhoanController.GetHoaDon)
router.get('/Account/Order/:id', TaiKhoanController.GetHoaDonById)
router.get('/OrderPage/:id',TaiKhoanController.GetHoaDonByIdOrder)
router.put('/OrderPage/Update/:id', TaiKhoanController.UpdateHoaDon)
router.post('/OrderPage/AddDetails', TaiKhoanController.handleOrderDetailsAndUpdateStock)
router.get('/OrderPage/DetailOfOrder/:id', TaiKhoanController.GetDetailOfOrder)

router.post('/webhook/payos', TaiKhoanController.Webhook)
router.post('/webhook/createLink', TaiKhoanController.createPayLink)

router.get('/Customer', KhachHangController.getKhachHang)
router.get('/Customer/:id', KhachHangController.getKhachHangById)
router.post('/Customer/New', KhachHangController.insertKhachHang)
router.put('/Customer/Update/:id', KhachHangController.updateKhachHang)
router.delete('/Customer/Delete/:id', KhachHangController.deleteKhachHang)

router.get('/tableChamCong', NhanVienController.getChamCong)
router.post('/chamcong', NhanVienController.insertChamCong)
router.get('/getchamcong/:Email', NhanVienController.getChamCongByEmail);
router.put('/ketthucchamcong', NhanVienController.updateChamCong)

router.post('/backup', NhanVienController.backup)

const TEMP_DIR = path.join(__dirname, '../uploads'); 
if (!fs.existsSync(TEMP_DIR)){
    fs.mkdirSync(TEMP_DIR);
}
router.post('/restore', (req, res) => {
    const file = req.files?.backupFile;

    if (!file) {
        return res.status(400).json({ message: 'No backup file provided.' });
    }

    const backupFilePath = path.join(TEMP_DIR, file.name);
    file.mv(backupFilePath, (err) => {
        if (err) {
            console.error('Error saving file:', err);
            return res.status(500).json({ message: 'Error saving backup file.', error: err });
        }

        const mysqldumpPath = `"C:/Program Files/MySQL/MySQL Server 8.0/bin/mysql"`; 
        const password = 'Toan2003@@';
        const databaseName = 'qlnhathuoclongchau'; 

        const command = `${mysqldumpPath} -u root -p${password} ${databaseName} < ${backupFilePath}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error restoring database: ${stderr || error.message}`);
                return res.status(500).json({ message: 'Restore failed', error: stderr || error.message });
            }
            console.log('Database restored successfully from:', backupFilePath);
            return res.json({ message: 'Database restored successfully', path: backupFilePath });
        });
    });
});



module.exports = router;