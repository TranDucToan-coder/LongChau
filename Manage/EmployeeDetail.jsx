import React, { useState, useEffect } from "react";
import axios from "axios";
import {Routes, Route, Link, useLocation, useParams } from "react-router-dom";

import edit from '../Image/edit-3-svgrepo-com.svg'
import bin from '../Image/bin-svgrepo-com.svg'

function EmployeeDetail(){
    const { Email } = useParams();
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [idenified, setIdenified] = useState('');
    const [start, setStart] = useState('');
    const [year, setYear] = useState(0);
    const [salary, setSalary] = useState(0);
    const [dayOff, setDayOff] = useState(0);

    const [visible, setVisible] = useState(false);
    const getData = async() => {
        const response = await axios.get(`http://localhost:4000/data/${Email}`)
        if(response)
            {
                const employee = response.data[0];
                console.log(employee)
                setData(response.data);
                if (response.data.length > 0) {
                    setName(employee.TenNhanVien);
                    setPhone(employee.MaSoDienThoaiNhanVien);
                    setGender(employee.GioiTinh);
                    setAge(employee.Tuoi);
                    setIdenified(employee.CCCD);
                    setStart(employee.NgayVaoLam);
                    setYear(employee.NamLamViec);
                    setSalary(employee.Luong);
                    setDayOff(employee.SoNgayNghi);
                }
            }
            else
                console.log("Failed!");
    }
    useEffect(() => {
        if(Email)
            console.log("MaSanPham:", Email);
            getData();
    }, [])
    const HandleChangeName = (e) => {
        setName(e.target.value);
    }
    const HandleChangeAge = (e) => {
        setAge(e.target.value);
    }
    const HandleChangePhone = (e) => {
        setPhone(e.target.value);
    }
    const HandleChangeGender = (e) => {
        setGender(e.target.value);
    }
    const HandleChangeIdentified = (e) => {
        setIdenified(e.target.value);
    }
    const HandleChangeStart = (e) => {
        const value = e.target.value;
        setStart(value);

        const getYear = new Date(value);
        const now = new Date();
        setYear(now.getFullYear() - getYear.getFullYear())
    }
    const HandleChangeSalary = (e) => {
        setSalary(e.target.value);
    }
    const HandleChangeDayOff = (e) => {
        setDayOff(e.target.value);
    }
    const HandleVisible = () => {
        setVisible(!visible);
    }
    const Submit = async(Email) => {
        try {
            const updatedEmployee = {
                ...data,
                TenNhanVien: name,
                MaSoDienThoaiNhanVien: phone,
                GioiTinh: gender,
                Tuoi: age,
                CCCD: idenified,
                NgayVaoLam: start,
                NamLamViec: year,
                Luong: salary,
                SoNgayNghi: dayOff,
            };
            console.log(updatedEmployee)
            await axios.put(`http://localhost:4000/data/Update/${Email}`, updatedEmployee);
            getData();
            alert("Update thành công!");
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    }
    const Delete = async() => {
        try {
            await axios.delete(`http://localhost:4000/data/Delete/${Email}`);
            alert("Employee deleted successfully!");
            getData();
        } catch (error) {
            console.error("Error deleting employee:", error);
            alert("Failed to delete employee.");
        }
    } 
    return(
        <div className="EmployeeDetail">
            {data.map(index => (
                <table key={index.Email}>
                    <tr className="row">
                        <td>Email nhân viên: </td>
                        <td>{index.Email}</td>
                    </tr>
                    <tr className="row">
                        <td>Họ tên nhân viên: </td>
                        <td>{index.TenNhanVien}</td>
                    </tr>
                    <tr className="row">
                        <td>Số điện thoại nhân viên: </td>
                        <td>{index.MaSoDienThoaiNhanVien}</td>
                    </tr>
                    <tr className="row">
                        <td>Giới tính: </td>
                        <td>{index.GioiTinh}</td>
                    </tr>
                    <tr className="row">
                        <td>Tuổi: </td>
                        <td>{index.Tuoi}</td>
                    </tr>
                    <tr className="row">
                        <td>Căn cước công dân (CCCD):</td>
                        <td>{index.CCCD}</td>
                    </tr>
                    <tr className="row">
                        <td>Thời gian bắt đầu làm: </td>
                        <td>{index.NgayVaoLam}</td>
                    </tr>
                    <tr className="row">
                        <td>Số năm đã làm: </td>
                        <td>{index.NamLamViec}</td>
                    </tr>
                    <tr className="row1">
                        <td>Lương nhân viên: </td>
                        <td>{index.Luong}</td>
                    </tr>
                    <tr className="row">
                        <td>Số ngày nhân viên nghỉ: </td>
                        <td>{index.SoNgayNghi}</td>
                    </tr>
                    <tr>                          
                        <td id="edit"><button onClick={HandleVisible}><img src={edit}></img></button></td>
                        <td id="del"><button><img src={bin} onClick={Delete}></img></button></td>
                    </tr>
                </table>
            ))}
            {visible && (
                <div className="Edit_Form">
                    <table key={Email}>
                        <tr className="row">
                            <td>Email nhân viên: </td>
                            <td>{Email}</td>
                        </tr>
                        <tr className="row">
                            <td>Họ tên nhân viên: </td>
                            <td><input type="text" value={name} onChange={HandleChangeName}></input></td>
                        </tr>
                        <tr className="row">
                            <td>Số điện thoại nhân viên: </td>
                            <td><input type="text" value={phone} onChange={HandleChangePhone}></input></td>
                        </tr>
                        <tr className="row">
                            <td>Giới tính: </td>
                            <td><input type="text" value={gender} onChange={HandleChangeGender}></input></td>
                        </tr>
                        <tr className="row">
                            <td>Tuổi: </td>
                            <td><input type="text" value={age} onChange={HandleChangeAge}></input></td>
                        </tr>
                        <tr className="row">
                            <td>Căn cước công dân (CCCD):</td>
                            <td><input type="text" value={idenified} onChange={HandleChangeIdentified}></input></td>
                        </tr>
                        <tr className="row">
                            <td>Thời gian bắt đầu làm: </td>
                            <td><input type="date" value={start} onChange={HandleChangeStart}></input></td>
                        </tr>
                        <tr className="row">
                            <td>Số năm đã làm: </td>
                            <td><input type="text" value={year} disabled></input></td>
                        </tr>
                        <tr className="row">
                            <td>Lương nhân viên: </td>
                            <td><input type="text" value={salary} onChange={HandleChangeSalary}></input></td>
                        </tr>
                        <tr className="row">
                            <td>Số ngày nhân viên nghỉ: </td>
                            <td><input type="text" value={dayOff} onChange={HandleChangeDayOff}></input></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => Submit(Email)}>Submit</button></td>
                            <td><button onClick={HandleVisible}>Cancel</button></td>
                        </tr>
                    </table>
                </div>
            )}
        </div>
    )
}
export default EmployeeDetail