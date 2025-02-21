import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CartDetail({cartItems, setCartItems}){
    const [paymentMethod, setPaymentMethod] = useState("Trực Tiếp");
    const [qrVisible, setQrVisible] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [transactionId, setTransactionId] = useState(null);

    const navigate = useNavigate();
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const totalAmountDiscount = cartItems.reduce((total, item) => {
        const totalIsDiscount = item.Gia - item.Gia * item.PhanTramGiam/100;
        const total2 = totalIsDiscount * item.quantity;
        return total + total2;
    }, 0);
    const [newOrder, setNewOrder] = useState({
        TongTien: totalAmountDiscount,
        NgayTaoDonHang: formattedDate,
        PhuongThucThanhToan: paymentMethod,
        TinhTrangThanhToan: "Chưa thanh toán",
        TinhTrangGiaoHang: "Đang xử lý",
        emailKhachHang: localStorage.getItem("userPhoneNumber"),
        emailNhanVien: localStorage.getItem("Admin")
    })
    const HandleChangePaymentMethod = (e) => {
        const choosen = e.target.value;
        setPaymentMethod(choosen);
        setQrVisible(choosen === "Online");
        console.log("Chosen payment method:", choosen);
    };
    const handlePurchase = async () => {
        try {
            const response = await axios.post("http://localhost:4000/AddDonHang", newOrder);
            if (response) {
                const donhang = response.data;
                const orderId = donhang.MaDonHang;
    
                const orderDetails = cartItems.map((item) => ({
                    MaDonHang: orderId,
                    MaSanPham: item.MaSanPham,
                    SoLuongDat: item.quantity,
                    DonGia: item.Gia - (item.Gia * item.PhanTramGiam) / 100,
                }));
                orderDetails.forEach(item => {
                    console.log(`MaDonHang: ${item.MaDonHang}, MaSanPham: ${item.MaSanPham}, SoLuongDat: ${item.SoLuongDat}, DonGia: ${item.DonGia}`);
                });
                const detailsResponse = await axios.post("http://localhost:4000/OrderPage/AddDetails", orderDetails);
                console.log("Response from AddDetails: ", detailsResponse);
                setCartItems([]);
                navigate("/");
                alert("Bạn đã mua hàng thành công!")
            }
        } catch (error) {
            console.log("Error during purchase:", error);
            alert("Đã có lỗi trong quá trình mua hàng, vui lòng thử lại!");
        }
    };
    const handleQrPayment = async () => {
        try {
          const response = await axios.post("/api/payments", {
            amount: totalAmountDiscount,
            description: "Thanh toán đơn hàng",
          });
    
          const { paymentUrl } = response.data;
          window.location.href = paymentUrl;
        } catch (error) {
          console.error("Error initiating QR payment:", error);
          alert("Không thể khởi tạo thanh toán QR!");
        }
      };
    const createTransaction = async (orderId, amount, description) => {
        try {
            const response = await axios.post('https://api.payos.com/v1/transactions', {
                clientId: '68a19110-25eb-4cd0-b47e-475dce828b43',
                amount: totalAmountDiscount,
                description: 'Thanh toán đơn hàng',
                redirectUrl: 'https://0d8a-42-118-56-116.ngrok-free.app/payment-success',
            }, {
                headers: {
                    Authorization: `Bearer f22e4fcb-7962-456c-8760-a1481b5a657f`,
                    'Content-Type': 'application/json',
                },
            });
            const { transactionId, qrCodeUrl } = response.data;
            setTransactionId(transactionId);
            setQrCodeUrl(qrCodeUrl);
        } catch (error) {
            console.error('Error creating transaction:', error.response?.data || error.message);
            alert("Không thể tạo mã QR thanh toán. Vui lòng thử lại!");
            throw error;
        }
    };
    const verifyTransaction = async () => {
        try {
            const response = await axios.get(
                `https://api.payos.com/v1/transactions/${transactionId}`,
                {
                    headers: {
                        Authorization: `Bearer f22e4fcb-7962-456c-8760-a1481b5a657f`,
                    },
                }
            );
            const { status } = response.data;
            if (status === "SUCCESS") {
                alert("Thanh toán thành công!");
                handlePurchase();
            } else {
                alert("Thanh toán chưa hoàn tất. Vui lòng kiểm tra lại.");
            }
        } catch (error) {
            if (error.response) {
                console.error("Error Response:", error.response.data);
            } else if (error.request) {
                console.error("Error Request:", error.request);
            } else {
                console.error("Error Message:", error.message);
            }
            alert("Không thể xác minh thanh toán. Vui lòng thử lại!");
        }
    };
    
    const handlePayment = async () => {
        try {
            const response = await axios.post('/api/createTransaction', {
                orderId: 'ORDER123',
                amount: totalAmountDiscount,
                description: 'Thanh toán đơn hàng',
            });
            const { paymentUrl } = response.data;
            window.location.href = paymentUrl; 
        } catch (error) {
            console.error('Payment initiation failed:', error);
            alert('Không thể khởi tạo thanh toán. Vui lòng thử lại.');
        }
    };    
    const checkPaymentStatus = async () => {
        try {
            const response = await axios.get(`/api/verifyTransaction?transactionId=TRANSACTION123`);
            if (response.data.success) {
                alert('Thanh toán thành công!');
                handlePurchase(); 
            } else {
                alert('Thanh toán chưa hoàn tất. Vui lòng kiểm tra lại.');
            }
        } catch (error) {
            console.error('Error checking payment status:', error);
            alert('Không thể xác minh thanh toán. Vui lòng thử lại.');
        }
    };    
    return(
        <div>
            <div className="notEmptyWrapper">
                <div className="left">
                    <div style={{width:"800px",display:"flex",justifyContent:"space-arround",marginLeft:"35px",marginTop:"10px"}}>
                        <p>Hình ảnh</p>
                        <p style={{marginLeft:"85px"}}>Tên sản phẩm</p>
                        <p style={{marginLeft:"68px"}}>Giá đã giảm</p>
                        <p style={{marginLeft:"42px"}}>Số lượng</p>
                        <p style={{marginLeft:"30px"}}>Tổng giá trị</p>
                    </div>
                    {cartItems.map((item) => (
                        <div className="item" key={item.MaSanPham}>
                            <img className="imgProduct" src={`http://localhost:4000/HinhAnhNhaThuocLongChau/${item.HinhAnh}`} alt={item.MaSanPham}/>
                            <p>{item.TenSanPham}</p>
                            <p>{(item.Gia - item.Gia * item.PhanTramGiam/100).toLocaleString('vi-VN')} VND</p>
                            <p>{item.quantity}</p>
                            <p>{(item.Gia - (item.Gia * item.PhanTramGiam) / 100).toLocaleString('vi-VN', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            })}{" "}
            VND</p>
                        </div>
                    ))}
                    <div style={{marginTop:"330px",padding:"20px"}}>
                        <hr style={{margin:"20px"}}></hr>
                        <h4>Thông tin tài khoản</h4>
                        <table>
                            <tr style={{height:"40px"}}>
                                <td style={{width:"50%",height:"30px"}}>Họ tên: </td>
                                <td style={{width:"50%"}}>{localStorage.getItem('userName')}</td>
                            </tr>
                            <tr style={{height:"40px"}}>
                                <td>Địa chỉ: </td>
                                <td>{localStorage.getItem('userAddress')}</td>
                            </tr>
                            <tr style={{height:"40px"}}>
                                <td>Số điện thoại: </td>
                                <td>{localStorage.getItem('userEmail')}</td>
                            </tr>
                            <tr style={{height:"40px"}}>
                               <td><h4>Tổng giá trị cần thanh toán:</h4></td> 
                               <td><h3 style={{marginLeft:"20px"}}>{totalAmountDiscount.toLocaleString('vi-VN')} VND</h3></td> 
                            </tr>
                        </table>
                    </div>
                    <div style={{display:"flex"}}>
                        <div style={{marginLeft:"20px"}}><h4>Chọn phương thức thanh toán: </h4></div>
                        <div className="paymentOptions">
                            <label>
                                <input defaultChecked type="radio" name="payment" value="Trực tiếp" onChange={HandleChangePaymentMethod}/> Thanh toán khi nhận hàng
                            </label>
                            <label>
                                <input type="radio" name="payment" value="Online" onChange={HandleChangePaymentMethod}/> Thanh toán QR
                            </label>
                        </div>
                    </div>
                    <div className="PaymentDetail" style={{marginLeft:"20px",marginTop:"40px"}}>
                            {qrVisible ? (
                            <div className="qrCodeWrapper">
                                <h3>Quét mã QR để thanh toán</h3>
                                <img style={{width:"300px"}} 
                                src={`https://api.vietqr.io/image/970423-10000297665-zLCdd9S.jpg?accountName=TRAN%20DUC%20TOAN&amount=${totalAmountDiscount}&addInfo=THANH%20TOAN%20DON%20HANG`}></img>
                                <button onClick={verifyTransaction}>Xác nhận thanh toán</button>
                            </div>
                            ):(<div>
                                <button className="btn_confirm" onClick={handlePurchase}>Mua hàng</button>
                            </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CartDetail