const mysql2 = require('mysql2');

const connect = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Toan2003@@',
    database: 'qlnhathuoclongchau',
    connectTimeout: 3000,
});

const HangHoaController = {
    getHangHoa : async (req, res) => {
        try {
            const query = `
                SELECT sp.*, PhanTramGiam ,nsx.NhaSanXuat, nsx.NuocSanXuat , ctsp.*, th.TenThuongHieu,GROUP_CONCAT(sp.HinhAnh) AS DanhSachHinhAnh FROM SanPham sp 
                JOIN NhaSanXuat nsx ON sp.MaNhaSanXuat = nsx.MaNhaSanXuat 
                JOIN ThuongHieu th ON sp.MaThuongHieu = th.MaThuongHieu 
                JOIN chitietsanpham ctsp on sp.MaSanPham = ctsp.MaSanPham
                JOIN giamgia gg ON sp.MaGiamGia = gg.MaGiamGia
                GROUP BY sp.MaSanPham, nsx.NhaSanXuat, nsx.NuocSanXuat, th.TenThuongHieu, PhanTramGiam, ctsp.MaChiTietSanPham
            `;
            connect.query(query, (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Database query error' });
                }
                res.status(200).json(results);
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },
    insertHangHoa: async(req, res) => {
        try {
            const { 
                MaSanPham, TenSanPham, CongDungChinh, ThanhPhanChinh, DoiTuong, DangBaoChe, 
                CachDongGoi, SanPhamCanKeToa, HanDung, SoDangKy, Gia, SoLuongTon, HinhAnh,
                MaGiamGia, MaLoaiSanPham, MaNhaSanXuat, MaThuongHieu
            } = req.body;
            console.log("Received product data:", req.body); 
            const MaChiTietSanPham = `CT${MaSanPham}`;
            if (!MaSanPham || !TenSanPham || !Gia || !SoLuongTon) {
                return res.status(400).json({ error: 'Required fields are missing' });
            }
            const { ThanhPhan, CongDung, CachDung, LuuY, BaoQuan } = req.body;
            const insertProductQuery = `
            INSERT INTO sanpham 
            (MaSanPham, TenSanPham, CongDungChinh, ThanhPhanChinh, DoiTuong, DangBaoChe, 
            CachDongGoi, SanPhamCanKeToa, HanDung, SoDangKy, Gia, SoLuongTon, HinhAnh,
            MaGiamGia, MaLoaiSanPham, MaNhaSanXuat, MaThuongHieu) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const insertProductDetailQuery = `
            INSERT INTO chitietsanpham 
            (MaChiTietSanPham, ThanhPhan, CongDung, CachDung, LuuY, BaoQuan, MaSanPham) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
            connect.query(
                insertProductQuery, 
                [MaSanPham, TenSanPham, CongDungChinh, ThanhPhanChinh, DoiTuong, DangBaoChe, 
                CachDongGoi, SanPhamCanKeToa, HanDung, SoDangKy, Gia, SoLuongTon, HinhAnh,
                MaGiamGia, MaLoaiSanPham, MaNhaSanXuat, MaThuongHieu], 
                (err, productResult) => {
                    if (err) {
                        return res.status(500).json({ error: 'Database error inserting into sanpham', details: err });
                    }
                    connect.query(
                        insertProductDetailQuery, 
                        [MaChiTietSanPham, ThanhPhan, CongDung, CachDung, LuuY, BaoQuan, MaSanPham], 
                        (err, detailResult) => {
                            if (err) {
                                return res.status(500).json({ error: 'Database error inserting into chitietsanpham', details: err });
                            }
                            res.status(200).json({ message: 'Sản phẩm và chi tiết sản phẩm đã được thêm thành công' });
                        }
                    );
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    updateHangHoa : async(req,res) => {
        try {
            const MaSanPham = req.params.id;
            const { TenSanPham, 
                    CongDungChinh,
                    ThanhPhanChinh,
                    DoiTuong,
                    DangBaoChe,
                    CachDongGoi,
                    SanPhamCanKeToa,
                    HanDung,
                    SoDangKy,
                    Gia,
                    SoLuongTon,
                    MaGiamGia,
                    MaLoaiSanPham,
                    MaNhaSanXuat,
                    MaThuongHieu,
                    HinhAnh
                } = req.body;
            const query = `
                UPDATE SANPHAM 
                SET 
                	TenSanPham = ?,
                    CongDungChinh = ?,
                    ThanhPhanChinh = ?,
                    DoiTuong = ?,
                    DangBaoChe = ?,
                    CachDongGoi = ?,
                    SanPhamCanKeToa = ?,
                    HanDung = ?,
                    SoDangKy = ?,
                    Gia = ?,
                    SoLuongTon = ?,
                    MaGiamGia = ?,
                    MaLoaiSanPham = ?,
                    MaNhaSanXuat = ?,
                    MaThuongHieu = ?,
                    HinhAnh = ?
                WHERE MaSanPham = ?
            `
            connect.query(query, [TenSanPham, CongDungChinh,  ThanhPhanChinh,
                DoiTuong, DangBaoChe, CachDongGoi, 
                SanPhamCanKeToa, HanDung, SoDangKy, Gia, SoLuongTon, 
                MaGiamGia, MaLoaiSanPham, MaNhaSanXuat, MaThuongHieu, HinhAnh, MaSanPham] ,(err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Database query error' } + err);
                }
                res.status(200).json(results);
            });
        } catch (error) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },
    deleteProduct: async (req, res) => {
        const MaSanPham = req.params.id;
        const deleteProductDetailQuery = `DELETE FROM chitietsanpham WHERE MaSanPham = ?`;
        const deleteProductQuery = `DELETE FROM sanpham WHERE MaSanPham = ?`;
        try {
            connect.query(deleteProductDetailQuery, MaSanPham, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error deleting product details', details: err });
                }
                connect.query(deleteProductQuery, MaSanPham, (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: 'Database error deleting product', details: err });
                    }
                    res.status(200).json({ message: 'Xóa sản phẩm thành công' });
                });
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getHangHoaASC: async (req, res) => {
        try{
            const query = `
            SELECT sp.*, PhanTramGiam 
            FROM sanpham sp 
            Join giamgia gg ON sp.MaGiamGia = gg.MaGiamGia Order by sp.SoLuongTon 
            ASC limit 10`;
            connect.query(query, (err, results) => {
                res.json(results);
            }) 
        }catch(err){
            res.status(500).json({ error: 'Lỗi khi lấy sản phẩm và sắp xếp' });
        }
    },
    getProductById: async (req, res) => {
        const productId = req.params.id;
        try {
            const query = `
            SELECT sp.*, PhanTramGiam ,nsx.NhaSanXuat, nsx.NuocSanXuat , ctsp.*, th.TenThuongHieu,GROUP_CONCAT(sp.HinhAnh) AS DanhSachHinhAnh FROM SanPham sp 
                JOIN NhaSanXuat nsx ON sp.MaNhaSanXuat = nsx.MaNhaSanXuat 
                JOIN ThuongHieu th ON sp.MaThuongHieu = th.MaThuongHieu 
                JOIN chitietsanpham ctsp on sp.MaSanPham = ctsp.MaSanPham
                JOIN giamgia gg ON sp.MaGiamGia = gg.MaGiamGia
                Where sp.MaSanPham = ?
                GROUP BY sp.MaSanPham, nsx.NhaSanXuat, nsx.NuocSanXuat, th.TenThuongHieu, PhanTramGiam,ctsp.MaChiTietSanPham;
            `;
            connect.query(query, [productId], (err, results) => {
                if (err) {
                    console.error('Database query error:', err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                if (results.length === 0) {
                    return res.status(404).json({ message: 'Product not found' });
                }
                return res.status(200).json(results); 
            });
        } catch (err) {
            console.error('Unexpected error:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    getProductByOOP: async(req, res) => {
        const DoiTuong = req.query.DoiTuong;
        let sql = "Select *, ha.DuongDan from qlnhathuoclongchau.sanpham JOIN giamgia on sanpham.MaGiamGia = giamgia.MaGiamGia JOIN hinhanh ha ON sanpham.MaSanPham = ha.MaSanPham ";
        if (DoiTuong) {
            sql += ` WHERE DoiTuong LIKE ?`;
        }
        const queryValues = `%${DoiTuong}%`;
        connect.query(sql, queryValues ,(error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json(results)});
    },
    getPopularCategory: async(req, res) => {
        let sql = " select sp.MaLoaiSanPham, TenLoaiSanPham, count(*) as 'SoLoaiSanPham' from sanpham sp join loaisanpham lsp on sp.MaLoaiSanPham = lsp.MaLoaiSanPham group by MaLoaiSanPham, 'SoLoaiSanPham' order by 'SoLoaiSanPham' ASC  limit 8";
        connect.query(sql, (err, results) =>{
            if(err)
                return res.status(500).json(err);
            else
                res.status(200).json(results);
        })
    },
    getBrand: async(req, res) => {
        let sql ="select * from ThuongHieu";
        connect.query(sql, (err, results) =>{
        if(err)
            return res.status(500).json(err);
        else
            res.status(200).json(results);
        })
    },
    getBrandByID: async(req, res) => {
        const MaThuongHieu = req.params.id;
        let sql ="select * from ThuongHieu where MaThuongHieu = ?";
        connect.query(sql, MaThuongHieu,(err, results) =>{
        if(err)
            return res.status(500).json(err);
        else
            res.status(200).json(results);
        })
    },
    updateBrand: async(req, res) => {
        const MaThuongHieu = req.params.id;
        const {TenThuongHieu, MoTaThuongHieu, DuongDanHinhAnh} = req.body;
        const query = `Update ThuongHieu set TenThuongHieu = ?, MoTaThuongHieu = ?, DuongDanHinhAnh = ? where MaThuongHieu = ?`;
        connect.query(query, [TenThuongHieu, MoTaThuongHieu, DuongDanHinhAnh, MaThuongHieu], (err, results) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(results);
        })
    },
    deleteBrand: async(req, res) => {
        const MaThuongHieu = req.params.id;
        const query = `Delete from ThuongHieu where MaThuongHieu = ?`;
        connect.query(query, [MaThuongHieu], (err, results) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(results);
        })
    },
    insertBrand: async(req, res) => {
        const {MaThuongHieu, TenThuongHieu, MoTaThuongHieu, DuongDanHinhAnh} = req.body;
        const query = `Insert into ThuongHieu(MaThuongHieu, TenThuongHieu, MoTaThuongHieu, DuongDanHinhAnh) values(?,?,?,?)`
        connect.query(query, [MaThuongHieu, TenThuongHieu, MoTaThuongHieu, DuongDanHinhAnh],(err, results) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(results);
        })
    },
    getType: async(req, res) => {
        let sql ="select * from LoaiSanPham";
        connect.query(sql, (err, results) =>{
        if(err)
            return res.status(500).json(err);
        else
            res.status(200).json(results);
        })
    },
    updateType: async(req, res) => {
        const MaLoaiSanPham = req.params.id;
        const {TenLoaiSanPham, MaDanhMuc} = req.body;
        const query = `Update LoaiSanPham set TenLoaiDanhMuc = ?, MaDanhMuc = ? where MaLoaiSanPham = ?`;
        connect.query(query, [TenLoaiSanPham, MaDanhMuc, MaLoaiSanPham], (err, results) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(results);
        })
    },
    deleteType: async(req, res) => {
        const MaLoaiSanPham = req.params.id;
        const query = `Delete from LoaiSanPham where MaLoaiSanPham = ?`;
        connect.query(query, [MaLoaiSanPham], (err, results) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(results);
        })
    },
    insertType: async(req, res) => {
        const {MaLoaiSanPham, TenLoaiSanPham, MaDanhMuc} = req.body;
        const query = `Insert into LoaiSanPham(MaLoaiSanPham, TenLoaiSanPham, MaDanhMuc) values(?,?,?)`
        connect.query(query, [MaLoaiSanPham, TenLoaiSanPham, MaDanhMuc],(err, results) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(results);
        })
    },
    getDiscount: async(req, res) => {
        const sql = `select * from GiamGia`;
        connect.query(sql, (err, results) =>{
        if(err)
            return res.status(500).json(err);
        else
            res.status(200).json(results);
        })
    },
    updateDiscount: async(req, res) => {
        const MaGiamGia = req.params.id;
        const {PhanTramGiam} = req.body;
        const query = `Update GiamGia set PhanTramGiam = ? where MaGiamGia = ?`;
        connect.query(query, [PhanTramGiam, MaGiamGia], (err, results) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(results);
        })
    },
    deleteDiscount: async(req, res) => {
        const MaGiamGia = req.params.id;
        const query = `Delete from GiamGia where MaGiamGia = ?`;
        connect.query(query, [MaGiamGia], (err, results) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(results);
        })
    },
    insertDiscount: async(req, res) => {
        const {MaGiamGia, PhanTramGiam} = req.body;
        const query = `Insert into GiamGia(MaGiamGia, PhanTramGiam) values(?,?)`
        connect.query(query, [MaGiamGia, PhanTramGiam],(err, results) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(results);
        })
    },
    getManufacturer: async(req, res) => {
        const sql = `select * from NhaSanXuat`;
        connect.query(sql, (err, results) =>{
        if(err)
            return res.status(500).json(err);
        else
            res.status(200).json(results);
        })
    },
    getManufacturerById: async(req, res) => {
        const MaNhaSanXuat = req.params.id;
        const sql = `select * from NhaSanXuat where MaNhaSanXuat = ?`;
        connect.query(sql, MaNhaSanXuat,(err, results) =>{
        if(err)
            return res.status(500).json(err);
        else
            res.status(200).json(results);
        })
    },
    updateManufacturer: async(req, res) => {
        const MaNhaSanXuat = req.params.id;
        const {NhaSanXuat, NuocSanXuat} = req.body;
        const query = `Update NhaSanXuat set NhaSanXuat = ?, NuocSanXuat = ? where MaNhaSanXuat = ?`;
        connect.query(query, [NhaSanXuat, NuocSanXuat, MaNhaSanXuat], (err, results) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(results);
        })
    },
    deleteManufacturer: async(req, res) => {
        const MaNhaSanXuat = req.params.id;
        const query = `Delete from NhaSanXuat where MaNhaSanXuat = ?`;
        connect.query(query, [MaNhaSanXuat], (err, results) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(results);
        })
    },
    insertManufacturer: async(req, res) => {
        const {MaNhaSanXuat, NhaSanXuat, NuocSanXuat} = req.body;
        const query = `Insert into NhaSanXuat(MaNhaSanXuat, NhaSanXuat, NuocSanXuat) values(?,?,?)`
        connect.query(query, [MaNhaSanXuat, NhaSanXuat, NuocSanXuat],(err, results) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(results);
        })
    },
//Main page
    getCatogery: async(req, res) => {
        const query = `Select * from danhmuc`
        connect.query(query, (err,results) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(results);
        })
    },
    getProductFilterByBrain: async(req, res) => {
        const MaThuongHieu = req.params.id;
        let sql = `SELECT sp.*, PhanTramGiam FROM sanpham sp 
        Join giamgia gg ON sp.MaGiamGia = gg.MaGiamGia 
        JOIN thuonghieu th ON sp.MaThuongHieu = th.MaThuongHieu 
        where th.MaThuongHieu = ?`;
        connect.query(sql, [MaThuongHieu],(err, results) =>{
            if(err)
                return res.status(500).json(err);
            else
                res.status(200).json(results);
        })
    },
    getProductFilterByPrice: async(req, res) => {
        let { min, max } = req.query;
        let sql = " SELECT sp.*, PhanTramGiam FROM sanpham sp Join giamgia gg ON sp.MaGiamGia = gg.MaGiamGia JOIN thuonghieu th ON sp.MaThuongHieu = th.MaThuongHieu where sp.Gia >= ? and sp.Gia <= ?";
        connect.query(sql, [min ,max],(err, results) =>{
            if(err)
                return res.status(500).json(err);
            else
                res.status(200).json(results);
        })
    },
    getTypeOfProduct1: async(req, res) => {
        let sql = "Select * from loaisanpham where MaDanhMuc = 'DM001'";
        connect.query(sql, (err, results) => {
            if(err)
                return res.status(500).json(err);
            else
                res.status(200).json(results);
        });
    },
    getTypeOfProduct2: async(req, res) => {
        let sql = "Select * from loaisanpham where MaDanhMuc = 'DM002'";
        connect.query(sql, (err, results) => {
            if(err)
                return res.status(500).json(err);
            else
                res.status(200).json(results);
        });
    },
    getTypeOfProduct3: async(req, res) => {
        let sql = "Select * from loaisanpham where MaDanhMuc = 'DM003'";
        connect.query(sql, (err, results) => {
            if(err)
                return res.status(500).json(err);
            else
                res.status(200).json(results);
        });
    },
    getTypeOfProduct4: async(req, res) => {
        let sql = "Select * from loaisanpham where MaDanhMuc = 'DM004'";
        connect.query(sql, (err, results) => {
            if(err)
                return res.status(500).json(err);
            else
                res.status(200).json(results);
        });
    },
    getTypeOfProduct5: async(req, res) => {
        let sql = "Select * from loaisanpham where MaDanhMuc = 'DM005'";
        connect.query(sql, (err, results) => {
            if(err)
                return res.status(500).json(err);
            else
                res.status(200).json(results);
        });
    },
    getProductByType: async(req,res) => {
        const MaLoaiSanPham = req.params.id;
        console.log("Received MaLoaiSanPham:", MaLoaiSanPham);
        let sql = `SELECT sp.*, PhanTramGiam
                    FROM sanpham sp 
                    Join giamgia gg ON sp.MaGiamGia = gg.MaGiamGia 
                    where MaLoaiSanPham = ?`;
        connect.query(sql, [MaLoaiSanPham], (err, results) => {
            if(err)
                return res.status(500).json(err);
            else
                res.status(200).json(results);
        })
    },
}
module.exports = HangHoaController;