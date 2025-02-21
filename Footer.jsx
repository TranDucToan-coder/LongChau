import React from "react";
import { PiDotOutlineThin } from "react-icons/pi";
import './CSS/Footer.css'
import FbIcon from './Image/Facebook_f_logo_(2021).png'
import ZlIcon from './Image/Icon_of_Zalo.svg.png'

import {Routes, Route, Link, useLocation } from "react-router-dom";

function Footer() {
    return(
        <>
            <div className="Br"></div>
            <div className="footer">
                <div className="Row">
                    <div className="col1">
                        <p>Về chúng tôi</p>
                        <a>Trần Đức Toàn</a>
                        <a>Trần Gia Bảo</a>
                        <a>Huỳnh Minh Khang</a>
                        <a>HUIT</a>
                    </div>
                    <div className="col2">
                        <p>Danh mục</p>
                        <a>Thực phẩm chức năng</a>
                        <a>Dược mỹ phẩm</a>
                    </div>
                    <div className="col3">
                        <p>Tìm hiểu thêm</p>
                        <a>Dược liệu</a>
                        <a>Thuốc</a>
                        <a>Bệnh</a>
                    </div>
                    <div className="col4">
                        <p>Tổng đài</p>
                        <span>Tư vấn mua hàng</span><a href="#">1800 xxxx<span> (Nhánh 1)</span></a>
                        <span>Góp ý, khiếu nại</span><a href="#">1800 xxxx<span> (Nhánh 2)</span></a>
                    </div>
                    <div className="col5">
                        <p>Kết nối với chúng tôi</p>
                        <a href=""><img src={FbIcon} alt="Facebook"></img></a>
                        <a href=""><img src={ZlIcon} alt="Zalo"></img></a>
                    </div>
                </div>
                <div className="Col">
                    <p id="line1">© 2007 - 2024 Công ty Cổ Phần Dược Phẩm FPT Long Châu Số ĐKKD 031527XXXX cấp ngày 17/09/2018 tại Sở Kế hoạch Đầu tư TPHCM</p>
                    <div id="line2">
                        <p>Địa chỉ: 20/28/37 Hồ Đắc Di, P. Tây Thạnh, Q.Tân Phú, TP. HCM.</p>
                        <span style={{fontWeight:"bolder"}}>*</span>
                        <p>Số điện thoại: 0943-957-472</p>
                        <span style={{fontWeight:"bolder"}}>*</span>
                        <p>Email: ductoantran17@gmail.com</p>
                        <span style={{fontWeight:"bolder"}}>*</span>
                        <p>Người quản lý nội dung: Trần Đức Toàn</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Footer