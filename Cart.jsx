import React, { useState } from "react";
import cart from './Image/illustration-cart-empty.png'
import './CSS/Cart.css'
import trashBin from './Image/bin-svgrepo-com.svg'
import {Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function EmptyCart(){
    return(
        <>
            <div className="empty_cart">
                <div id="image">
                    <img loading="lazy" src={cart} alt="none"></img>
                </div>
                <div className="title">
                    <p>Chưa có sản phẩm nào trong giỏ</p>
                    <p>Cùng khám phá hàng ngàn sản phẩm
                       tại Nhà thuốc FPT Long Châu nhé!</p>
                </div>
                <div className="btn_return">
                    <Link to="/"><button>Khám phá ngay</button></Link>
                </div>
            </div>
        </>
    );
}
function NotEmptyCart({ cartItems, setCartItems, isLogin}){
    const navigate = useNavigate();
    const totalAmountDiscount = cartItems.reduce((total, item) => {
        const totalIsDiscount = item.Gia - item.Gia * item.PhanTramGiam/100;
        const total2 = totalIsDiscount * item.quantity;
        return total + total2;
    }, 0);
    const totalAmount = cartItems.reduce((total, item)=> {
        const totalAmount2 = item.Gia * item.quantity;
        return total + totalAmount2;
    }, 0);

    console.log("cartItems in NotEmptyCart:", cartItems);
    const removeFromCart = (MaSanPham) => {
        const updatedCartItems = cartItems.filter(item => item.MaSanPham !== MaSanPham);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
    const updateQuantity = async (MaSanPham, newQuantity) => {
        if (newQuantity < 1) return;
        const fetchAvailableQuantity = async (MaSanPham) => {
            try {
                const response = await axios.get(`http://localhost:4000/dataHangHoa/${MaSanPham}`);
                const result = response.data[0];
                console.log(result.SoLuongTon); 
                if (result.SoLuongTon === undefined) {
                    throw new Error("Không tìm thấy thông tin số lượng tồn.");
                }
                return result.SoLuongTon;
            } catch (error) {
                console.error("Lỗi khi lấy số lượng tồn:", error);
                return null;
            }
        };
        const availableStock = await fetchAvailableQuantity(MaSanPham);
        if (newQuantity > availableStock) {
            alert(`Số lượng bạn yêu cầu (${newQuantity}) vượt quá số lượng tồn (${availableStock}).`);
            return;
        }
        if (newQuantity == 0) removeFromCart(MaSanPham);

        const updatedCartItems = cartItems.map(item => {
            if (item.MaSanPham === MaSanPham) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };
    const handlePurchase = () => {
        if (isLogin === false) {
            alert("Vui lòng đăng nhập để tiến hành mua hàng.");
            return;
        }
        else
        {
            const userConfirmed = window.confirm("Bạn sẽ được chuyển sang chi tiết đơn hàng")
            if(userConfirmed === true){
                navigate("/Confirm")
            }
            else
                navigate("/Cart")
        }
    };
    return(
        <div className="notEmptyWrapper">
            <div className="left">
                {cartItems.map((item) => (
                    <div className="item" key={item.MaSanPham}>
                        <img className="imgProduct" src={`http://localhost:4000/HinhAnhNhaThuocLongChau/${item.HinhAnh}`} alt={item.MaSanPham} />
                        <p>{item.TenSanPham}</p>
                        <p>{item.Gia.toLocaleString('vi-VN')} VND</p>
                        <p>{(item.Gia - item.Gia * item.PhanTramGiam/100).toLocaleString('vi-VN')} VND</p>
                        <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.MaSanPham, parseInt(e.target.value))}
                        />
                        <button className="btn_remove" onClick={() => removeFromCart(item.MaSanPham)}>
                            <img src={trashBin} alt="Remove" />
                        </button>
                    </div>
                ))}
            </div>
            <div className="right">
                <div className="title">
                    <p>Tổng tiền: {totalAmount.toLocaleString('vi-VN')} VND</p>
                    <p>Giảm giá trực tiếp: -{(totalAmount - totalAmountDiscount).toLocaleString('vi-VN')} VND</p>
                    <p>Tiết kiệm được: {(totalAmount - totalAmountDiscount).toLocaleString('vi-VN')} VND</p>
                    <hr />
                    <p>Thành tiền: {totalAmountDiscount.toLocaleString('vi-VN')}</p>
                </div>
                <div className="bottom">
                    <button onClick={handlePurchase}>Mua hàng</button>
                    <p>Bằng việc tiến hành đặt mua hàng, bạn đồng ý với
                        <a href="#">Điều khoản dịch vụ</a> và <a href="#">Chính sách xử lý dữ liệu cá nhân</a> 
                        của Nhà thuốc FPT Long Châu
                    </p>
                </div>
            </div>
        </div>
    );
}

function Cart({cartItems = [], setCartItems, isLogin}){
    return(
        <>
            {cartItems.length === 0 ? (
                <EmptyCart></EmptyCart>
            ):(
                <NotEmptyCart cartItems={cartItems} setCartItems={setCartItems} isLogin={isLogin}></NotEmptyCart>
            )}
        </>
    );
}
export default Cart