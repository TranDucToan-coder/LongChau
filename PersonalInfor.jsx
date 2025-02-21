import React, { useEffect, useState } from "react";
import './CSS/Account.css'
import avatar from "./Image/Avatar/Avatar_female.png"
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function History(){
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [visible, setVisible] = useState(false);
  const getData = async() => {
    try {
      const Email = localStorage.getItem("userPhoneNumber")
      const response = await axios.get(`http://localhost:4000/Account/Order/${Email}`);
      if(response)
        setData(response.data);
    } catch (error) {
        console.log("Failed!")
    }
  }
  useEffect(() => {
    getData();
  },[])
  useEffect(() => {

  },[])
  const getHistory = (id) => {
    const filtered = data.filter((item) => item.MaDonHang === id);
    setFiltered(filtered);
    setVisible(true);
    console.log(id)
};
  return(
  <>
    <h4>Đây là lịch sử đặt hàng</h4>
    <table className="TableOfInfor" style={{width:"100%"}}>
      <tr>
        <td>Mã đơn hàng</td>
        <td>Ngày tạo đơn hàng</td>
        <td>Tổng tiền</td>
        <td colSpan={2} style={{textAlign:"center"}}>#</td>
      </tr>
        {data.map((index) => (
      <tr>
          <td>{index.MaDonHang}</td>
          <td>{(index.NgayTaoDonHang).slice(0,10)}</td>
          <td>{(index.TongTien).toLocaleString('vi-VN')} VND</td>
          <td><button className="process" onClick={() => getHistory(index.MaDonHang)} style={{cursor:"pointer"}}>Chi tiết</button></td>
          <td>
              {index.TinhTrangGiaoHang === "Đang xử lý" ? (
                <button disabled className="process">Đơn hàng đang được xử lý</button>
              ) : index.TinhTrangGiaoHang === "Đang giao hàng" ? (
                <button disabled className="process">Đơn hàng đang trên đường giao</button>
              ) : (
                <button disabled className="process">Đã giao</button>
              )}
          </td>
          <tr>
            {visible && (
              <>
              </>
            )}
          </tr>
        </tr>
    ))}

    </table>
  </>
  );
}
function Information({phoneNumber}){
  const [visible, setVisivle] = useState(false);
  const [data, setData] = useState([])
  const [HoTen, setHoTen] = useState('');
  const [DiaChi, setDiaChi] = useState('');
  const [GioiTinh, setGioiTinh] = useState('');
  const [SoDienThoai, setSoDienThoai] = useState('');
  const updateInf = {
    MaSoDienThoaiKhachHang: SoDienThoai,
    TenKhachHang: HoTen,
    GioiTinh: GioiTinh,
    DiaChi: DiaChi
  }
  const HandleChangeName = (e) => {
    setHoTen(e.target.value);
  }
  const HandleChangeGioiTinh = (e) => {
    setGioiTinh(e.target.value);
  }
  const HandleChangeDiaChi = (e) => {
    const value = e.target.value;
    setDiaChi(value);
  }
  const HandleChangeSoDienThoai = (e) => {
    setSoDienThoai(e.target.value);
  }
  const ToggleButton = (e) =>{
    setVisivle(!visible);
  } 
  const submit = async(phoneNumber) => {
    const response = await axios.put(`http://localhost:4000/Customer/Update/${phoneNumber}`, updateInf);
    if(response)
    {
      getData(phoneNumber);
      alert("Cập nhập thông tin thành công")
      localStorage.setItem('userName', HoTen);
      localStorage.setItem('userEmail', SoDienThoai);
      localStorage.setItem('userAddress', DiaChi)

    }
  }
  const cancel = () => {
    setVisivle(false);
  }
  const getData = async(phoneNumber) => {
    const response = await axios.get(`http://localhost:4000/Customer/${phoneNumber}`);
    if(response)
    {
      const value = response.data[0];
      setData(value)
      console.log(response.data)
      setDiaChi(value.DiaChi)
      setHoTen(value.TenKhachHang)
      setGioiTinh(value.GioiTinh)
      setSoDienThoai(value.MaSoDienThoaiKhachHang)
    }
  }
  useEffect(() => {
    getData(phoneNumber);
  }, [phoneNumber])
  return(
      <div className="Personal">
          <h2>THÔNG TIN CÁ NHÂN</h2>
          <p>Quản lý thông tin của bạn, bao gồm số điện thoại và địa chỉ email nơi mà chúng tôi có thể liên lạc</p>
          <div className="opt">
              <div className="NameInf">
                  <div className="title">
                      <h3>Họ & tên</h3>
                      <img src="./src/LastProject/Image/Account/user-svgrepo-com.svg"></img>
                  </div>
                  <p>{HoTen}</p>
              </div>
              <div className="PhoneInf">
                  <div className="title">
                      <h3>Số điện thoại</h3>
                      <img src="./src/LastProject/Image/Account/phone-svgrepo-com.svg"></img>
                  </div>
                  <p>{SoDienThoai}</p>
              </div>
              <div className="EmailInf">
                  <div className="title">
                      <h3>Địa chỉ Email</h3>
                      <img src="./src/LastProject/Image/Account/message-square-dots-svgrepo-com.svg"></img>
                  </div>
                  <p>{phoneNumber}</p>
              </div>
              <div className="EmailInf">
                  <div className="title">
                      <h3>Địa chỉ</h3>
                      <img src="./src/LastProject/Image/Account/message-square-dots-svgrepo-com.svg"></img>
                  </div>
                  <p>{DiaChi}</p>
              </div>
          </div>
          <div style={{marginTop:"10px"}}><button onClick={ToggleButton}>Sửa thông tin</button></div>
          {visible && (
            <div>
              <table>
                <tr>
                  <td>Tên: </td>
                  <td><input type="text" value={HoTen} onChange={HandleChangeName}></input></td>
                </tr>
                <tr>
                  <td>Số điện thoại: </td>
                  <td><input type="text" value={SoDienThoai} onChange={HandleChangeSoDienThoai}></input></td>
                </tr>
                <tr>
                  <td>Giới tính: </td>
                  <td><select value={GioiTinh} onChange={HandleChangeGioiTinh}>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Địa chỉ: </td>
                  <td><input type="text" value={DiaChi} onChange={HandleChangeDiaChi}></input></td>
                </tr>
                <tr>
                  <td><button onClick={() => submit(phoneNumber)}>Xác nhận</button></td>
                  <td><button onClick={cancel}>Hủy</button></td>
                </tr>
              </table>
            </div>
          )}
      </div>
  );
}
function Account({ phoneNumber, Name, Email, Address }) {
    const location = useLocation();
    return (
      <div className="Account-wrapper">
        <div className="title">
          <p>Tài khoản</p>
        </div>
        <hr />
        <div className="AccountContent">
          <div className="left">
            <img src={avatar} alt="Avatar" />
            <p className="name">{Name}</p>
            <p className="email">{phoneNumber}</p>
            <div className="folder">
              <Link to="/Account">Thông tin cá nhân</Link>
              <Link to="/Account/">Lịch sử đặt hàng</Link>
            </div>
          </div>
          <div className="right">
            {location.pathname === "/Account" ? (
              <Information phoneNumber={phoneNumber} Email={Email} Name={Name} Address={Address} />
            ):(<History/>)}
          </div>
        </div>
      </div>
    );
  }
  
export default Account