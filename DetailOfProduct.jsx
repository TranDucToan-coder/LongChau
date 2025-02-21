import React,  {useState, useEffect} from "react";
import axios from 'axios'
import Slider from "react-slick";
import "./CSS/Detail.css"

import {Routes, Route, Link, useLocation, useParams } from "react-router-dom";
function Detail({addToCart}){
    const { MaSanPham } = useParams();
    const [data, setData] = useState([]);
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
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    };
    const [value, setValue] = useState(1);
    const CheckValueInput = (e) => {
        if(value > 99 || value <= 0)
            setValue(1);
        else 
            setValue(e.target.value)
    }
    const getData = async () => {
        const response = await axios.get(`http://localhost:4000/dataHangHoa/${MaSanPham}`)
        if(response)
        {
            setData(response.data);
        }
        else
            console.log("Failed!");
    }
    useEffect(() => {
        console.log("MaSanPham:", MaSanPham);
        if(MaSanPham){
            getData();
        }else {
            console.error("MaSanPham is undefined");
        }
    },[MaSanPham])
    return(
        <>
                {data.map(index => (
                    <div className="detail-product" key={index.MaSanPham}>
                    <div className="left">
                        <div className="image">
                            {index.DanhSachHinhAnh.split(',').length > 1 ? (
                                <Slider {...settings}>
                                    {index.DanhSachHinhAnh.split(',').map((image, idx) => (
                                        <img key={idx} src={`http://localhost:4000/HinhAnhNhaThuocLongChau/${image}`} />
                                    ))}
                                </Slider>
                            ) : (<img src={`http://localhost:4000/HinhAnhNhaThuocLongChau/${index.DanhSachHinhAnh}`} />)}
                        </div>
                    </div>
                    <div className="right">
                        <p>Thương hiệu: {index.TenThuongHieu}</p>
                        <h2>{index.TenSanPham}</h2>
                        <p>{index.MaSanPham}</p>
                        {index.MaGiamGia != 0 ? (
                        <div>
                            <h1 className="priceOfProductWasDiscount">{(index.Gia - index.Gia*index.PhanTramGiam/100).toLocaleString('vi-VN')} VND</h1>
                            <h1 className="priceOfProduct" style={{fontSize:16, textDecoration:'line-through', color:"black"}}>{index.Gia.toLocaleString('vi-VN')} VND</h1>
                        </div>
                            ):(
                        <h1 className="priceOfProduct">{index.Gia.toLocaleString('vi-VN')} VND</h1>)}
                        <table>
                            <tbody>
                                <tr>
                                    <td className="title">Dạng bào chế:</td>
                                    <td>{index.DangBaoChe}</td>
                                </tr>
                                <tr>
                                    <td className="title">Quy cách:</td>
                                    <td>{index.CachDonggoi}</td>
                                </tr>
                                <tr>
                                    <td className="title">Thành phần:</td>
                                    <td>{index.ThanhPhanChinh}</td>
                                </tr>
                                <tr>
                                    <td className="title">Nhà sản xuất:</td>
                                    <td>{index.NhaSanXuat}</td>
                                </tr>
                                <tr>
                                    <td className="title">Thuốc cần kê toa không:</td>
                                    <td>{index.SanPhamCanKeToaKhong != 0 ? (<label>Không</label>):(<label>Có</label>)}</td>
                                </tr>
                                <tr>
                                    <td className="title">Mô tả ngắn:</td>
                                    <td>{index.CongDungChinh}</td>
                                </tr>
                                <tr>
                                    <td className="title">Đối tượng sử dụng:</td>
                                    <td>{index.DoiTuong}</td>
                                </tr>
                                <tr>
                                    <td className="title">Chọn số lượng:</td>
                                    <td><input type="number" onChange={CheckValueInput} value={value} max={index.SoLuongTon} min={1} ></input> || Còn lại: {index.SoLuongTon}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            {index.SoLuongTon == 0 ?(<button disabled style={{backgroundColor:"red"}} className="Btn_AddToCart" onClick={() => addToCart(index, value)}>
                                hết hàng
                            </button>):(
                            <button className="Btn_AddToCart" onClick={() => addToCart(index, value)}>
                                Chọn mua
                            </button>
                            ) 
                            }
                            <Link to="/"><button className="Btn_Return" onClick={scrollTop}>Quay lại</button></Link>
                        </div>
                    </div>
                    </div>
                ))}
            <Routes>
                
            </Routes>
        </>
    );
}
export default Detail