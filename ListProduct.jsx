import React, { useState } from "react";
import { LuPackageCheck } from "react-icons/lu";
import { FaTrophy } from "react-icons/fa";
import { GiHeartOrgan } from "react-icons/gi";
import { RiBrainFill } from "react-icons/ri";
import { GiStomach } from "react-icons/gi";
import { IoPeopleCircleSharp } from "react-icons/io5";
import Liver from './Image/liver-svgrepo-com.svg'
import Brain from './Image/brain-illustration-12-svgrepo-com.svg'
import Lung from './Image/lung-2-svgrepo-com.svg'
import Bone from './Image/bone-svgrepo-com.svg'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './CSS/ListProduct.css'
import './CSS/Menu.css'

import {Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import Quiz from "./Quiz.jsx"
import Cart from "./Cart.jsx";
import Detail from "./DetailOfProduct.jsx"
import CartDetail from "./CartDetail.jsx";
import Account from "./PersonalInfor.jsx";
import ManagePage from "./Manage/ManagePage.jsx";
import Footer from './Footer.jsx'
import FilterProduct from "./FilterProduct.jsx";

import axios from "axios";
import { useEffect } from "react";
const Banner = () => {
    var settings = {
        arrows:true,
        infinity: true,
        speed: 1000,
        slidesToShow:3,
        slidesToScroll:1,
        autoplay:false,
        autoplaySpeed: 2000,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    }
    return(
        <div className="SlideOfDoctor">
            <img className="bannerSlide" src="./src/LastProject/Image/welltopic_homepage_item_desk_bg_6461ad686a.webp"></img>
            <div className="title">
                <h1>Chuyên trang bệnh & sức khỏe</h1>
                <p>Tổng hợp thông tin và kiến thức chuyên sâu về các lĩnh vực sức khỏe</p>
                <button><a href="#">Tìm hiểu thêm</a></button>
            </div>
            <Slider className="slider" {...settings}>
                <div className="object_1">
                    <img src="./src/LastProject/Image/businessman-human-svgrepo-com.svg"></img>
                    <div>
                        <p>Bác sĩ</p>
                        <h2>Nguyễn Văn My</h2>
                        <p>Truyền nhiễm</p>
                    </div>
                </div>
                <div className="object_2">
                    <img src="./src/LastProject/Image/callcenter-human-svgrepo-com.svg"></img>
                    <div>
                        <p>Bác sĩ chuyên khoa 1</p>
                        <h2>Nguyễn Anh Tuấn</h2>
                        <p>Chuẩn đoán hình ảnh</p>
                    </div>
                </div>
                <div className="object_3">
                    <img src="./src/LastProject/Image/construction-man-svgrepo-com.svg"></img>
                    <div>
                        <p>Bác sĩ chuyên khoa 1</p>
                        <h2>Nguyễn Thị Khánh Vy</h2>
                        <p>Sản phụ khoa</p>
                    </div>
                </div>
                <div className="object_4">
                    <img src="./src/LastProject/Image/dentist-human-svgrepo-com.svg"></img>
                    <div>
                        <p>Bác Sĩ</p>
                        <h2>Nguyễn Lê Băng Giang</h2>
                        <p>Y học cổ truyền</p>
                    </div>
                </div>
                <div className="object_5">
                    <img src="./src/LastProject/Image/doctor-svgrepo-com.svg"></img>
                    <div>
                        <p>Bác sĩ</p>
                        <h2>Nguyễn Văn Tường</h2>
                        <p>Đa khoa</p>
                    </div>
                </div>
                <div className="object_6">
                    <img src="./src/LastProject/Image/human-man-3-svgrepo-com.svg"></img>
                    <div>
                        <p>Thạc sĩ - Bác sĩ</p>
                        <h2>Trần Thị Mỹ Linh</h2>
                        <p>Y học cổ truyền</p>
                    </div>
                </div>
                <div className="object_7">
                    <img src="./src/LastProject/Image/human-man-6-svgrepo-com.svg"></img>
                    <div>
                        <p>Bác sĩ</p>
                        <h2>Nguyễn Thị Thu Thảo</h2>
                        <p>Đa khoa</p>
                    </div>
                </div>
                <div className="object_8">
                    <img src="./src/LastProject/Image/human-man-10-svgrepo-com.svg"></img>
                    <div>
                        <p>Bác sĩ</p>
                        <h2>Dương Bích Tuyền</h2>
                        <p>Y học gia đình</p>
                    </div>
                </div>
                <div className="object_9">
                    <img src="./src/LastProject/Image/human-man-11-svgrepo-com.svg"></img>
                    <div>
                        <p>Bác sĩ chuyên khoa 1</p>
                        <h2>Nguyễn Thị Hương Lan</h2>
                        <p>Nhi khoa</p>
                    </div>
                </div>
            </Slider>
        </div>
    );
}
const SecondBanner = () => {
    return(
        <div className="second_banner">
            <img src="./src/LastProject/Image/TiemChung.jpg"></img>
            <div className="inject">
                <div className="first">
                        <img src="./src/LastProject/Image/TTTC_goitiemvacxin_2_e9afc7c5f1.webp"></img>
                        <div className="title">
                            <h4>Gói tiêm vắc xin</h4>
                            <p>Đa dạng chủng loại, phù hợp với từng lứa tuổi khách hàng.</p>
                            <a href="#">Xem chi tiết</a>
                        </div>
                </div>
                <div className="second">
                    <img src="./src/LastProject/Image/TTTC_hethongtiemchung_2_82b6f07e46.webp"></img>
                    <div className="title">
                        <h4>Hệ thống tiêm chủng</h4>
                        <p>Hiện đại và đẳng cấp, với hơn 99 trung tâm trên toàn quốc.</p>
                        <a href="#">Xem địa điểm</a>
                    </div>
                </div>
                <div className="third">
                    <img src="./src/LastProject/Image/TTTC_dkytiemchung_2_21733635fc.webp"></img>
                    <div className="title">
                        <h4>Đăng ký tiêm chủng</h4>
                        <p>Dễ dàng, giúp tiết kiệm thời gian khi làm thủ tục tại trung tâm.</p>
                        <a href="#">Đăng ký ngay</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
const ListWrapper = ({addToCart}) => {
    const [data, setData] = useState([]);
    const [MaSanPham, setMaSanPham] = useState('');
    const getData = async(res,req) => {
        const response = await axios.get('http://localhost:4000/dataHangHoaASC');
        if(response)
        {
            setData(response.data);
        }
        else{
            console.log("Failed!")
        }
    }
    const fetchProductData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/dataHangHoa/HinhAnh/${MaSanPham}`);
          setData(response.data);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        }
    };
    useEffect(() => {
        getData();
    },[MaSanPham]);
    var settings = {
        dots: false,
        arrows:true,
        infinity: true,
        speed: 3000,
        slidesToShow:5,
        slidesToScroll:5,
        autoplay:false,
        autoplaySpeed: 2000,
    }
    return( 
        <div className="list-wrapper">
            <Slider {...settings}>
            {data.map((index) => (
                <div className="product" key={index.MaSanPham}>
                    <Link to={`/ChiTietSanPham/${index.MaSanPham}`}>
                        <img className="product_img" 
                            src={`http://localhost:4000/HinhAnhNhaThuocLongChau/${index.HinhAnh}`} 
                            alt={"Product"} 
                        />
                    </Link>
                    <p className="nameOfProduct">{index.TenSanPham}</p>
                    <div className="opt">
                    {index.DangBaoChe == null ? (
                        <button className="btn_opt">Null</button>
                    ):(
                        <button className="btn_opt">{index.DangBaoChe}</button>
                    )}
                    </div>
                    {index.MaGiamGia != 0 ? (
                        <div>
                            <p className="priceOfProductWasDiscount">{(index.Gia - index.Gia*index.PhanTramGiam/100).toLocaleString('vi-VN')} VND</p>
                            <p className="priceOfProduct" style={{fontSize:16, textDecoration:'line-through', color:"black"}}>{index.Gia.toLocaleString('vi-VN')} VND</p>
                        </div>
                    ):(
                        <p className="priceOfProduct">{index.Gia.toLocaleString('vi-VN')} VND</p>
                    )
                    }
                    {index.CachDongGoi == null ? (
                        <button className="dcOfProduct">Null</button>
                    ):(
                        <button className="dcOfProduct">{index.CachDongGoi}</button>
                    )}
                    {index.SoLuongTon == 0 ? (
                            <button className="btn_buy" onClick={() => addToCart(index)} disabled style={{backgroundColor:"red"}}>Hết hàng</button>
                        ):(
                            <button className="btn_buy" onClick={() => addToCart(index)}>Chọn mua</button>
                        )
                    }
                </div>
            ))}
            </Slider>
        </div>
    );
}
const CheckHealth = () =>{
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    };
    return(
        <div className="checkHealth">
            <img src="./src/LastProject/Image/Remove-bg.ai_1726210794678.png"></img>
            <div className="title">
                <h2>Kiểm tra sức khỏe</h2>
            </div>
            <p>Kết quả đánh giá sẽ cho bạn lời khuyên phù hợp!</p>
            <div className="opt">
                <div className="opt1">
                    <GiHeartOrgan size={60} color="blue"/>
                    <div>
                        <p>Kiểm tra nguy cơ mắc bệnh tim mạch</p>
                        <Link to="/quiz/quiz-tim-mach" onClick={scrollTop}>Bắt đầu</Link>
                    </div>
                </div>
                <div className="opt2">
                    <RiBrainFill size={60} color="blue"/>
                    <div>
                        <p>Kiểm tra nguy cơ mắc bệnh Alzheimer</p>
                        <Link to="/quiz/quiz-nao" onClick={scrollTop}>Bắt đầu</Link>
                    </div>
                </div>
                <div className="opt3">
                    <GiStomach size={60} color="blue"/>
                    <div>
                        <p>Kiểm tra nguy cơ mắc bệnh trào ngược dạ dày</p>
                        <Link to="/quiz/quiz-da-day" onClick={scrollTop}>Bắt đầu</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
const TradeMark = () => {
    var settingsTradeMark = {
        arrows:true,
        infinity: true,
        speed: 300,
        slidesToShow:5,
        slidesToScroll:1,
        autoplay:false,
        autoplaySpeed: 2000
    }
    return(
        <div className="trademark">
            <div className="title">
                <LuPackageCheck size={25}/>
                <p>Thương hiệu yêu thích</p>
            </div>
            <Slider className="slider" {...settingsTradeMark}>
                <div className="one">
                    <img className="mainImage" src="./src/LastProject/Image/4_0f95cb845b.webp"></img>
                    <img className="subImage" src="./src/LastProject/Image/Jpanwell_2_81e568c17e.webp" alt="" />
                </div>
                <div className="four">
                    <img className="subImage" src="./src/LastProject/Image/ThuongHieu/TH037.jpg" alt="" />
                </div>
                <div className="five">
                    <img className="subImage" src="./src/LastProject/Image/ThuongHieu/TH030.jpg"></img>
                </div>
                <div className="six">
                    <img className="subImage" src="./src/LastProject/Image/ThuongHieu/TH031.jpg" alt="" />
                </div>
                <div className="seven">
                    <img className="subImage" src="./src/LastProject/Image/ThuongHieu/TH038.jpeg" alt="" />
                </div>
                <div className="eight">
                    <img className="subImage" src="./src/LastProject/Image/ThuongHieu/TH035.jpg" alt="" />
                </div>
            </Slider>
        </div>
    );
}
const OutStanding = () => {
    const [data, setData] = useState([]);
    const getData = async() => {
        const response = await axios.get('http://localhost:4000/dataPopularCategory');
        if(response)
            setData(response.data)
        else
            console.log("Failed!");
    }
    useEffect(() => {
        getData();
    },[])
    return(
        <div className="CategoryOutstanding">
            <div className="title">
                <FaTrophy size={25}/>
                <p className="">Danh mục nổi bật</p>
            </div>
            <div className="Popular_category">
                {data.map((index) => (
                    <div className="Category" key={index}>
                        {index.MaLoaiSanPham == "LSP001" && (
                            <img src={Lung}></img>
                        )}
                        {index.MaLoaiSanPham == "LSP002" && (
                            <img src={Brain}></img>
                        )}
                        {index.MaLoaiSanPham == "LSP003" && (
                            <img src={Liver}></img>
                        )}
                        {index.MaLoaiSanPham == "LSP004" && (
                            <img src={Bone}></img>
                        )}
                        {index.MaLoaiSanPham == "LSP005" && (
                            <img src={Liver}></img>
                        )}
                        {index.MaLoaiSanPham == "LSP006" && (
                            <img src={Brain}></img>
                        )}
                        {index.MaLoaiSanPham == "LSP007" && (
                            <img src={Bone}></img>
                        )}
                        {index.MaLoaiSanPham == "LSP008" && (
                            <img src={Lung}></img>
                        )}
                        <p id="name">{index.TenLoaiSanPham}</p>
                        <p id="quantity">{index.SoLoaiSanPham}<label> Sản phẩm</label></p>
                    </div>
                ))}
            </div>
            <div className="banner-cancer">
                <div>
                    <p className="title">HIỂU VỀ UNG THƯ TỪ A-Z</p>
                    <h2>Thông tin được biên soạn và kiểm duyệt bởi đội ngũ
                        chuyên gia y tế hàng đầu
                    </h2>
                    <button>Tìm hiểu thêm</button>
                </div>
            </div>
        </div>
    );
}
const ProductOfOPP = ({addToCart}) => {
    const [data, setData] = useState([]);
    const [MaSanPham, setMaSanPham] = useState('');
    const [filter, setFilter] = useState('trẻ em');
    const getFilteredData = async (filter) => {
        try {
            const response = await axios.get(`http://localhost:4000/dataHangHoaOOP?DoiTuong=${filter}`);
            setData(response.data);
        } catch (error){
            console.error("Error fetching data:", error);
        }
    };
    const fetchProductData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/dataHangHoa/HinhAnh/${MaSanPham}`);
          setData(response.data);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        }
    };
    useEffect(() => {
        if(filter)
            getFilteredData(filter);
    },[MaSanPham ,filter]);
    
    var settings = {
        dots: false,
        arrows:true,
        infinity: true,
        speed: 1000,
        slidesToShow:5,
        slidesToScroll:1,
        autoplay:false,
        autoplaySpeed: 2000,
    }
    return(
        <div className="productByOOP">
            <img className="banner" src="./src/LastProject/Image/Remove-bg.ai_1726211165900.png"></img>
            <div className="title">
                <IoPeopleCircleSharp size={30}/>
                <p style={{color:"black", fontSize:"20px", fontWeight:"bold"}}>Sản phẩm theo đối tượng</p>
            </div>
            <div className="opt">
                <button onClick={() => getFilteredData("trẻ em")}>Trẻ em</button>
                <button onClick={() => getFilteredData("người lớn")}>Người lớn</button>
                <button onClick={() => getFilteredData("Mọi")}>Đa đối tượng</button>
                <button onClick={() => getFilteredData("Bệnh")}>Người bệnh</button>
            </div>
            <div className="wrapperOOP">
            <Slider {...settings}>
            {data.map((index) => (
                <div className="product" key={index.MaSanPham}>
                    <Link to={`/ChiTietSanPham/${index.MaSanPham}`}>
                        <img className="product_img" 
                            src={`http://localhost:4000/HinhAnhNhaThuocLongChau/${index.DuongDan}`} 
                            alt={"Product"} 
                        />
                    </Link>
                    <p className="nameOfProduct">{index.TenSanPham}</p>
                    <div className="opt">
                    {index.DangBaoChe == null ? (
                        <button className="btn_opt">Null</button>
                    ):(
                        <button className="btn_opt">{index.DangBaoChe}</button>
                    )}
                    </div>
                    {index.MaGiamGia != 0 ? (
                        <div>
                            <p className="priceOfProductWasDiscount">{(index.Gia - index.Gia*index.PhanTramGiam/100).toLocaleString('vi-VN')} VND</p>
                            <p className="priceOfProduct" style={{fontSize:16, textDecoration:'line-through', color:"black"}}>{index.Gia.toLocaleString('vi-VN')} VND</p>
                        </div>
                    ):(
                        <p className="priceOfProduct">{index.Gia.toLocaleString('vi-VN')} VND</p>
                    )
                    }
                    {index.CachDongGoi == null ? (
                        <button className="dcOfProduct">Null</button>
                    ):(
                        <button className="dcOfProduct">{index.CachDongGoi}</button>
                    )}
                    <button className="btn_buy" onClick={() => addToCart(index)}>Chọn mua</button>
                </div>
            ))}
            </Slider>
            </div>
        </div>
    );
}
const MainBanner = () => {
    var settings = {
        dots: true,
        arrows:true,
        infinity: true,
        speed: 3000,
        slidesToShow:1,
        slidesToScroll:1,
        autoplay:true,
        autoplaySpeed: 2000,
    }
    const scrollDown = () => {
        window.scrollTo({
            top: 1600,
            behavior: "smooth"
        })
    };
    return(
        <>
            <div className="content"></div>
            <div className="banner">
                <Slider className="slider" {...settings}>
                    <div><img src="./src/LastProject/Image/pic1_slick.jpg"></img></div>
                    <div><img src="./src/LastProject/Image/pic2_slick.jpg"></img></div>
                    <div><img src="./src/LastProject/Image/pic3_slick.jpg"></img></div>
                    <div><img src="./src/LastProject/Image/pic4_slick.jpg"></img></div>
                    <div><img src="./src/LastProject/Image/pic5_slick.jpg"></img></div>
                </Slider>
                <div className="left_banner">
                    <div className="banner2"><img src="./src/LastProject/Image/banner1.jpg"></img></div>
                    <div className="banner3"><img src="./src/LastProject/Image/banner2.jpg"></img></div>
                </div>
            </div>
            <div className="type">
                <button className="type_1">
                    <img src="./src/LastProject/Image/pill-svgrepo-com.svg"></img>
                    <p id="type-title">Cần mua thuốc</p>
                </button>
                <button className="type_2">
                    <img src="./src/LastProject/Image/doctor-svgrepo-com.svg"></img>
                    <p id="type-title">Tư vấn với dược sĩ</p>
                </button>
                <button className="type_3">
                    <img src="./src/LastProject/Image/locate-mobile-ui-svgrepo-com.svg"></img>
                    <p id="type-title">Tìm nhà thuốc</p>
                </button>
                <button className="type_4">
                    <img src="./src/LastProject/Image/note-medical-svgrepo-com.svg"></img>
                    <p id="type-title">Đơn của tôi</p>
                </button>
                <button className="type_6" onClick={scrollDown}>
                    <img src="./src/LastProject/Image/check-file-svgrepo-com.svg"></img>
                    <p id="type-title">Kiểm tra sức khỏe</p>
                </button>
            </div>
        </>
    );
}
const PrivateRoute = () => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem("userType");
    if(userRole !== "1" && userRole !== "2")
        return navigate("/")
    return <Outlet></Outlet>
}
function ListProduct({}){
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCartItems = localStorage.getItem('cartItems');
            return savedCartItems ? JSON.parse(savedCartItems) : [];
        } catch (error) {
            console.error("Error parsing cartItems from localStorage:", error);
            return [];
        }
    });
    const [isLogin, setIsLogin] = useState(!!localStorage.getItem('userPhoneNumber'));
    const [newOrder, setNewOrder] = useState({
        TongTien: 0,
        NgayTaoDonHang: '',
        PhuongThucThanhToan: '',
        TinhTrangDonHang: 'Chưa thanh toán',
        TinhTrangGiaoHang: 'Chưa giao',
        emailKhachHang: localStorage.getItem('userPhoneNumber'),
        emailNhanVien: ''
    })
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);
    const addToCart = (product) => {
        setCartItems(prevCartItems => {
            const existingItem = prevCartItems.find(item => item.MaSanPham === product.MaSanPham);
            let updatedCartItems;
            if (existingItem) {
                if(existingItem.quantity + 1 > product.SoLuongTon)
                {
                    alert("Số lượng thêm vào giỏ hàng lớn hơn số lượng tồn trong kho")
                    return prevCartItems;
                } else {
                updatedCartItems = prevCartItems.map(item =>
                    item.MaSanPham === product.MaSanPham
                        ? { ...item, quantity: item.quantity + 1 }
                        : item 
                )}
            } else {
                updatedCartItems = [...prevCartItems, { ...product, quantity: 1 }];
            }
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            localStorage.setItem('quantity', product.SoLuongTon)
            console.log("Đã thêm sản phẩm vào giỏ hàng:", product);
            alert("Đã thêm sản phẩm vào giỏ hàng")
            return updatedCartItems;
        });
    };

    const location = useLocation();
    const isQuizPage = location.pathname.startsWith("/quiz");
    const isDetailPage = location.pathname.startsWith("/ChiTietSanPham");
    const isCartPage = location.pathname.startsWith("/Cart");
    const isManagePage = location.pathname.startsWith("/ManagePage");
    const isAccountPage = location.pathname.startsWith("/Account");
    const isFilterPage = location.pathname.startsWith("/FilterPage");
    const isConfirm = location.pathname.startsWith("/Confirm");
    return(
        <>  
            {/*Ẩn các component khi link = quiz || ChiTietSanPham*/ }
            {!isQuizPage && !isDetailPage && !isCartPage && !isAccountPage && !isManagePage && !isFilterPage && !isConfirm && (
                <>
                    <MainBanner></MainBanner>
                    <ListWrapper addToCart={addToCart}></ListWrapper>
                    <TradeMark></TradeMark>
                    <OutStanding></OutStanding>
                    <CheckHealth></CheckHealth>
                    <ProductOfOPP addToCart={addToCart}></ProductOfOPP>
                </>
            )}
            <Routes>
                <Route path="/quiz/*" element={<Quiz/>}></Route>
                <Route path="/ChiTietSanPham/:MaSanPham" element={<Detail addToCart={addToCart}></Detail>}></Route>
                <Route path="/Cart/*" element={<Cart cartItems={cartItems} setCartItems={setCartItems} isLogin={isLogin}></Cart>}></Route>
                <Route path="/Confirm" element={<CartDetail cartItems={cartItems} setCartItems={setCartItems}></CartDetail>}></Route>
                <Route element={<PrivateRoute></PrivateRoute>}>
                    <Route path="/ManagePage/*" element={<ManagePage></ManagePage>}/>
                </Route>
                <Route path="/FilterPage/:MaLoaiSanPham" element={<FilterProduct addToCart={addToCart}></FilterProduct>}></Route>
                <Route path="/FilterPage/" element={<FilterProduct addToCart={addToCart}></FilterProduct>}></Route>
            </Routes>
        </>
    );
}
export default ListProduct