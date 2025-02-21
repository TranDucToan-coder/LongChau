import React, { useState } from "react";
import '../CSS/ManagePage.css'
import EmployeeDetail from "./EmployeeDetail";
import edit from '../Image/edit-3-svgrepo-com.svg'
import account from '../Image/account-settings-svgrepo-com.svg'
import bin from '../Image/bin-svgrepo-com.svg'
import detail from '../Image/detail-2-svgrepo-com.svg'
import minisize from '../Image/return-svgrepo-com.svg'
import person from '../Image/person-team-svgrepo-com.svg'
import product from '../Image/product-management-svgrepo-com.svg'
import manufacturer from '../Image/manufacturer-svgrepo-com.svg'
import backUp from '../Image/backup-svgrepo-com.svg'
import count from '../Image/alt-bell-svgrepo-com.svg'
import supplier from '../Image/jakdojade-svgrepo-com.svg'
import more from '../Image/more-horizontal-svgrepo-com.svg'
import customer from '../Image/customer-list-line-svgrepo-com.svg'
import order from '../Image/order-1-svgrepo-com.svg'
import axios from "axios";

import {Routes, Route, Link, useLocation, useParams, useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { jsPDF } from "jspdf";
import ProductDetail from "./ProductDetail";
function NhanSu(){
    const [Employee, setEmployees] = useState([]);
    const [visible, isVisible] = useState(false);
    const Email = useParams();
    const [newEmployee, setNewEmployee] = useState({
        Email: '',
        TenNhanVien: '',
        Tuoi: '',
        GioiTinh: 'Nam',
        MaSoDienThoaiNhanVien: '',
        CCCD: '',
        NgayVaoLam: new Date().toISOString().split('T')[0],
        NamLamViec: 0,
        Luong: 5000000,
        SoNgayNghi: 0,
        LoaiTaiKhoan: "0"
    });
    const getData = async (res, req) =>{
        const response = await axios.get("http://localhost:4000/data")
        if(response) {
            setEmployees(response.data)
        }
        else{
            console.log("Failed");
        }
    }
    useEffect(() => {
        getData();
    }, [Email])
    const HandleClick = (e) => {
        isVisible(!visible);
    }
    const handleEmailChange = (e) => setNewEmployee((prev) => ({ ...prev, Email: e.target.value }));
    const handleNameChange = (e) => setNewEmployee((prev) => ({ ...prev, TenNhanVien: e.target.value }));
    const handleAgeChange = (e) => setNewEmployee((prev) => ({ ...prev, Tuoi: e.target.value }));
    const handleGenderChange = (e) => setNewEmployee((prev) => ({ ...prev, GioiTinh: e.target.value }));
    const handlePhoneChange = (e) => setNewEmployee((prev) => ({ ...prev, MaSoDienThoaiNhanVien: e.target.value }));
    const handleCCCDChange = (e) => setNewEmployee((prev) => ({ ...prev, CCCD: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(newEmployee.Email === null && newEmployee.TenNhanVien === null && newEmployee.Tuoi === null && newEmployee.CCCD === null && newEmployee.MaSoDienThoaiNhanVien === null)
        {
            alert('Vui lòng điền đầy đủ thông tin!')
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(newEmployee.Email)) {
            alert("Email không hợp lệ!");
            return;
        }
        
        if (isNaN(newEmployee.Tuoi) || newEmployee.Tuoi < 18) {
            alert("Tuổi phải là số hợp lệ và lớn hơn hoặc bằng 18!");
            return;
        }
        try {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0];
            const response = await axios.post("http://localhost:4000/data/New", newEmployee);
            if (response.status === 201) {
                alert("Thêm nhân viên thành công!");
                isVisible(false);
                setNewEmployee({
                    Email: '',
                    MaSoDienThoaiNhanVien: '',
                    TenNhanVien: '',
                    GioiTinh: '',
                    Tuoi: 0,
                    CCCD: '',
                    NgayVaoLam: formattedDate,
                    NamLamViec: 0,
                    Luong: 5000000,
                    SoNgayNghi: 0,
                    LoaiTaiKhoan: "0"
                });
                getData();
            }
        } catch (error) {
            console.error("Error adding employee:", error);
            alert("Failed to add employee. Please try again.");
        }
    };
    return(
        <div className="ManageProduct">
            <div><button onClick={HandleClick}>Thêm nhân viên</button></div>
            {visible && (
                <table>
                    <tr>
                        <td>Email: </td>
                        <td><input type="text" value={newEmployee.Email} onChange={handleEmailChange} required></input></td>
                    </tr>
                    <tr>
                        <td>Họ Tên: </td>
                        <td><input type="text" value={newEmployee.TenNhanVien} onChange={handleNameChange} required></input></td>
                    </tr>
                    <tr>
                        <td>Tuổi: </td>
                        <td><input type="text" value={newEmployee.Tuoi} onChange={handleAgeChange} required></input></td>
                    </tr>
                    <tr>
                        <td>Giới tính: </td>
                        <td><select value={newEmployee.GioiTinh} onChange={handleGenderChange}>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Số điện thoại: </td>
                        <td><input type="text" value={newEmployee.MaSoDienThoaiNhanVien} onChange={handlePhoneChange} required></input></td>
                    </tr>
                    <tr>
                        <td>Căn cước công dân: </td>
                        <td><input type="text" value={newEmployee.CCCD} onChange={handleCCCDChange} required></input></td>
                    </tr>
                    <tr>
                        <td><button onClick={handleSubmit}>Thêm</button></td>
                    </tr>
                </table>
            )}
            <table className="table_Employee">
                <tr className="title">
                    <td colSpan={2}>Email</td>
                    <td>Họ tên nhân viên</td>
                    <td>Số điện thoại</td>
                    <td>#</td>
                </tr>
                <tbody>
                    {Employee.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.Email}</td>
                            <td></td>
                            <td>{employee.TenNhanVien}</td>
                            <td>{employee.MaSoDienThoaiNhanVien}</td>
                            <td id="detail"><Link to={`/ManagePage/NhanSu/${employee.Email}`}><img src={detail}></img></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
function HangHoa(){
    const [data, setData] = useState([]);
    const [dataBrand, setDataBrand] = useState([]);
    const [dataType, setDataType] = useState([]);
    const [dataDiscount, setDataDiscount] = useState([]);
    const [dataManufacturer, setDataManufacturer] = useState([]);

    const [visible, isVisible] = useState(false);
    //Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    const [totalProducts, setTotalProducts] = useState(0);
    //Sản phẩm mới
    const [newProduct, setNewProduct] = useState({
        MaSanPham: '',
        TenSanPham: '',
        CongDungChinh: '',
        ThanhPhanChinh: '',
        DoiTuong: '',
        DangBaoChe: '',
        CachDongGoi: '',
        SanPhamCanKeToa: '0', 
        HanDung: '',
        SoDangKy: '', 
        Gia: 0,
        SoLuongTon: 0,
        HinhAnh: '', 
        MaGiamGia: 'GG001',
        MaLoaiSanPham: 'LSP001',
        MaNhaSanXuat: 'NSX001',
        MaThuongHieu: 'TH001',
        ThanhPhan: 'none',
        CongDung: 'none',
        CachDung: 'none',
        LuuY: 'none',
        BaoQuan: 'none'
    });
    const HandleChangeId = (e) => setNewProduct(prev => ({...prev, MaSanPham: e.target.value}))
    const HandleChangeName = (e) => setNewProduct(prev => ({...prev, TenSanPham: e.target.value}))
    const HandleChangeCongDung = (e) => setNewProduct(prev => ({...prev, CongDungChinh: e.target.value}))
    const HandleChangeThanhPhan = (e) => setNewProduct(prev => ({...prev, ThanhPhanChinh: e.target.value}))
    const HandleChangeDoiTuong = (e) => setNewProduct(prev => ({...prev, DoiTuong: e.target.value}))
    const HandleChangeDangBaoChe = (e) => setNewProduct(prev => ({...prev, DangBaoChe: e.target.value}))
    const HandleChangeCachDongGoi = (e) => setNewProduct(prev => ({...prev, CachDongGoi: e.target.value}))
    const HandleChangeSanPhamKeToa = (e) => setNewProduct(prev => ({...prev, SanPhamCanKeToa: e.target.value}))
    const HandleChangeHanDung = (e) => setNewProduct(prev => ({...prev, HanDung: e.target.value}))
    const HandleChangeSoDangKy = (e) => setNewProduct(prev => ({...prev, SoDangKy: e.target.value}))
    const HandleChangeGia = (e) => setNewProduct(prev => ({...prev, Gia: e.target.value}))
    const HandleChangSoLuongTon = (e) => setNewProduct(prev => ({...prev, SoLuongTon: e.target.value}))
    const HandleChangeHinhAnh = (e) => {
        const file = e.target.files[0];
        setNewProduct(prev => ({...prev, HinhAnh: file ? file.name : ''}))
    }
    const HandleChangeMaGiamGia = (e) => setNewProduct(prev => ({...prev, MaGiamGia: e.target.value}))
    const HandleChangeMaLoaiSanPham = (e) => setNewProduct(prev => ({...prev, MaLoaiSanPham: e.target.value}))
    const HandleChangeMaNhaSanXuat = (e) => setNewProduct(prev => ({...prev, MaNhaSanXuat: e.target.value}))
    const HandleChangeMaThuongHieu = (e) => setNewProduct(prev => ({...prev, MaThuongHieu: e.target.value}))

    const getHangHoa = async(res, req) =>  {
        const response = await axios.get('http://localhost:4000/dataHangHoa')
        const response2 = await axios.get(`http://localhost:4000/Brand`);
        const response3 = await axios.get(`http://localhost:4000/Type`);
        const response4 = await axios.get(`http://localhost:4000/Discount`);
        const response5 = await axios.get(`http://localhost:4000/Manufacturer`);
        if(response)
        {
            setData(response.data);
            setDataBrand(response2.data);
            setDataType(response3.data);
            setDataDiscount(response4.data);
            setDataManufacturer(response5.data);
            setTotalProducts(response.data.length);
        }
        else
            console.log("Failed!");
    }
    useEffect(() => {
        getHangHoa();
        
    },[])
    const HandleClick = (e) => {
        isVisible(!visible);
    }

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }
    const Submit = async() => {
        try{
            const response = await axios.post('http://localhost:4000/dataHangHoa/New', newProduct)
            if(response.status == 200)
            {
                alert("Employee added successfully!");
                isVisible(false);
                setNewProduct({
                    MaSanPham: '',
                    TenSanPham: '',
                    CongDungChinh: '',
                    ThanhPhanChinh: '',
                    DoiTuong: '',
                    DangBaoChe: '',
                    CachDongGoi: '',
                    SanPhamCanKeToa: '0', 
                    HanDung: '',
                    SoDangKy: '', 
                    Gia: 0,
                    SoLuongTon: 0,
                    HinhAnh: '', 
                    MaGiamGia: 'GG001',
                    MaLoaiSanPham: 'LSP001',
                    MaNhaSanXuat: 'NSX001',
                    MaThuongHieu: 'TH001',
                    ThanhPhan: 'none',
                    CongDung: 'none',
                    CachDung: 'none',
                    LuuY: 'none',
                    BaoQuan: 'none'
                })
                getHangHoa();
            }
        }catch(err){
            console.error("Error data:", err.response.data);
            console.error("Error status:", err.response.status);
            alert("Failed to add product. Please check server logs for details.");
        }
    }
    return (
        <div className="ManageProduct">
            <h1>Quản lý sản phẩm</h1>
            <button onClick={HandleClick}>Thêm sản phẩm</button>
            {visible && (
                <>
                <table>
                    <tr>
                        <td>Mã sản phẩm: </td>
                        <td><input type="text" value={newProduct.MaSanPham} onChange={HandleChangeId}></input></td>
                    </tr>
                    <tr>
                        <td>Tên sản phẩm: </td>
                        <td><input type="text" value={newProduct.TenSanPham} onChange={HandleChangeName}></input></td>
                    </tr>
                    <tr>
                        <td>Công dụng: </td>
                        <td><input type="text" value={newProduct.CongDungChinh} onChange={HandleChangeCongDung}></input></td>
                    </tr>
                    <tr>
                        <td>Thành phần: </td>
                        <td><input type="text" value={newProduct.ThanhPhanChinh} onChange={HandleChangeThanhPhan}></input></td>
                    </tr>
                    <tr>
                        <td>Đối tượng sử dụng: </td>
                        <td><input type="text" value={newProduct.DoiTuong} onChange={HandleChangeDoiTuong}></input></td>
                    </tr>
                    <tr>
                        <td>Dạng bào chế: </td>
                        <td><input type="text" value={newProduct.DangBaoChe} onChange={HandleChangeDangBaoChe}></input></td>
                    </tr>
                    <tr>
                        <td>Cách đóng gói: </td>
                        <td>
                            <input type="text" value={newProduct.CachDongGoi} onChange={HandleChangeCachDongGoi}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>Sản phẩm cần kê toa: </td>
                        <td>
                            <select value={newProduct.SanPhamCanKeToa} onChange={HandleChangeSanPhamKeToa}>
                                <option value="0">Không</option>
                                <option value="1">Có</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Hạn dùng: </td>
                        <td><input type="text" value={newProduct.HanDung} onChange={HandleChangeHanDung}></input></td>
                    </tr>
                    <tr>
                        <td>Số đăng ký: </td>
                        <td><input type="text" value={newProduct.SoDangKy} onChange={HandleChangeSoDangKy}></input></td>
                    </tr>
                    <tr>
                        <td>Giá: </td>
                        <td><input type="text" value={newProduct.Gia} onChange={HandleChangeGia}></input></td>
                    </tr>
                    <tr>
                        <td>Số lượng: </td>
                        <td><input type="text" value={newProduct.SoLuongTon} onChange={HandleChangSoLuongTon}></input></td>
                    </tr>
                    <tr>
                        <td>Hình ảnh sản phẩm: </td>
                        <td><input type="file" onChange={HandleChangeHinhAnh}></input></td>
                    </tr>
                    <tr>
                        <td>Mã giảm giá: </td>
                        <td><select onChange={HandleChangeMaGiamGia} value={newProduct.MaGiamGia}>
                                {dataDiscount.map(index =>(
                                    <option key={index.MaGiamGia} value={index.MaGiamGia}>{index.MaGiamGia} || {index.PhanTramGiam}%</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Mã loại sản phẩm: </td>
                        <td>
                            <select onChange={HandleChangeMaLoaiSanPham} value={newProduct.MaLoaiSanPham}>
                                {dataType.map(index =>(
                                    <option key={index.MaLoaiSanPham} value={index.MaLoaiSanPham}>{index.MaLoaiSanPham} || {index.TenLoaiSanPham}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Mã nhà sản xuất: </td>
                        <td>
                            <select onChange={HandleChangeMaNhaSanXuat} value={newProduct.MaNhaSanXuat}>
                                {dataManufacturer.map(index =>(
                                    <option key={index.MaNhaSanXuat} value={index.MaNhaSanXuat}>{index.MaNhaSanXuat} || {index.NhaSanXuat}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Mã thương hiệu: </td>
                        <td>
                            <select onChange={HandleChangeMaThuongHieu} value={newProduct.MaThuongHieu}>
                                {dataBrand.map(index =>(
                                    <option key={index.MaThuongHieu} value={index.MaThuongHieu}>{index.MaThuongHieu} || {index.TenThuongHieu}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><button onClick={Submit}>Submit</button></td>
                    </tr>
                </table>
                </>
            )}
            <table className="table_Employee">
                <thead>
                    <tr className="title">
                        <td colSpan={3}>Tên sản phẩm</td>
                        <td>Công dụng chính</td>
                        <td>#</td>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((index) => (
                        <tr key={index.MaSanPham}>
                            <td colSpan={3}>{index.TenSanPham}</td>
                            <td>{index.CongDungChinh}</td>
                            <td id="detail"><Link to={`/ManagePage/HangHoa/${index.MaSanPham}`}><img src={detail}></img></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav>
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <button onClick={() => paginate(number)} className="page-link">
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
function NhaSanXuat(){
    const MaNhaSanXuat = useParams();
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);
    const [newBrand, setNewBrand] = useState({
        MaThuongHieu: '',
        TenThuongHieu: '',
        MoTaThuongHieu: '',
        DuongDanHinhAnh: ''
    })
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    const [totalProducts, setTotalProducts] = useState(0);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    const [currentPageBrand, setCurrentPageBrand] = useState(1);
    const [productsPerPageBrand] = useState(3);
    const [totalProductsBrand, setTotalProductsBrand] = useState(0);
    const indexOfLastProductBrand = currentPageBrand * productsPerPageBrand;
    const indexOfFirstProductBrand = indexOfLastProductBrand - productsPerPageBrand;
    const currentProductsBrand = data2.slice(indexOfFirstProductBrand, indexOfLastProductBrand);
    const paginateBrand = (pageNumber) => setCurrentPageBrand(pageNumber);
    const pageNumbersBrand = [];
    for (let i = 1; i <= Math.ceil(totalProductsBrand / productsPerPageBrand); i++) {
        pageNumbersBrand.push(i);
    }

    const getdata = async() => {
        try {
            const response = await axios.get('http://localhost:4000/Manufacturer');
            const response2 = await axios.get('http://localhost:4000/Brand');
            if(response)
            {
                setData(response.data)
                setData2(response2.data)
                setTotalProducts(response.data.length);
                setTotalProductsBrand(response2.data.length);
            }
        } catch (error) {
            console.log("Can't fetch data");
        }
    }
    useEffect(() => {
        getdata();
    }, [])
    const Delete = async(MaNhaSanXuat) => {
        try {
            const response = axios.delete(`http://localhost:4000/Manufacturer/Delete/${MaNhaSanXuat}`)
            if(response)
            {
                alert('Xóa thành công');
                getdata();
            }
        } catch (error) {
            console.log(error)
        }
    }
    const DeleteBrand = async(MaThuongHieu) => {
        try {
            const response = axios.delete(`http://localhost:4000/Brand/Delete/${MaThuongHieu}`)
            if(response)
            {
                alert('Xóa thành công');
                getdata();
            }
        } catch (error) {
            console.log(error)
        }
    }
    const Edit = async(MaNhaSanXuat) => {
        try {
            const newInf = {
                ...data3,
                NhaSanXuat: nameManu,
                NuocSanXuat: country
            }
            const response = await axios.put(`http://localhost:4000/Manufacturer/Update/${MaNhaSanXuat}`, newInf)
            if(response)
            {
                alert('Cập nhập thành công');
                setSelectedId(null);
                getdata();
            }
        } catch (error) {
            console.log(error)
        }
    }
    const [nameManu, setNameManu] = useState('');
    const [country, setCountry] = useState('');
    const [selectedId, setSelectedId] = useState(null);


    const HandleChangeManu = (e) => {
        const value = e.target.value;
        setNameManu(value)
    }
    const HandleChangeCountry = (e) => {
        setCountry(e.target.value)
    }
    const getInf = async(MaNhaSanXuat) => {
        const response = await axios.get(`http://localhost:4000/Manufacturer/${MaNhaSanXuat}`)
        const manufacturer = response.data[0]
        if(response)
        {
            setData3(manufacturer.data);
            setNameManu(manufacturer.NhaSanXuat || 'none'); 
            setCountry(manufacturer.NuocSanXuat || 'none');
            setSelectedId(manufacturer.MaNhaSanXuat)
        }
    }
    const handleCancel = () => {
        setNameManu('');
        setCountry('');
        setSelectedId(null);
    };
    const EditBrand = async(MaThuongHieu) => {
        try {
            const newInf = {
                ...data4,
                TenThuongHieu: nameBrand,
                MoTaThuongHieu: decBrand,
                DuongDanHinhAnh: imgBrand
            }
            const response = await axios.put(`http://localhost:4000/Brand/Update/${MaThuongHieu}`, newInf)
            if(response)
            {
                alert('Cập nhập thành công');
                setSelectedId(null);
                getdata();
            }
        } catch (error) {
            console.log(error)
        }
    }
    const [nameBrand, setNameBrand] = useState('');
    const [decBrand, setDecBrand] = useState('');
    const [imgBrand, setImgBrand] = useState('');
    const [selectedIdBrand, setSelectedIdBrand] = useState(null);

    const HandleChangeNewBrand = (e) => setNewBrand(prev => ({...prev,MaThuongHieu: e.target.value}))
    const HandleChangeNewDecBrand = (e) => setNewBrand(prev => ({...prev,MoTaThuongHieu: e.target.value}))
    const HandleChangeNewNameBrand = (e) => setNewBrand(prev => ({...prev, TenThuongHieu: e.target.value}))
    const HandleChangeNewImage = (e) => {
        const value = e.target.files[0];
        const newValue = value.name;
        setNewBrand(prev => ({...prev, DuongDanHinhAnh: newValue}))}

    const HandleChangeNameBrand = (e) => {
        const value = e.target.value;
        setNameBrand(value)
    }
    const HandleChangeDecBrand = (e) => {
        setDecBrand(e.target.value)
    }
    const HandleChangeImgBrand = (e) => {
        const value = e.target.files[0];
        const newValue = value.name;
        setImgBrand(newValue);
    }
    const InsertBrand = async() => {
        try {
            if(newBrand.MaThuongHieu !== null && newBrand.TenThuongHieu !== null)
            {
                const response = await axios.post('http://localhost:4000/Brand/New', newBrand)
                console.log(response.data)
                if (response.status === 201) {
                isVisible(false);
                setNewBrand({
                    MaThuongHieu: '',
                    TenThuongHieu: '',
                    MoTaThuongHieu: '',
                    DuongDanHinhAnh: 'none'
                });
                alert("Brand added successfully!");
                getdata();
            }
            else
            {
                alert("Khong duoc de trong thong tin")
                return;
            } 
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getInfBrand = async(MaThuongHieu) => {
        const response = await axios.get(`http://localhost:4000/Brand/${MaThuongHieu}`)
        const manufacturer = response.data[0]
        if(response)
        {
            setData4(manufacturer.data);
            setNameBrand(manufacturer.TenThuongHieu || 'none'); 
            setDecBrand(manufacturer.MoTaThuongHieu || 'none');
            setImgBrand(manufacturer.DuongDanHinhAnh || 'none')
            setSelectedIdBrand(manufacturer.MaThuongHieu)
        }
    }
    const handleCancelBrand = () => {
        setNewBrand({
            MaThuongHieu: '',
            TenThuongHieu: '',
            MoTaThuongHieu: '',
        });
        setImgBrand('');
        setSelectedIdBrand(null);
    };
    return(
        <div className="ManageProduct">
            <div className="row">
                <table className="table_Employee">
                    <tr className="title">
                        <td>Tên nhà sản xuất</td>
                        <td>Nước sản xuất</td>
                        <td>#</td>
                    </tr>
                    <tbody>
                        {currentProducts.map((index) => (
                            <tr key={index.MaNhaSanXuat}>
                                <td>{index.NhaSanXuat}</td>
                                <td className="position">{index.NuocSanXuat}</td>
                                <td className="icon">
                                    <button onClick={() => Delete(index.MaNhaSanXuat)}><img style={{width:'20px'}} src={bin} alt="Delete"/></button> ||
                                    <button onClick={() => getInf(index.MaNhaSanXuat)}><img style={{width:'20px'}} src={edit} alt="Edit"/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className="subTableEmployee">
                    <tr>
                        <td>Tên nhà sản xuất: </td>
                        <td><input type="text" value={nameManu} onChange={HandleChangeManu}></input></td>
                    </tr>
                    <tr>
                        <td>Nước sản xuất: </td>
                        <td><input type="text" value={country} onChange={HandleChangeCountry}></input></td>
                    </tr>
                    <tr>
                        <td><button onClick={() => Edit(selectedId)}>submit</button></td>
                        <td><button onClick={handleCancel}>cancel</button></td>
                    </tr>
                </table>
            </div>
            <nav>
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <button onClick={() => paginate(number)} className="page-link">
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="row">
            <table className="table_Employee">
                <tr className="title">
                    <td>Tên thương hiệu</td>
                    <td>Mô tả thương hiệu</td>
                    <td>Hình ảnh</td>
                    <td>#</td>
                </tr>
                <tbody>
                    {currentProductsBrand.map((index) => (
                        <tr key={index.MaThuongHieu}>
                            <td>{index.TenThuongHieu}</td>
                            <td className="positionDcThuongHieu">{index.MoTaThuongHieu}</td>
                            <td><img className="position" src={`http://localhost:4000/ThuongHieu/${index.DuongDanHinhAnh}`} alt={index.TenThuongHieu} style={{width:'150px', objectFit:'contain'}}></img></td>
                            <td className="icon">
                                <button onClick={() => DeleteBrand(index.MaThuongHieu)}><img style={{width:'20px'}} src={bin} alt="Delete"/></button>||
                                <button onClick={() => getInfBrand(index.MaThuongHieu)}><img style={{width:'20px'}} src={edit} alt="Delete"/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
            <h4>Chỉnh sửa thương hiệu</h4>
            <table className="subTableEmployee">
                <tr>
                    <td>Tên thương hiệu: </td>
                    <td><input type="text" value={nameBrand} onChange={HandleChangeNameBrand}></input></td>
                </tr>
                <tr>
                    <td>Mô tả thương hiệu: </td>
                    <td><textarea type="text" value={decBrand} onChange={HandleChangeDecBrand} style={{maxWidth:"200px",minWidth:"165px",minHeight:"100px"}}></textarea></td>
                </tr>
                <tr>
                    <td>Hình ảnh thương hiệu: </td>
                    <td><img style={{width:"150px"}} src={`http://localhost:4000/ThuongHieu/${imgBrand}`}></img></td>
                </tr>
                <tr>
                    <td colSpan={2}><input type="file" onChange={HandleChangeImgBrand}></input></td>
                </tr>
                <tr>
                    <td><button onClick={() => EditBrand(selectedIdBrand)}>submit</button></td>
                    <td><button onClick={handleCancelBrand}>cancel</button></td>
                </tr>
            </table>
            <h4>Thêm thương hiệu</h4>
            <table className="subTableEmployee">
                <tr>
                    <td>Mã thương hiệu: </td>
                    <td><input type="text" value={newBrand.MaThuongHieu} onChange={HandleChangeNewBrand}></input></td>
                </tr>
                <tr>
                    <td>Tên thương hiệu: </td>
                    <td><input type="text" value={newBrand.TenThuongHieu} onChange={HandleChangeNewNameBrand}></input></td>
                </tr>
                <tr>
                    <td>Mô tả thương hiệu: </td>
                    <td><textarea type="text" value={newBrand.MoTaThuongHieu} onChange={HandleChangeNewDecBrand} style={{maxWidth:"200px",minWidth:"165px",minHeight:"100px"}}></textarea></td>
                </tr>
                <tr>
                    <td>Hình ảnh thương hiệu: </td>
                    <td><img style={{width:"150px"}} src={`http://localhost:4000/ThuongHieu/${newBrand.DuongDanHinhAnh}`}></img></td>
                </tr>
                <tr>
                    <td colSpan={2}><input type="file" onChange={HandleChangeNewImage}></input></td>
                </tr>
                <tr>
                    <td><button onClick={InsertBrand}>submit</button></td>
                    <td><button onClick={handleCancelBrand}>cancel</button></td>
                </tr>
            </table>
            </div>
            </div>
            <nav>
                <ul className="pagination">
                    {pageNumbersBrand.map(number => (
                        <li key={number} className="page-item">
                            <button onClick={() => paginateBrand(number)} className="page-link">
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
function KhachHang(){
    const [data, setData] = useState([]);
    const [dataCus, setDataCus] = useState([]);
    const [MaSoDienThoaiKhachHang, setMaSoDienThoaiKhachHang] = useState('');
    const [TenKhachHang, setTenKhachHang] = useState('');
    const [GioiTinh, setGioiTinh] = useState('');
    const [DiaChi, setDiaChi] = useState('')
    const [selectedId, setSelectedId] = useState(null);
    const [newCus, setNewCus] = useState({
        Email:'',
        MaSoDienThoaiKhachHang:'',
        TenKhachHang:'',
        GioiTinh:'',
        DiaChi:'',
        LoaiTaiKhoan:'0',
    })
    const HandleChangeNewEmail = (e) => setNewCus(prev => ({...prev, Email: e.target.value}))
    const HandleChangeNewMaSoDienThoai = (e) => setNewCus(prev => ({...prev, MaSoDienThoaiKhachHang: e.target.value}))
    const HandleChangeNewTenKhachHang = (e) => setNewCus(prev => ({...prev, TenKhachHang: e.target.value}))
    const HandleChangeNewGioiTinh = (e) => setNewCus(prev => ({...prev, GioiTinh: e.target.value}))
    const HandleChangeNewDiaChi = (e) => setNewCus(prev => ({...prev, DiaChi: e.target.value}))

    const HandleChangeSoDienThoai = (e) => setMaSoDienThoaiKhachHang(e.target.value);
    const HandleChangeTenKhachHang = (e) => setTenKhachHang(e.target.value);
    const HandleChangeGioiTinh = (e) => setGioiTinh(e.target.value);
    const HandleChangeDiaChi = (e) => setDiaChi(e.target.value)

    const getData = async() => {
        try {
            const response = await axios.get('http://localhost:4000/Customer')
            setData(response.data);
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    }
    const getInf = async(Email) => {
        try {
            const response = await axios.get(`http://localhost:4000/Customer/${Email}`);
            if (response) {
                const customer = response.data[0];
                setDataCus(customer.data);
                setMaSoDienThoaiKhachHang(customer.MaSoDienThoaiKhachHang || 'none'); 
                setTenKhachHang(customer.TenKhachHang || 'none');
                setGioiTinh(customer.GioiTinh || 'none');
                setDiaChi(customer.DiaChi || 'none');
                setSelectedId(customer.Email);
            } else {
                console.log("No data found for this email.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    const Insert = () => {
        try {
            const response = axios.post('http://localhost:4000/Customer/New', newCus);
            if(isNaN(newCus.MaSoDienThoaiKhachHang))
            {
                alert("Số điện thoại không chứa kí tự!")
                return;
            }
            if(response)
            {
                alert("Add khách hàng thành công!");
                setNewCus({
                    Email:'',
                    MaSoDienThoaiKhachHang:'',
                    TenKhachHang:'',
                    DiaChi:'',
                    GioiTinh:'Nam',
                    LoaiTaiKhoan:'0'
                });
                getData();
                console.log(newCus)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const UpdateKhachHang = async(Email) => {
        const getInf = {
            ...data,
            MaSoDienThoaiKhachHang: MaSoDienThoaiKhachHang,
            TenKhachHang: TenKhachHang,
            GioiTinh: GioiTinh,
            DiaChi: DiaChi
        }
        if(isNaN(MaSoDienThoaiKhachHang))
        {
            alert("Số điện thoại không chứa kí tự!")
            return;
        }
        const response = await axios.put(`http://localhost:4000/Customer/Update/${Email}`, getInf);
        if(response)
        {
            alert('Cập nhập thành công');
            setSelectedId(null);
            getData();
            Cancel();
        }
    }
    const Cancel = () => {
        setDiaChi('');
        setMaSoDienThoaiKhachHang('');
        setTenKhachHang('');
        setDiaChi('');
    }
    const DeleteCus = (Email) => {
        const response = axios.delete(`http://localhost:4000/Customer/Delete/${Email}`);
        if(response){
            window.confirm('Bạn chắc chắn muốn xóa tài khoản này không?')
            if(confirm)
            {
                alert('Xóa khách hàng thành công!')
                getData();
            }
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div className="ManageProduct">
            <div className="row">
                <table className="table_Employee">
                    <thead>
                        <tr className="title">
                            <td colSpan={2}>Email</td>
                            <td>Họ tên nhân viên</td>
                            <td>Số điện thoại</td>
                            <td>Giới tính</td>
                            <td>Địa chỉ</td>
                            <td>#</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((index) => (
                            <tr key={index.Email}>
                                <td colSpan={2}>{index.Email}</td>
                                <td>{index.TenKhachHang}</td>
                                <td>{index.MaSoDienThoaiKhachHang}</td>
                                <td>{index.GioiTinh}</td>
                                <td>{index.DiaChi}</td>
                                <td className="icon">
                                    <button onClick={() => getInf(index.Email)}>
                                        <img src={edit} style={{ width: "20px" }} alt="Edit" />
                                    </button>||
                                    <button onClick={() => DeleteCus(index.Email)}>
                                        <img src={bin} style={{ width: "20px" }} alt="Edit" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <h4>Chỉnh sửa khách hàng</h4>
                    <table className="subTableEmployee">
                        <tbody>
                            <tr>
                                <td>Tên khách hàng: </td>
                                <td><input type="text" value={TenKhachHang} onChange={HandleChangeTenKhachHang} /></td>
                            </tr>
                            <tr>
                                <td>Số điện thoại: </td>
                                <td><input type="text" value={MaSoDienThoaiKhachHang} onChange={HandleChangeSoDienThoai} /></td>
                            </tr>
                            <tr>
                                <td>Giới tính: </td>
                                <td>
                                    <select value={GioiTinh} onChange={HandleChangeGioiTinh} style={{ width: "70px" }}>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Địa chỉ: </td>
                                <td><input type="text" value={DiaChi} onChange={HandleChangeDiaChi} /></td>
                            </tr>
                            <tr>
                                <td><button onClick={() => UpdateKhachHang(selectedId)}>submit</button></td>
                                <td><button onClick={() => Cancel()}>cancel</button></td>
                            </tr>
                        </tbody>
                    </table>
                    <h4>Form thêm khách hàng</h4>
                    <table className="subTableEmployee">
                        <tbody>
                            <tr>
                                <td>Email khách hàng: </td>
                                <td><input type="text" value={newCus.Email} onChange={HandleChangeNewEmail} /></td>
                            </tr>
                            <tr>
                                <td>Tên khách hàng: </td>
                                <td><input type="text" value={newCus.TenKhachHang} onChange={HandleChangeNewTenKhachHang} /></td>
                            </tr>
                            <tr>
                                <td>Số điện thoại: </td>
                                <td><input type="text" value={newCus.MaSoDienThoaiKhachHang} onChange={HandleChangeNewMaSoDienThoai} /></td>
                            </tr>
                            <tr>
                                <td>Giới tính: </td>
                                <td>
                                    <select value={newCus.GioiTinh} onChange={HandleChangeNewGioiTinh} style={{ width: "70px" }}>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Địa chỉ: </td>
                                <td><input type="text" value={newCus.DiaChi} onChange={HandleChangeNewDiaChi} /></td>
                            </tr>
                            <tr>
                                <td><button onClick={() => Insert()}>submit</button></td>
                                <td><button >cancel</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
function LoaiTaiKhoan(){
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [Email, setEmail] = useState('');
    const [LoaiTaiKhoan, setLoaiTaiKhoan] = useState('');

    const HandleChangeLoaiTK = (e) => setLoaiTaiKhoan(e.target.value)
    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/TypeAc');
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getInf = async(Email) => {
        try {
            const response = await axios.get(`http://localhost:4000/TypeAc/${Email}`);
            const account = response.data[0];
            setData1(account)
            setEmail(account.Email || 'none');
            setLoaiTaiKhoan(account.LoaiTaiKhoan);
            console.log(account)
        } catch (error) {
            console.log(error)
        }
    }
    const Update = async (Email) => {
        try {
            const getInf = {
                ...data1,
                LoaiTaiKhoan: LoaiTaiKhoan
            }
            const response = await axios.put(`http://localhost:4000/TypeAc/Update/${Email}`, getInf);
            if(response){
                alert(`Update thong tin tài khoản ${Email} thành công!`);
                getData();
                console.log(response.data)
                Cancel();
            }
        } catch (error) {
            console.log(error) 
        }
    }
    const Cancel = () => {
        setEmail('');
        setLoaiTaiKhoan('0');
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div className="ManageProduct">
            <h6>0. Khách hàng</h6>
            <h6>1. Nhân viên</h6>
            <h6>2. Quản lý</h6>
            <div className="row">
                <table className="table_Employee">
                    <thead>
                        <tr className="title">
                            <td colSpan={2}>Email</td>
                            <td>Loại tài khoản</td>
                            <td>#</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((index) => (
                            <tr key={index.Email}>
                                <td colSpan={2}>{index.Email}</td>
                                <td style={{textAlign:"center"}}>{index.LoaiTaiKhoan}</td>
                                <td className="icon">
                                    <button onClick={() => getInf(index.Email)}>
                                        <img src={edit} style={{ width: "20px" }} alt="Edit" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <h4>Chỉnh sửa loại tài khoản</h4>
                    <table className="subTableEmployee">
                        <tbody>
                            <tr>
                                <td>Email: </td>
                                <td><input type="text" disabled value={Email}></input></td>
                            </tr>
                            <tr>
                                <td>Loại tài khoản: </td>
                                <td>
                                    <select value={LoaiTaiKhoan} onChange={HandleChangeLoaiTK} style={{ width: "170px" }}>
                                        <option value="0">Khách hàng</option>
                                        <option value="1">Nhân viên</option>
                                        <option value="2">Quản lý</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td><button onClick={() => Update(Email)}>submit</button></td>
                                <td><button onClick={() => Cancel()}>cancel</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
function HoaDon() {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [dataDetail, setDataDetail] = useState([]);
    const [MaDonHang, setMaDonHang] = useState("");
    const [TongTien, setTongTien] = useState(0);
    const [PhuongThuc, setPhuongThuc] = useState("");
    const [TTThanhToan, setTTThanhToan] = useState("");
    const [TTGiaoHang, setTTGiaoHang] = useState("");

    const getData = async () => {
        const response = await axios.get("http://localhost:4000/OrderPage");
        if (response) {
            setData(response.data);
        } else console.log("Failed!");
    };

    const getInf = async (MaDonHang) => {
        const response = await axios.get(`http://localhost:4000/OrderPage/${MaDonHang}`);
        if (response) {
            const dataOrder = response.data[0];
            setData1(dataOrder);
            setMaDonHang(dataOrder.MaDonHang);
            setTongTien(dataOrder.TongTien);
            setPhuongThuc(dataOrder.PhuongThucThanhToan);
            setTTThanhToan(dataOrder.TinhTrangThanhToan);
            setTTGiaoHang(dataOrder.TinhTrangGiaoHang);
        }
    };
    function removeVietnameseTones(str) {
        const vietnamese = 'áàảãạăắặằẳẵâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđđ';
        const withoutTone= 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyydd';
        return str.split('').map(c => {
            const i = vietnamese.indexOf(c);
            return i !== -1 ? withoutTone[i] : c;
        }).join('');
    }
    const generatePDFById = async (MaDonHang) => {
        try {
            const response = await axios.get(`http://localhost:4000/OrderPage/${MaDonHang}`);
            const response1 = await axios.get(`http://localhost:4000/OrderPage/DetailOfOrder/${MaDonHang}`);
            const dataDetail = response1.data;
            const dataOrder = response.data[0];
            if (dataOrder) {
                //const ResponseBase64 = await axios.get('../../../Roboto-Regular-base64.txt');
                //const fontBase64 = ResponseBase64.data;
                const doc = new jsPDF();
                //doc.addFileToVFS("Roboto-Regular.ttf", fontBase64);
                //doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
                doc.setFont("Noto Sans", "normal");
                
                doc.setFontSize(16);
                doc.text("ORDER", 20, 20);

                doc.setFontSize(12);
                doc.text(`Id: ${dataOrder.MaDonHang}`, 20, 40);
                doc.text(`SubTotal: ${dataOrder.TongTien.toLocaleString()} VND`, 20, 50);
                doc.text(`Payment method: ${removeVietnameseTones(dataOrder.PhuongThucThanhToan)}`, 20, 60);
                doc.text(`Status payment: ${removeVietnameseTones(dataOrder.TinhTrangThanhToan)}`, 20, 70);
                if (dataDetail.length > 0) {
                    let startY = 100;
                    doc.text("Line", 20, startY);
                    doc.text("Name of product", 40, startY);
                    doc.text("Quantity", 130, startY);
                    doc.text("Price", 170, startY);
    
                    dataDetail.forEach((item, index) => {
                        startY += 10;
                        const productName = doc.splitTextToSize(removeVietnameseTones(item.TenSanPham), 50);
                        const lineHeight = 6;
    
                        productName.forEach((line, i) => {
                            if (i === 0) {
                                doc.text(`${index + 1}`, 20, startY);
                                doc.text(line, 40, startY);
                                doc.text(`${item.SoLuongDat}`, 130, startY);
                                doc.text(`${item.DonGia.toLocaleString()}`, 170, startY);
                            } else {
                                startY += lineHeight;
                                doc.text(line, 40, startY);
                            }
                        });
                    });
                    doc.save(`HoaDon_${MaDonHang}.pdf`);
                }
            } else {
                alert("Không tìm thấy thông tin hóa đơn!");
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu hóa đơn:", error);
            alert("Đã xảy ra lỗi, không thể in hóa đơn!");
        }
    };
    const HandleChangeTTThanhToan = (e) => setTTThanhToan(e.target.value);
    const HandleChangeTTGiaoHang = (e) => setTTGiaoHang(e.target.value);

    const Edit = async (MaDonHang) => {
        try {
            const newInf = {
                ...data1,
                TinhTrangThanhToan: TTThanhToan,
                TinhTrangGiaoHang: TTGiaoHang,
            };
            const response = await axios.put(
                `http://localhost:4000/OrderPage/Update/${MaDonHang}`,
                newInf
            );
            if (response) {
                alert(`Update thông tin đơn hàng ${MaDonHang} thành công!`);
                getData();
            } else {
                console.log("Không thể update");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const Cancel = () => {
        setData1([]);
        setMaDonHang("");
        setPhuongThuc("");
        setTTGiaoHang("");
        setTTThanhToan("");
        setTongTien(0);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="ManageOrder">
            <div className="row">
                <table className="table_Employee">
                    <thead>
                        <tr className="title">
                            <td>Mã đơn hàng</td>
                            <td>Tổng tiền</td>
                            <td>Ngày tạo đơn hàng</td>
                            <td>Phương thức</td>
                            <td>Tình trạng thanh toán</td>
                            <td>Tình trạng giao hàng</td>
                            <td>Email khách hàng</td>
                            <td>Email nhân viên</td>
                            <td>#</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((index) => (
                            <tr key={index.MaDonHang}>
                                <td>{index.MaDonHang}</td>
                                <td>{index.TongTien}</td>
                                <td>
                                    {new Date(index.NgayTaoDonHang).toISOString().split("T")[0]}
                                </td>
                                <td>{index.PhuongThucThanhToan}</td>
                                <td>{index.TinhTrangThanhToan}</td>
                                <td>{index.TinhTrangGiaoHang}</td>
                                <td>{index.emailKhachHang}</td>
                                <td>{index.emailNhanVien}</td>
                                <td className="icon">
                                    <button>
                                        <img
                                            src={edit}
                                            onClick={() => getInf(index.MaDonHang)}
                                            style={{ width: "20px" }}
                                            alt="Edit"
                                        />
                                    </button>
                                    <button onClick={() => generatePDFById(index.MaDonHang)}>In hóa đơn</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="subTable">
                <h4>Chi tiết hóa đơn</h4>
                <table className="subTableEmployee">
                    <tbody>
                        <tr>
                            <td>Mã đơn hàng: </td>
                            <td>
                                <input type="text" value={MaDonHang} disabled />
                            </td>
                        </tr>
                        <tr>
                            <td>Tổng giá trị: </td>
                            <td>
                                <input type="text" value={TongTien} disabled />
                            </td>
                        </tr>
                        <tr>
                            <td>Phương thức thanh toán: </td>
                            <td>
                                <input type="text" value={PhuongThuc} disabled />
                            </td>
                        </tr>
                        <tr>
                            <td>Tình trạng thanh toán: </td>
                            <td>
                                <select
                                    onChange={HandleChangeTTThanhToan}
                                    value={TTThanhToan}
                                    style={{ width: "170px" }}
                                >
                                    <option value="Chưa thanh toán">Chưa thanh toán</option>
                                    <option value="Đã thanh toán">Đã thanh toán</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Tình trạng giao hàng: </td>
                            <td>
                                <select
                                    onChange={HandleChangeTTGiaoHang}
                                    value={TTGiaoHang}
                                    style={{ width: "170px" }}
                                >
                                    <option value="Đang xử lý">Đang xử lý</option>
                                    <option value="Đang giao hàng">Đang giao hàng</option>
                                    <option value="Đã giao hàng">Đã giao hàng</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={() => Edit(MaDonHang)}>submit</button>
                            </td>
                            <td>
                                <button onClick={Cancel}>cancel</button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
function ChamCong() {
    const [data, setData] = useState([]);
    const [dataNhanVien, setData2] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [calculatedSalary, setCalculatedSalary] = useState(0);
    const [workDay, setWorkDay] = useState(0);
    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/tableChamCong');
            const response2 = await axios.get('http://localhost:4000/data');
            if (response.data || response2.data) {
                setData(response.data); 
                setData2(response2.data);
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu chấm công:', error);
        }
    };
    useEffect(() => {
        getData();
    }, []);
    const handleSalaryCalculation = () => {
        if (!selectedEmail || !fromDate || !toDate) {
            alert("Vui lòng chọn nhân viên và nhập khoảng thời gian!");
            return;
        }
        const from = new Date(fromDate);
        const to = new Date(toDate);
        if (from > to) {
            alert("Ngày bắt đầu không thể lớn hơn ngày kết thúc!");
            return;
        }
        const filteredData = data.filter(item => {
            const recordDate = new Date(item.DateBatDau);
            return (
                item.Email === selectedEmail &&
                recordDate >= from &&
                recordDate <= to
            );
        });
        const workDays = filteredData.reduce((days, item) => {
            if (item.ThoiGianLam && !isNaN(item.ThoiGianLam) && item.ThoiGianLam > 10 / 60) {
                return days + 1;
            }
            return days;
        }, 0);

        const dailyRate = 500000;
        const salary = workDays * dailyRate;
        
        setWorkDay(workDays);
        setCalculatedSalary(salary);
    };
    const formatDateToVN = (dateString) => {
        if (!dateString) return "N/A";
    
        const date = new Date(dateString);
        const options = {
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit', 
            hour12: false,
        };
        return date.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh', ...options });
    }
    return (
        <>
            <table className="table_Employee_ChamCong" style={{marginBottom:"500px"}}>
                <thead>
                    <tr className="title">
                        <td>STT</td>
                        <td style={{width:"200px"}}>Email nhân viên</td>
                        <td style={{width:"200px"}}>Thời gian vào ca</td>
                        <td style={{width:"200px"}}>Thời gian ra ca</td>
                        <td style={{width:"200px"}}>Thời gian làm</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.STT}>
                            <td>{item.STT}</td>
                            <td>{item.Email}</td>
                            <td>{formatDateToVN(item.DateBatDau)}</td>
                            <td>{item.DateKetThuc ? formatDateToVN(item.DateKetThuc) : "N/A"}</td>
                            <td>{item.ThoiGianLam ? `${item.ThoiGianLam.toFixed(2)} phút` : "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table className="TinhLuong">
                <tr>
                    <td>Nhân viên cần tính lương:</td>
                    <td>
                        <select  onChange={(e) => setSelectedEmail(e.target.value)}>
                            <option value="">Chọn nhân viên</option>
                            {dataNhanVien.map((index) => (
                                <option key={index.Email} value={index.Email}>{index.TenNhanVien}||{index.Email}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Tháng cần tính lương:</td>
                    <td><input type="date" onChange={(e) => setFromDate(e.target.value)}/></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="date" onChange={(e) => setToDate(e.target.value)}/></td>
                </tr>
                <tr>
                    <td colSpan="3">
                        <button style={{width:"40%"}} onClick={handleSalaryCalculation}>Tính lương</button>
                    </td>
                </tr>
                <tr>
                    <td colSpan="3">
                        Số ngày làm trong tháng: {workDay}
                    </td>
                </tr>
                <tr>
                    <td colSpan="3">
                        Lương tính được: {calculatedSalary.toLocaleString()} VND
                    </td>
                </tr>
            </table>
        </>
    );
}
function NavigateAdmin(){
    const [isExpanded, setIsExpanded] = useState(true);
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };   
    const userType = localStorage.getItem("userType")
    return(
        <>
            <div className={`NvgAdmin ${isExpanded ? 'expanded' : ''}`}>
                <button className="minisizeSidebar" onClick={handleToggle}><img src={minisize}></img></button>
                <hr></hr>
                <div className="select">
                    <div>
                        <img src={person}></img>
                        <Link to='/ManagePage/NhanSu' className="link" 
                        style={{ pointerEvents: userType === "1" ? "none" : "auto", opacity: userType === "1" ? 0.5 : 1 }}>Quản lý nhân sự</Link>
                    </div>
                    <div>
                        <img src={customer}></img>   
                        <Link to='/ManagePage/KhachHang' className="link">Quản lý khách hàng</Link>
                    </div>
                    <div>
                        <img src={account}></img>   
                        <Link to='/ManagePage/LoaiTaiKhoan' className="link"
                        style={{ pointerEvents: userType === "1" ? "none" : "auto", opacity: userType === "1" ? 0.5 : 1 }}>Quản lý tài khoản</Link>
                    </div>
                    <div>
                        <img src={product}></img>   
                        <Link to='/ManagePage/HangHoa' className="link">Quản lý hàng hóa</Link>
                    </div>
                    <div>
                        <img src={manufacturer}></img>   
                        <Link to='/ManagePage/Khac' className="link">Quản lý nhà sản xuất</Link>
                    </div>
                    <div>
                        <img src={order}></img>   
                        <Link to='/ManagePage/DonHang' className="link">Quản lý đơn hàng</Link>
                    </div>
                    <div>
                        <img src={count}></img>   
                        <Link to='/ManagePage/ChamCong' className="link"
                        style={{ pointerEvents: userType === "1" ? "none" : "auto", opacity: userType === "1" ? 0.5 : 1 }}>Chấm công</Link>
                    </div>
                    <div> 
                        <img src={backUp}></img>   
                        <Link to='/ManagePage/Backup' className="link"
                        style={{ pointerEvents: userType === "1" ? "none" : "auto", opacity: userType === "1" ? 0.5 : 1 }}>Back up & Restore</Link>                     
                    </div>
                    
                </div>
            </div>
        </>
    );
}
function Backup() {
    const [selectedFile, setSelectedFile] = useState(null);
    const handleBackup = async () => {
        try {
            const response = await axios.post('http://localhost:4000/backup');
            alert(`Backup created successfully at: ${response.data.path}`);
        } catch (error) {
            console.error('Backup failed:', error);
            alert('Backup failed. Please try again.');
        }
    };
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); 
        console.log(event.target.files[0])
    }
    const handleRestore = async () => {
        if (!selectedFile) {
            alert('Please select a backup file to restore.');
            return;
        }
    
        const formData = new FormData();
        formData.append('backupFile', selectedFile); 
    
        try {
            const response = await axios.post('http://localhost:4000/restore', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Restore successful:', response.data);
            alert('Database restored successfully');
        } catch (error) {
            console.error('Error during restore:', error);
            alert('Restore failed');
            console.log(error.response.data);
        }
    };   
    return(
        <div className="FormBackUp">
            <div className="more_section" style={{marginLeft:"50px"}}>
                <button onClick={handleBackup} className="btn_backUp">Back up</button>
            </div>
            <div className="more_section" style={{marginLeft:"50px"}}>
                <input type="file" onChange={handleFileChange} />
            </div>
            <div className="more_section" style={{marginLeft:"50px"}}>
                <button onClick={handleRestore} className="btn_backUp">Restore</button>
            </div>
        </div>
    );
}
function ManagePage({isExpanded}){
    const location = useLocation();
    const navigate = useNavigate();
    const [marginLeft, SetMarginLeft] = useState(true);
    const LogOut = (e) => {
        OffCa();
        console.log("Đã đăng xuất khỏi tài khoản")
        navigate("/")
    }
    const OffCa = async() => {
        const Admin = localStorage.getItem("Admin");
        if (!Admin) {
            console.error("Admin is null or undefined!");
            return;
        }
        try {
            const { data } = await axios.get(`http://localhost:4000/getchamcong/${Admin}`);
            const { STT, DateBatDau } = data;
            
            const currentDate = new Date();
            const vietnamTime = new Date(currentDate.getTime() + 7 * 60 * 60 * 1000);
            const formattedDate = vietnamTime.toISOString().slice(0, 19).replace('T', ' ');
    
            const startTime = new Date(DateBatDau);

            console.log("Thời gian bắt đầu:", startTime);
            console.log("Thời gian hiện tại (VN):", vietnamTime);
            
            const timeDiffMs = vietnamTime - startTime; 
            const timeDiffMinutes = Math.floor(timeDiffMs / (1000 * 60)); 
            const timeDiffSeconds = Math.floor((timeDiffMs % (1000 * 60)) / 1000); 

            const ThoiGianLam = timeDiffMinutes + timeDiffSeconds / 60; 
            console.log(formattedDate);
            const updInf = {
                DateKetThuc: formattedDate,
                ThoiGianLam: ThoiGianLam,
                STT: STT, 
            };
            const response = await axios.put(`http://localhost:4000/ketthucchamcong`, updInf);
            if (response) {
                console.log("Kết thúc ca");
                localStorage.removeItem("Admin")
                localStorage.removeItem("DateBatDau")
                localStorage.removeItem('userName', Name);
                localStorage.removeItem('userEmail', Email);
                localStorage.removeItem('userPhoneNumber', phoneNumber);
                localStorage.removeItem('userAddress', Address)
                localStorage.removeItem('userType', Type)
            }
        } catch (error) {
            console.error("Lỗi khi kết thúc ca:", error.response?.data?.message || error.message);
        }
    };
    useEffect(() => {
        if(isExpanded == true)
            SetMarginLeft(false);
    }, [])
    const PrivateRoute = ({ allowedRoles }) => {
        const navigate = useNavigate();
        const userRole = localStorage.getItem("userType");
    
        if (!allowedRoles.includes(userRole)) {
            navigate("/");
            return null;
        }
    
        return <Outlet />;
    };
    return(
        <>
            <div className={`ManagePage ${marginLeft ? "more" : ""}`}>
                <h1>Trang quản lý</h1>
                <h4>Chào mừng: {localStorage.getItem("Admin")}</h4>
                <h4><Link to="/">Trở về trang chủ</Link></h4>
                <button onClick={LogOut}>Kết thúc ca</button>
                <NavigateAdmin></NavigateAdmin>
            </div>
            <Routes>
                <Route element={<PrivateRoute allowedRoles={["2"]} />}>
                    <Route path="/NhanSu" element={<NhanSu></NhanSu>}></Route>
                    <Route path="/NhanSu/:Email" element={<EmployeeDetail></EmployeeDetail>}></Route>
                    <Route path="/LoaiTaiKhoan" element={<LoaiTaiKhoan></LoaiTaiKhoan>}></Route>
                    <Route path="/ChamCong" element={<ChamCong></ChamCong>}></Route>
                </Route>
                <Route path="/HangHoa" element={<HangHoa></HangHoa>}></Route>
                <Route path="/Khac" element={<NhaSanXuat></NhaSanXuat>}></Route>
                <Route path="/KhachHang" element={<KhachHang></KhachHang>}></Route>
                <Route path="/HangHoa/:MaSanPham" element={<ProductDetail></ProductDetail>}></Route>
                <Route path="/DonHang" element={<HoaDon></HoaDon>}></Route>
                <Route path="/Backup" element={<Backup></Backup>}></Route>
            </Routes>
        </>
    );
}
export default ManagePage