const express = require("express")
const mysql2 = require('mysql2');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

const connect = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Toan2003@@',
    database: 'qlnhathuoclongchau',
    connectTimeout: 3000,
});
const NhanVienController = {
    getNhanVien : async (req, res) => {
        try{
            const query = "SELECT * FROM nhanvien";
            connect.query(query, (err, results) => {
                if(err){
                    return res.status(500).json();
                }
                else
                    return res.status(200).json(results)
            });
        }
        catch(err){
            console.error(err);
        }
    },
    getDetailNhanVien: async(req, res) => {
        try {
            const Email = req.params.id;
            const query = `Select * from nhanvien where Email = ?`
            connect.query(query, [Email], (err, results) => {
                if (err) {
                    console.error('Database query error:', err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                if (results.length === 0) {
                    return res.status(404).json({ message: 'Employee not found' });
                }
                return res.status(200).json(results);
            })} catch (error) {
            
        }
    },
    insertEmployee: async(req, res) => {
        const  {Email, MaSoDienThoaiNhanVien, TenNhanVien, GioiTinh, Tuoi, CCCD, NgayVaoLam, NamLamViec, Luong, SoNgayNghi, LoaiTaiKhoan } = req.body;
        const query2 = `Insert into taikhoan(Email, LoaiTaiKhoan) values(?,?)`
        const query = `INSERT INTO nhanvien (Email, MaSoDienThoaiNhanVien, TenNhanVien, GioiTinh, Tuoi, CCCD, NgayVaoLam, NamLamViec, Luong, SoNgayNghi) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [Email, MaSoDienThoaiNhanVien, TenNhanVien, GioiTinh, Tuoi, CCCD, NgayVaoLam, NamLamViec, Luong, SoNgayNghi];
        connect.query(query2, [Email, LoaiTaiKhoan], (err, results) => {
            connect.query(query, values, (err, results) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400).json("Email đã tồn tại!");
                    } 
                    else {
                        console.error("Database error:", err);
                        return res.status(500).json("Lỗi server. Không thể thêm nhân viên.");
                    }
                }
                res.status(201).json("Thêm thành công!");
            });
        })
    },
    updateEmployee: async(req, res) => {
        const Email = req.params.id;
        const {MaSoDienThoaiNhanVien, TenNhanVien, GioiTinh, Tuoi, CCCD, NgayVaoLam, NamLamViec, Luong, SoNgayNghi} = req.body;
        const query = ` update nhanvien 
                        set 
                        TenNhanVien = ?, 
                        MaSoDienThoaiNhanVien = ?, 
                        GioiTinh = ?, 
                        Tuoi = ?, 
                        CCCD = ?, 
                        NgayVaoLam = ?, 
                        NamLamViec = ?,
                        Luong = ?, 
                        SoNgayNghi = ? 
                        where Email = ? `
        connect.query(query, [TenNhanVien, MaSoDienThoaiNhanVien,GioiTinh,Tuoi,CCCD, NgayVaoLam, NamLamViec ,Luong,SoNgayNghi,Email], 
            (results, err)=>{
                console.log("Converted date:", NgayVaoLam);
                return res.status(200).json(results);
        })
    },
    deleteEmployee: async(req, res) => {
        const Email = req.params.id;
        const query = `DELETE FROM nhanvien WHERE Email = ?`;
        try {
            connect.query(query, [Email], (err, results) => {
                if (err) {
                    console.error("Error deleting employee:", err);
                    return res.status(500).json("Có lỗi xảy ra khi xóa nhân viên!");
                }
    
                if (results.affectedRows === 0) {
                    return res.status(404).json("Không tìm thấy nhân viên với email này!");
                }
                res.status(200).json("Xóa nhân viên thành công!");
            });
        } catch (error) {
            console.error("Error executing delete operation:", error);
            res.status(500).json("Có lỗi xảy ra khi xóa nhân viên!"); 
        }
    },
    getChamCong: async(req, res) => {
        const query = `Select * from chamcong`
        connect.query(query, (err, results) => {
            if(err){
                return res.status(500).json();
            }
            else
                return res.status(200).json(results)
        });
    },
    insertChamCong: async (req, res) => {
        const { Email, DateBatDau, DateKetThuc, ThoiGianLam } = req.body;
    
        const query = `INSERT INTO chamcong (Email, DateBatDau, DateKetThuc, ThoiGianLam) VALUES (?, ?, ?, ?)`;
        connect.query(query, [Email, DateBatDau, DateKetThuc, ThoiGianLam], (err, results) => {
            if (err) {
                console.error("Error when inserting data:", err);
                return res.status(500).json({ message: "Có lỗi xảy ra khi thêm chấm công!" });
            }
            res.status(200).json({ message: "Thêm thông tin chấm công thành công!", insertedId: results.insertId });
        });
    },
    getChamCongByEmail: async (req, res) => {
        const { Email } = req.params;
        const query = `SELECT STT, DateBatDau FROM chamcong WHERE Email = ? ORDER BY STT DESC LIMIT 1`;
        connect.query(query, [Email], (err, results) => {
            if (err) {
                console.error("Error when fetching data:", err);
                return res.status(500).json({ message: "Có lỗi xảy ra khi lấy dữ liệu chấm công!" });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "Không tìm thấy chấm công cho email này!" });
            }
            res.status(200).json(results[0]);
        });
    },    
    updateChamCong: async (req, res) => {
        const { DateKetThuc, ThoiGianLam, STT } = req.body;
        const query = `UPDATE chamcong SET DateKetThuc = ?, ThoiGianLam = ? WHERE STT = ?`;
        connect.query(query, [DateKetThuc, ThoiGianLam, STT], (err, results) => {
            if (err) {
                console.error("Error when updating data:", err);
                return res.status(500).json({ message: "Có lỗi xảy ra khi cập nhật chấm công!" });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Không tìm thấy bản ghi với STT này!" });
            }
            res.status(200).json({ message: "Cập nhật chấm công thành công!" });
        });
    },
    restore : async (req, res) => {
        const backupFilePath = req.body.backupFile; 
        const password = 'Toan2003@@'; 
        const databaseName = 'qlnhathuoclongchau';  

        if (!backupFilePath) {
            return res.status(400).json({ message: 'No backup file provided.' });
        }

        const mysqlPath = `"C:/Program Files/MySQL/MySQL Server 8.0/bin/mysql"`;

        const command = `${mysqlPath} -u root -p${password} ${databaseName} < "${backupFilePath}"`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error restoring database: ${stderr || error.message}`);
                return res.status(500).json({ message: 'Restore failed', error: stderr || error.message });
            }

            console.log('Database restored successfully from:', backupFilePath);
            return res.json({ message: 'Database restored successfully', path: backupFilePath });
        });
    },
    backup : async (req, res) => {
        const mysqldumpPath = `"C:/Program Files/MySQL/MySQL Server 8.0/bin/mysqldump"`;
        const backupPath = `"e:/LearnReactJS/First-Project/src/LastProject/API/controller/backup/backup_${Date.now()}.sql"`;
        const password = 'Toan2003@@';
        const command = `${mysqldumpPath} -u root -p${password} qlnhathuoclongchau > ${backupPath}`;
    
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error creating backup: ${stderr || error.message}`);
                return res.status(500).json({ message: 'Backup failed', error: stderr || error.message });
            }
    
            console.log('Backup created successfully:', backupPath);
            return res.json({ message: 'Backup created successfully', path: backupPath });
        });
    },
}
module.exports = NhanVienController
