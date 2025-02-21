import React, { useEffect, useState } from "react";
import axios from 'axios'

import './CSS/Menu.css'
import "./CSS/SecondNavigate.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { MdKeyboardArrowDown } from "react-icons/md";

import {Routes, Route, Link, useLocation } from "react-router-dom";

function SecondNavigate(){
    const [data, getData] = useState([]);
    const [data2, getData2] = useState([]);
    const [data3, getData3] = useState([]);
    const [data4, getData4] = useState([]);
    const [data5, getData5] = useState([]);
    const refresh = () => {
    }
    const getType1 = async() => {
        const response = await axios.get("http://localhost:4000/TypeOfProduct1")
        if(response)
            getData(response.data);
        else
            console.log("Failed!");
    }
    const getType2 = async() => {
        const response = await axios.get("http://localhost:4000/TypeOfProduct2")
        if(response)
            getData2(response.data);
        else
            console.log("Failed!");
    }
    const getType3 = async() => {
        const response = await axios.get("http://localhost:4000/TypeOfProduct3")
        if(response)
            getData3(response.data);
        else
            console.log("Failed!");
    }
    const getType4 = async() => {
        const response = await axios.get("http://localhost:4000/TypeOfProduct4")
        if(response)
            getData4(response.data);
        else
            console.log("Failed!");
    }
    const getType5 = async() => {
        const response = await axios.get("http://localhost:4000/TypeOfProduct5")
        if(response)
            getData5(response.data);
        else
            console.log("Failed!");
    }

    useEffect(() => {
        getType1();
        getType2();
        getType3();
        getType4();
        getType5();
    },[])
    return(
        <>
            <div className="ndwrapper">
                <ul>
                    <li id="list_1">THỰC PHẨM CHỨC NĂNG<MdKeyboardArrowDown id="arrow" size={20}/>
                        <p className="list-item-navigate navigate-1">
                            <ul className="category-item">
                                {
                                    data.map((item, index) => (
                                        <li className="item" key={index}><Link className="link" to={`/FilterPage/${item.MaLoaiSanPham}`} onClick={refresh}>{item.TenLoaiSanPham}</Link></li>
                                    ))
                                }
                            </ul>
                        </p>
                    </li>
                    <li id="list_2">THIẾT BỊ, DỤNG CỤ Y TẾ<MdKeyboardArrowDown id="arrow" size={20}/>
                        <p className="list-item-navigate navigate-2">
                            <ul className="category-item">
                                {
                                    data2.map((item, index) => (
                                        <li className="item" key={index}><Link className="link" to={`/FilterPage/${item.MaLoaiSanPham}`}>{item.TenLoaiSanPham}</Link></li>
                                    ))
                                }
                            </ul>
                        </p>
                    </li>
                    <li  id="list_3">DƯỢC MỸ PHẨM<MdKeyboardArrowDown id="arrow" size={20}/>
                        <p className="list-item-navigate navigate-3">
                            <ul className="category-item">
                                {
                                    data3.map((item, index) => (
                                        <li className="item" key={index}><Link className="link" to={`/FilterPage/${item.MaLoaiSanPham}`}>{item.TenLoaiSanPham}</Link></li>
                                    ))
                                }
                            </ul>
                        </p>
                    </li>
                    <li id="list_4">CHĂM SÓC CÁ NHÂN<MdKeyboardArrowDown id="arrow" size={20}/>
                        <p className="list-item-navigate navigate-4">
                            <ul className="category-item">
                                {
                                    data4.map((item, index) => (
                                        <li className="item" key={index}><Link className="link" to={`/FilterPage/${item.MaLoaiSanPham}`}>{item.TenLoaiSanPham}</Link></li>
                                    ))
                                }
                            </ul>
                        </p>
                    </li>
                    <li  id="list_5">THUỐC<MdKeyboardArrowDown id="arrow" size={20}/>
                        <p className="list-item-navigate navigate-5">
                            <ul className="category-item">
                                {
                                    data5.map((item, index) => (
                                        <li className="item" key={index}><Link className="link" to={`/FilterPage/${item.MaLoaiSanPham}`}>{item.TenLoaiSanPham}</Link></li>
                                    ))
                                }
                            </ul>
                        </p>
                    </li>
                    <li id="list_6">GÓC SỨC KHỎE<MdKeyboardArrowDown id="arrow" size={20}/>
                        <p className="sub-list-item-navigate navigate-6">
                        <ul className="category-item">
                                {
                                    data.map((item, index) => (
                                        <li className="item" key={index}>{item.TenDanhMuc}</li>
                                    ))
                                }
                            </ul>
                        </p>
                    </li>
                    <li>HỆ THỐNG NHÀ THUỐC</li>
                </ul>
            </div>
            <Routes>
            </Routes>
        </>
    );
}
export default SecondNavigate