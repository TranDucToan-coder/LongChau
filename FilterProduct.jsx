import React, { useState, useEffect } from "react";
import {Routes, Route, Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import './CSS/FilterPage.css'
import Cart from "./Cart";
const FilterProduct = ({addToCart}) => {
    const {MaLoaiSanPham} = useParams();
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [filter, setFilter] = useState('');
    const [brands, setBrands] = useState([]);
    const [startValue, setStartValue] = useState(0);
    const [endValue, setEndValue] = useState(30000000); 
    const [MaSanPham, setMaSanPham] = useState('');
    const location = useLocation();
    const getData = async(res,req) => {
        const response = await axios.get('http://localhost:4000/dataHangHoa');
        if(response)
        {
            setData(response.data);
            setOriginalData(response.data);
        }
        else{
            console.log("Failed!")
        }
    }
    const getBrand = async(res,req) => {
        const response = await axios.get('http://localhost:4000/Brand');
        if(response)
        {
            setBrands(response.data);
        }
        else{
            console.log("Failed!")
        }
    }
    const handleBrandChange = (event) => {
        const selectedBrand = event.target.value; 
        setData([]);
        setFilter(selectedBrand);
        getFilteredData(selectedBrand); 
    };
    const HandleClick = () => {
        setData([]);    
        setData(originalData);
        setFilter('');
    }
    const getFilteredData = async (filter) => {
        try {
            const response = await axios.get(`http://localhost:4000/dataFilterByBrand/${filter}`);
            if(location.pathname == "/FilterPage")
            {
                setData([]);
                setData(response.data);
            }
            else
            {
                setOriginalData([]);
                setOriginalData(response.data);
            }
        } catch (error){
            console.error("Error fetching data:", error);
        }
    };
    const getFilteredPrice = async (priceRange) => {
        let results = [];
        if (priceRange === "under-100") {
            results = originalData.filter((item) => {
                const price = parseInt(item.Gia);
                return price < 100000;
            });
        } else if (priceRange === "100-500") {
            results = originalData.filter((item) => {
                const price = parseInt(item.Gia);
                return price >= 100000 && price <= 500000;
            });
        } else if (priceRange === "above-500") {
            results = originalData.filter((item) => {
                const price = parseInt(item.Gia);
                return price > 500000;
            });
        }
        priceRange = "";
        setData([]);
        setData(results);
        console.log(results)
    };
    const GetProduct = async (MaLoaiSanPham) => {
        try {
            const response = await axios.get(`http://localhost:4000/TypeOfProduct/${MaLoaiSanPham}`);
            if (response.data && response.data.length > 0) {
                setOriginalData(response.data);
                setData(response.data);   
                console.log("MaLoaiSanPham:", MaLoaiSanPham);
                console.log("Fetched products:", response.data);
            } else {
                console.warn("No data found for the given MaLoaiSanPham:", MaLoaiSanPham);
            }
        } catch (error) {
            console.error("Failed to fetch filtered products", error);
        }
    };
    useEffect(() => {
        getData();
        getBrand();
        if (MaLoaiSanPham) {
            GetProduct(MaLoaiSanPham); 
        }
    },[MaLoaiSanPham]);
    const resetFilters = () => {
        setData(originalData);
    };
    const renderProducts = (products) => {
        return products.map((product) => (
            <div className="product" key={product.MaSanPham}>
                <Link to={`/ChiTietSanPham/${product.MaSanPham}`}>
                    <img className="product_img"
                        loading="lazy"
                        src={`http://localhost:4000/HinhAnhNhaThuocLongChau/${product.HinhAnh}`}
                        alt="Product"
                    />
                </Link>
                <p className="nameOfProduct">{product.TenSanPham}</p>
                <div className="opt">
                    <button className="btn_opt">{product.DangBaoChe ?? "Null"}</button>
                </div>
                {product.MaGiamGia !== 0 ? (
                    <div>
                        <p className="priceOfProductWasDiscount">
                            {(product.Gia - (product.Gia * product.PhanTramGiam / 100)).toLocaleString('vi-VN')} VND
                        </p>
                        <p className="priceOfProduct" style={{ fontSize: 16, textDecoration: 'line-through', color: "black" }}>
                            {product.Gia.toLocaleString('vi-VN')} VND
                        </p>
                    </div>
                ) : (
                    <p className="priceOfProduct">{product.Gia.toLocaleString('vi-VN')} VND</p>
                )}
                <button className="dcOfProduct">{product.CachDongGoi ?? "Null"}</button>
                <button className="btn_buy" onClick={() => addToCart(product)}>Chọn mua</button>
            </div>
        ));
    };
    return (
        <div>
            <div className="filter">
                <select onChange={handleBrandChange}>
                    <option value="">Chọn thương hiệu</option>
                    {brands.map((brand) => (
                        <option key={brand.MaThuongHieu} value={brand.MaThuongHieu}>{brand.TenThuongHieu}</option>
                    ))}
                </select>
                <button onClick={resetFilters} className="Unfilter"><Link to="/FilterPage">X</Link></button>
            </div>
            <div className="wrapperFilterPage">
                {location.pathname === ("/FilterPage") ? renderProducts(data) : renderProducts(originalData)}
            </div>
        </div>
    );
}
export default FilterProduct
