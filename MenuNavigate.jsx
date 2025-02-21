import React, { useEffect, useState } from "react";
import '../LastProject/CSS/Menu.css'
import '../LastProject/CSS/Login.css'
import logo from'./Image/Logo_LC.svg'
import { IoMdClose } from "react-icons/io";
import { IoIosPhonePortrait} from "react-icons/io";
import { IoMdMegaphone } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { FaAngleDoubleUp } from "react-icons/fa";
import { Routes, Route, Link, useLocation, useNavigate} from "react-router-dom";
import SecondNavigate from "./SecondNavigate";
import ManagePage from "./Manage/ManagePage";
import Cart from "./Cart";
import Account from "./PersonalInfor";
import axios from "axios";
import Detail from "./DetailOfProduct";

const LoginPage = ({ show, onClose, setShowOtp, setPhoneNumber, setName, setEmail , setAddress, setType, setAdmin}) => {
    if (!show) {
        return null;
    }
    const Navigate = useNavigate();
    //Só điện thoại
    const [phoneNumber, setLocalPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const getAccount = async (phone) => {
        try {
            const responseCus = await axios.get(`http://localhost:4000/Customer/${phone}`); 
            const responseType = await axios.get(`http://localhost:4000/TypeAc/${phone}`);
            if (responseCus.data && responseCus.data.length > 0) {
                const accountData = responseCus.data[0];
                const typeAcData = responseType.data[0];
                setName(accountData.TenKhachHang);
                setEmail(accountData.MaSoDienThoaiKhachHang);
                setAddress(accountData.DiaChi);
                setPhoneNumber(phone);
                setType(typeAcData.LoaiTaiKhoan);
                return true;
            }
            const responseEmp = await axios.get(`http://localhost:4000/data/${phone}`);   
            if (responseEmp.data && responseEmp.data.length > 0) {
                const accountData = responseEmp.data[0];
                const typeAcData = responseType.data[0];
                setName(accountData.TenNhanVien);
                setEmail(accountData.MaSoDienThoaiNhanVien);
                setAdmin(phone)
                setPhoneNumber(phone);
                setType(typeAcData.LoaiTaiKhoan);
                return true; 
            }
            return false;
        } catch (error) {
            console.error("Lỗi khi kiểm tra tài khoản:", error);
            return false;
        }
    };
    
    const sendOTP = async (phone) => {
        try {
            await axios.post('http://localhost:4000/sendOTP', { phoneNumber: phone });
        } catch (error) {
            console.error("Lỗi khi gửi OTP:", error);
            setErrorMessage("Đã xảy ra lỗi khi gửi OTP. Vui lòng thử lại.");  
        }
    }
    useEffect(() => {
        if(phoneNumber){
            getAccount(phoneNumber);
        }
    }, [phoneNumber])
    //Hàm xử lý
    const handleChangeValue = (e) => {
        const phone = e.target.value
        setLocalPhoneNumber(phone);
        setErrorMessage("");
    }
    const CheckPhoneNumber = (phoneNumber) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(phoneNumber))
        {
            setErrorMessage('Email không hợp lệ! Vui lòng nhập lại.');
            return false;
        }
        return true;
    }
    const handleSubmit = async () => {
        console.log(phoneNumber);
        if (CheckPhoneNumber(phoneNumber)) {
            const isPhoneExists = await getAccount(phoneNumber);
            if (isPhoneExists) {
                await sendOTP(phoneNumber);
                onClose();
                setShowOtp(true);
                console.log("User data saved to localStorage:");
            } else {
                alert("Email chưa được đăng ký");
            }
        }
    };
    return (
        <div className="wrapper-login">
            <div className="login-content">
                <div className="title">
                    <h2>Đăng nhập hoặc Đăng ký</h2>
                    <p>Vui lòng đăng nhập để hưởng những đặc quyền dành cho thành viên.</p>
                </div>
                <div className="input">
                    <input type="text" placeholder="Nhập email đã đăng ký" onChange={handleChangeValue} value={phoneNumber}/>
                    {errorMessage && <p className="error-message" style={{color:"red"}}>{errorMessage}</p>}
                </div>
                <div className="Submit">
                    <button onClick={handleSubmit}>Tiếp tục</button>
                    <button className="btn_close" onClick={onClose}>Thoát</button>
                </div>
            </div>
        </div>
    );
};
const SubNavigate = ({phoneNumber, onLogout}) => {
    const isAdmin = localStorage.getItem("userType");
    return(
        <>
            <div className="sub_navigate_menu">
                <p className="title">Chào mừng: {phoneNumber}</p>
                <ul className="option">
                    {(isAdmin === "0") && (
                        <li className="otp1"><Link to='/Account'>Thông tin cá nhân</Link></li>
                    )}
                    {(isAdmin === "1" || isAdmin === "2") && (
                        <li className="otp3"><Link to='/ManagePage'>Trang quản lý</Link></li>
                    )}
                    <li className="otp2" ><Link to="" onClick={onLogout}>Đăng xuất</Link></li>
                </ul>
            </div>
        </>
    );
}
const OTP = ({phoneNumber, onClose, setIsLogin, Name, Email, Address, Type, Admin}) => {
    const [otpSent, setOtpSent] = useState(true);
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [otpError, setOtpError] = useState('');
    const [minute, setMinute] = useState(5);
    const [second, setSecond] = useState(0);
    const navigate = useNavigate();

    const HandleChangeOTP = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value) || value === '') { 
            const newOtp = [...otp];
            newOtp[index] = value; 
            setOtp(newOtp);
            setOtpError('');
            if (value) { 
                const nextInput = document.querySelector(`.textOTP_${index + 2}`);
                if (nextInput != null) nextInput.focus();
            }
        }
    }
    const HandleResendOtp = () => {
        alert(`Mã OTP đã được gửi lại đến số ${phoneNumber}`);
        setMinute(5);
        setSecond(0);
        setOtpSent(true);
        setOtp(Array(6).fill(''));
    };
    useEffect(() => {
        if(otpSent){
            const timer = setInterval(() => {
                if(second === 0)
                    if(minute === 0)
                        clearInterval(timer);
                    else{
                        setMinute(minute - 1);
                        setSecond(59)
                    }
                else{
                    setSecond(second - 1)
                }
            }, 1000);
            return () => clearInterval(timer);}
    }, [ second, minute]);
    const HandleSubmit = async() => {
        const generatedOtp = '253868';
        if(minute === 0 && second === 0){
            setOtpError('Mã OTP đã hết thời hạn, vui lòng nhập mã khác!')
            return;
        }
        else{
            if (otp.join('') === generatedOtp) {
                alert("Xác nhận thành công");
                localStorage.setItem('userName', Name);
                localStorage.setItem('userEmail', Email);
                localStorage.setItem('userPhoneNumber', phoneNumber);
                localStorage.setItem('userAddress', Address)
                localStorage.setItem('userType', Type)
                localStorage.setItem('Admin', Admin)

                console.log(Name);
                console.log(Email);
                console.log(phoneNumber);
                console.log(Type);
                console.log("Nhân viên: " + Admin);
                setIsLogin(true);
                onClose();

                const currentDate = new Date();
                const vietnamTime = new Date(currentDate.getTime() + (7 * 60 * 60 * 1000));
                const formattedDate = vietnamTime.toISOString().slice(0, 19).replace('T', ' ');
                console.log(formattedDate); 
                localStorage.setItem("DateBatDau", formattedDate)
                const newInf = {
                    Email: phoneNumber,
                    DateBatDau: formattedDate
                }
                if(Type === "1" || Type === "2")
                {
                    const response = await axios.post('http://localhost:4000/chamcong', newInf);
                    if(response)
                    {
                        console.log("Nhân viên đã được bắt đầu chấm công")
                    }
                }
            } else {
                setOtpError("Mã OTP không chính xác. Vui lòng thử lại.");
            }
        }
    }
    return(
        <>
            <div className="wrapper-otp">
                <div className="content-otp">
                    <button onClick={onClose}><IoMdClose size={35} className="exit_btn"/></button>
                    <div className="title">
                        <h2>Nhập mã xác thực</h2>
                        <p>Mã xác thực đã được gửi đến số {phoneNumber}</p>
                        {minute === 0 && second === 0 ?(
                            <p>Mã đã hết hiệu lực</p>
                        ):(
                            <p>Mã có hiệu lực trong {minute} phút {second} giây</p>
                        )}
                        <div><p>Vui lòng nhập mã OTP để xác thực</p></div>
                    </div>
                    <div className="OTP-value">
                        {otp.map((value, index) => (
                            <input 
                            key={index}
                            type="text"
                            maxLength={1}
                            className={`textOTP_${index + 1}`}
                            onChange={(e) => HandleChangeOTP(e, index)}>
                            </input>
                        ))}
                    </div>
                    {otpError && (<p style={{color:'red', textAlign:'center'}}>{otpError}</p>)}
                    <div className="Submit">
                        <button onClick={HandleSubmit}>Xác thực</button>
                        <a href="#" onClick={HandleResendOtp}>Gửi lại mã xác nhận cho tôi</a>
                    </div>
                </div>
            </div>
        </>
    );
}
function MainMenu({ openModal, phoneNumber, isLogin, setPhoneNumber}) {
    const items = ["Kem chống nắng", "Canxi", "Sữa rửa mặt", "D3", "Sắt", "Dhc", "Thuốc nhỏ mắt"];
    const [visable, setVisable] = useState(false);
    const handleScrollDown = () => {
        if (window.scrollY > 500) setVisable(true);
        else setVisable(false);
    };
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScrollDown);
        return () => window.removeEventListener("scroll", handleScrollDown);
    }, []);
    const handleLogout = (setIsLogin) => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPhoneNumber');
        OffCa();
        setIsLogin(false);
        setPhoneNumber("");
        alert("You have logged out.");
    };
    //SearchBar
    const [result, setResult] = useState('')
    const [active, isActive] = useState(false);
    const HandleChangeTextField = (e) => {
        const value = e.target.value;
        setResult(value); 
        if (value.trim() === "") {
            isActive(false);
        } else {
            isActive(true);
        }
    };
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const getData = async() => {
        const response = await axios.get('http://localhost:4000/dataHangHoa');
        const resultQuery = response.data;
        setData(resultQuery);
    }
    useEffect(() => {
        getData();
        if (result.trim() === "") {
            setFilteredData([]); 
        } else {
            const filtered = data.filter((item) =>
                item.TenSanPham.toLowerCase().includes(result.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }, [result, data])
    return (
        <div className="wrapper">
            <div className="first-line">
                <p id="title-1"><IoMdMegaphone id="icon-notification" color="white" size={20} />Trung tâm bán thuốc Long Châu</p>
                <a id="link-detail" href="#">Xem chi tiết</a>
                <p id="title-1"><FaPhone color="white" size={15} /><a id="link-download" href="#">Tải ứng dụng</a></p>
                <p id="title-1"><IoIosPhonePortrait id="icon-phone" color="white" size={18} />Tư vấn ngay: 1800 XXXX</p>
            </div>
            <div className="second-line">
                <div id="Logo">
                    <Link to=""><img src={logo} alt="Logo" /></Link>
                </div>
                <div id="Search-bar">
                    <div>
                        <input type="text" placeholder="Tìm tên thuốc, bệnh lý, thực phẩm chức năng..."  value={result} onChange={HandleChangeTextField}/>
                        <HiMagnifyingGlass size={25} id="icon-glass" />
                    </div>
                    {active && (
                        <div className="ResultOfSearch">
                            {filteredData.length > 0 ? (
                                <ul style={{listStyle:"none"}}>
                                    {filteredData.map((item) => (
                                        <div style={{display:"flex"}}>
                                            <li key={item.MaSanPham}><Link to={`/ChiTietSanPham/${item.MaSanPham}`} 
                                                style={{display:"flex", margin:"10px"}}>
                                            <div className="scaleImage">
                                                <img className="product_img" 
                                                    src={`http://localhost:4000/HinhAnhNhaThuocLongChau/${item.HinhAnh}`} 
                                                    alt={"Product"} 
                                                    style={{width:"100px",marginRight:"10px"}}

                                                />
                                            </div>
                                            <p style={{color:"black"}}>{item.TenSanPham}</p>
                                            </Link></li>
                                        </div>
                                    ))}
                                </ul>
                            ) : (
                                <p>Không tìm thấy kết quả</p>
                            )}
                        </div>
                    )
                    }
                </div>
                <div className="Sign-Up">
                    <FaUser id="icon-user" color="white" />
                    {isLogin ? (
                        <SubNavigate phoneNumber={phoneNumber} onLogout={handleLogout}></SubNavigate>
                    ) : (
                        <button className="btn_login" onClick={openModal}>Đăng nhập</button>
                    )}
                </div>
                <div className="Cart">
                    <Link to="/Cart">
                        <button>
                            <CiShoppingCart id="icon-cart" color="white" size={20} />
                            Giỏ hàng
                        </button>
                    </Link>
                </div>
            </div>
            <div className="third-line">
                {items.map((item, index) => (
                    <a href="#" className="list-item" key={index}>{item}</a>
                ))}
            </div>
            <div>
                {visable && (
                    <button className="up" onClick={scrollTop}><FaAngleDoubleUp /></button>
                )}
            </div>
        </div>
    );
}
function Menu() {
    const [showModal, setShowModal] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('userPhoneNumber') || '');
    const [Name, setName] = useState(localStorage.getItem('userName') || '');
    const [Email, setEmail] = useState(localStorage.getItem('userEmail') || '');
    const [Address, setAddress] = useState(localStorage.getItem('userAddress') || '');
    const [Type, setType] = useState(localStorage.getItem('userType') || '')
    const [Admin, setAdmin] = useState(localStorage.getItem('Admin') || '')
    const [isLogin, setIsLogin] = useState(!!localStorage.getItem('userPhoneNumber'));

    const openModal = () => {   
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        setShowOtp(false);
    };
    const location = useLocation();
    const isAccount = location.pathname === "/Account";
    const isManage = location.pathname.startsWith("/ManagePage");

    useEffect(() => {
        const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
        const storedName = localStorage.getItem('userName');
        const storedEmail = localStorage.getItem('userEmail');
        const storedType = localStorage.getItem('userType');
        if (storedPhoneNumber) {
            setPhoneNumber(storedPhoneNumber);
            setIsLogin(true);
        }
        if (storedName) {
            setName(storedName);
        }
        if (storedEmail) {
            setEmail(storedEmail);
        }
        if (storedType) {
            setType(storedType);
        }
    }, []);
    return (
        <>
        {!isManage && (
            <>
            <LoginPage 
            show={showModal} 
            onClose={closeModal}
            setShowOtp={setShowOtp}
            setPhoneNumber={setPhoneNumber}
            setEmail={setEmail}
            setName={setName}
            setType={setType}
            setAddress={setAddress}
            setAdmin={setAdmin}/> 
            {location.pathname !== "" && (
                <MainMenu openModal={openModal}
                    isLogin={isLogin} 
                    phoneNumber={phoneNumber} 
                    setIsLogin={setIsLogin}
                /> 
            )} 
            {showOtp && <OTP 
                phoneNumber={phoneNumber} 
                Name={Name}
                Email={Email}
                Address={Address}
                Type={Type}
                Admin={Admin}
                onClose={closeModal} 
                setIsLogin={setIsLogin}/>}
            <SecondNavigate></SecondNavigate>
            </>
        )
    }
        <Routes>
            <Route path="/Account" element={<Account Name={Name} Email={Email} phoneNumber={phoneNumber} Address={Address}/>} />
        </Routes>
    </>
    );
}
export default Menu;
