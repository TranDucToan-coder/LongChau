import React, { useState, useEffect } from "react";
import axios from "axios";
import {Routes, Route, Link, useLocation, useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import edit from '../Image/edit-3-svgrepo-com.svg'
import bin from '../Image/bin-svgrepo-com.svg'

function ProductDetail(){
    const { MaSanPham } = useParams();
    const [data, setData] = useState([]);
    const [dataBrand, setDataBrand] = useState([]);
    const [dataType, setDataType] = useState([]);
    const [dataDiscount, setDataDiscount] = useState([]);
    const [dataManufacturer, setDataManufacturer] = useState([]);

    const [TenSanPham, setName] = useState('');
    const [CongDungChinh, setCongDung] = useState('');
    const [ThanhPhanChinh, setThanhPhanChinh] = useState('');
    const [DoiTuong, setDoiTuong] = useState('');
    const [DangBaoChe, setDangBaoChe] = useState('');
    const [CachDongGoi, setCachDongGoi] = useState('');
    const [SanPhamCanKeToa, setSanPhamCanKeToa] = useState('');
    const [HanDung, setHanDung] = useState('');
    const [SoDangKy, setSoDangKy] = useState('');
    const [Gia, setGia] = useState(0);
    const [SoLuongTon, setSoLuongTon] = useState(0);
    const [MaGiamGia, setMaGiamGia] = useState('');
    const [MaLoaiSanPham, setMaLoaiSanPham] = useState('');
    const [MaNhaSanXuat, setMaNhaSanXuat] = useState('');
    const [MaThuongHieu, setMaThuongHieu] = useState('');
    const [HinhAnh, setDanhSachHinhAnh] = useState('');

    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const getData = async() => {
        const response = await axios.get(`http://localhost:4000/dataHangHoa/${MaSanPham}`)
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
                if (response.data.length > 0) {
                    const product = response.data[0];
                    setName(product.TenSanPham);
                    setCongDung(product.CongDungChinh);
                    setThanhPhanChinh(product.ThanhPhanChinh);
                    setDoiTuong(product.DoiTuong)
                    setDangBaoChe(product.DangBaoChe)
                    setCachDongGoi(product.CachDongGoi)
                    setSanPhamCanKeToa(product.SanPhamCanKeToa)
                    setHanDung(product.HanDung)
                    setSoDangKy(product.SoDangKy)
                    setGia(product.Gia)
                    setSoLuongTon(product.SoLuongTon)
                    setMaGiamGia(product.MaGiamGia)
                    setMaLoaiSanPham(product.MaLoaiSanPham)
                    setMaNhaSanXuat(product.MaNhaSanXuat)
                    setMaThuongHieu(product.MaThuongHieu)
                    setDanhSachHinhAnh(product.HinhAnh ? product.HinhAnh.split(',') : []);
                }
            }
            else
                console.log("Failed!");
    }
    useEffect(() => {
        if(MaSanPham){
            console.log("MaSanPham:", MaSanPham);
            getData()
        };
    }, [MaSanPham])
    var settings = {
        arrows: false,
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed: 5000,
    };
    const HandleChangeName = (e) => {
        setName(e.target.value);
    }
    const HandleChangeCongDung = (e) => {
        setCongDung(e.target.value);
    }
    const HandleChangeThanhPhan = (e) => {
        setThanhPhanChinh(e.target.value);
    }
    const HandleChangeDoiTuong = (e) => {
        setDoiTuong(e.target.value);
    }
    const HandleChangeDangBaoChe = (e) => {
        setDangBaoChe(e.target.value);
    }
    const HandleChangeDongGoi = (e) => {
        const value = e.target.value;
        setCachDongGoi(value);
    }
    const HandleChangeKeToa = (e) => {
        setSanPhamCanKeToa(e.target.value);
    }
    const HandleChangeHanDung = (e) => {
        setHanDung(e.target.value);
    }
    const HandleChangeSoDangKy = (e) => {
        setSoDangKy(e.target.value);
    }
    const HandleChangeGia = (e) => {
        setGia(e.target.value);
    }
    const HandleChangeSoLuongTon = (e) => {
        setSoLuongTon(e.target.value);
    }
    const HandleChangeMaGiamGia = (e) => {
        setMaGiamGia(e.target.value);
    }
    const HandleChangeMaLoaiSP = (e) => {
        setMaLoaiSanPham(e.target.value);
    }
    const HandleChangeMaNhaSX = (e) => {
        setMaNhaSanXuat(e.target.value);
    }
    const HandleChangeMaTT = (e) => {
        setMaThuongHieu(e.target.value);
    }
    const HandleVisible = () => {
        setVisible(!visible);
    }
    const HandleChangeImage = (e) => {
        const files = Array.from(e.target.files); 
        const newImageNames = files.map(file => file.name);
        setDanhSachHinhAnh(newImageNames)
    }
    const HandleChangeThuongHieu = (e) => {
        const value = e.target.value;
        setMaThuongHieu(value)
    }
    const HandleChangeLoaiSanPham = (e) => {
        const value = e.target.value;
        setMaLoaiSanPham(value)
    }
    const HandleChangeNhaSanXuat = (e) => {
        const value = e.target.value;
        setMaNhaSanXuat(value)
    }
    const HandleChangeMaGiam = (e) => {
        const value = e.target.value;
        setMaGiamGia(value)
    }
    const Submit = async() => {
        try {
            const updatedProducts = {
                ...data,
                TenSanPham: TenSanPham,
                CongDungChinh: CongDungChinh,
                ThanhPhanChinh: ThanhPhanChinh,
                DoiTuong: DoiTuong,
                DangBaoChe: DangBaoChe,
                CachDongGoi: CachDongGoi,
                SanPhamCanKeToa: SanPhamCanKeToa,
                HanDung: HanDung,
                SoDangKy: SoDangKy,
                Gia: Gia,
                SoLuongTon: SoLuongTon,
                MaGiamGia: MaGiamGia,
                MaLoaiSanPham: MaLoaiSanPham,
                MaNhaSanXuat: MaNhaSanXuat,
                MaThuongHieu: MaThuongHieu,
                HinhAnh: HinhAnh
            };
            if(isNaN(updatedProducts.SoLuongTon) || isNaN(updatedProducts.Gia))
            {
                alert('Không được nhập kí tự vào số lượng tồn và giá')
            }
            if(updatedProducts.SoLuongTon < 0)
            {
                alert('Số lượng cập nhập không được nhỏ hơn 1')
            }
            else if(updatedProducts.Gia < 0)
            {
                alert('Giá cập nhập không được nhỏ hơn 1')
            }
            else{
                await axios.put(`http://localhost:4000/dataHangHoa/Update/${MaSanPham}`, updatedProducts);
                getData();
                alert("Update thành công!");
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    }
    const Delete = async () => {
        const confirm = window.confirm("Bạn có chắc chắn xóa sản phẩm này?");
        if (confirm) {
            try {
                await axios.delete(`http://localhost:4000/dataHangHoa/Delete/${MaSanPham}`);
                getData();
                alert("Xóa thành công sản phẩm");
                navigate(-1);
            } catch (error) {
                console.error("Lỗi khi xóa sản phẩm:", error.response || error.message);
                alert("Đã xảy ra lỗi khi xóa sản phẩm. Vui lòng kiểm tra lại và thử lại.");
            }
        }
    };
    return(
        <div className="EmployeeDetail">
            {data.map((index) => (
                <table>
                <tbody>
                    <tr>
                        <td>Tên sản phẩm:</td>
                        <td><input type="text" value={TenSanPham} onChange={HandleChangeName}></input></td>
                    </tr>
                    <tr>
                        <td>Công dụng chính:</td>
                        <td><input type="text" value={CongDungChinh} onChange={HandleChangeCongDung}></input></td>
                    </tr>
                    <tr>
                        <td>Thành phần chính:</td>
                        <td><input type="text" value={ThanhPhanChinh} onChange={HandleChangeThanhPhan}></input></td>
                    </tr>
                    <tr>
                        <td>Đối tượng sử dụng:</td>
                        <td><input type="text" value={DoiTuong} onChange={HandleChangeDoiTuong}></input></td>
                    </tr>
                    <tr>
                        <td>Dạng bào chế:</td>
                        <td><input type="text" value={DangBaoChe} onChange={HandleChangeDangBaoChe}></input></td>
                    </tr>
                    <tr>
                        <td>Cách đóng gói:</td>
                        <td><input type="text" value={CachDongGoi} onChange={HandleChangeDongGoi}></input></td>
                    </tr>
                    <tr>
                        <td>Sản phẩm cần kê toa?:</td>
                        <td><input type="text" value={SanPhamCanKeToa} onChange={HandleChangeKeToa}></input></td>
                    </tr>
                    <tr>
                        <td>Hạn dùng:</td>
                        <td><input type="text" value={HanDung} onChange={HandleChangeHanDung}></input></td>
                    </tr>
                    <tr>
                        <td>Số đăng ký:</td>
                        <td><input type="text" value={SoDangKy} onChange={HandleChangeSoDangKy}></input></td>
                    </tr>
                    <tr>
                        <td>Giá:</td>
                        <td><input type="text" value={Gia} onChange={HandleChangeGia}></input></td>
                    </tr>
                    <tr>
                        <td>Giá gốc: </td>
                        <td><input type="text" value={(Gia - (Gia * 15 / 100)).toLocaleString()} onChange={HandleChangeGia}></input></td>
                    </tr>
                    <tr>
                        <td>Số lượng tồn:</td>
                        <td><input type="text" value={SoLuongTon} onChange={HandleChangeSoLuongTon}></input></td>
                    </tr>
                    <tr>
                        <td>Mã giảm giá:</td>
                        <td><input type="text" value={MaGiamGia} onChange={HandleChangeMaGiamGia} disabled></input></td>
                        <td><select onChange={HandleChangeMaGiam}>
                            {dataDiscount.map(index =>(
                                <option key={index} value={index.MaGiamGia}>{index.MaGiamGia} || {index.PhanTramGiam}%</option>
                            ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Mã loại sản phẩm:</td>
                        <td><input type="text" value={MaLoaiSanPham} onChange={HandleChangeMaLoaiSP} disabled></input></td>
                        <td><select onChange={HandleChangeLoaiSanPham}>
                            {dataType.map(index =>(
                                <option key={index} value={index.MaLoaiSanPham}>{index.MaLoaiSanPham} || {index.TenLoaiSanPham}</option>
                            ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Mã nhà sản xuất:</td>
                        <td><input type="text" value={MaNhaSanXuat} onChange={HandleChangeMaNhaSX} disabled></input></td>
                        <td><select onChange={HandleChangeNhaSanXuat}>
                            {dataManufacturer.map(index =>(
                                <option key={index} value={index.MaNhaSanXuat}>{index.MaNhaSanXuat} || {index.NhaSanXuat}</option>
                            ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Mã thương hiệu:</td>
                        <td><input type="text" value={MaThuongHieu} onChange={HandleChangeMaTT} disabled></input></td>
                        <td><select onChange={HandleChangeThuongHieu}>
                            {dataBrand.map(index =>(
                                <option key={index} value={index.MaThuongHieu}>{index.MaThuongHieu} || {index.TenThuongHieu}</option>
                            ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Upload Hình ảnh:</td>
                            <td>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    multiple 
                                    onChange={HandleChangeImage} 
                                />
                            </td>
                        <td>
                                    {index.DanhSachHinhAnh.split(',').map((image, idx) => (
                                        <img style={{width:"300px"}} key={idx} src={`http://localhost:4000/HinhAnhNhaThuocLongChau/${image}`} />
                            ))}
                        </td>
                        </tr>
                    <tr>
                        <td>
                            <button onClick={HandleVisible}>
                                <img src={edit} onClick={Submit} alt="Edit" />
                            </button>
                        </td>
                        <td>
                            <button>
                                <img src={bin} alt="Delete" onClick={Delete}/>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            ))}
            
        </div>
    )
}
export default ProductDetail