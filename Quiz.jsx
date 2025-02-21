import React from "react";
import './CSS/Quiz.css'
import {Routes, Route} from "react-router-dom";

import iconDocs from './Image/icon-docs.png'
import doctor from './Image/docter.png'

function QuizTim(){
    return(
        <>
            <div className="quiz-wrapper">
                <div className="title">
                    <img src={iconDocs} alt="Icon Docs" ></img>
                    <h1>Kiểm tra nguy cơ tim mạch của Quý khách</h1>
                </div>
                <div className="image">
                    <img className="doctor" src={doctor} alt="Doctor"></img>
                </div>
                <p className="description">Càng lớn tuổi khả năng mắc phải bệnh tim mạch càng tăng cao.
                    Hãy kiểm tra ngay qua 15 câu hỏi sau nhằm đánh giá nguy cơ mắc bệnh tim mạch 10 năm tới của
                    Quý khách để có hướng phòng ngừa phù hợp.</p>
                <div className="CheckArea">
                    <button className="BtnCheck">Kiểm tra ngay</button>
                </div>
                <hr style={{marginTop:"20px"}}></hr>
            </div>
        </>
    );
}
function QuizDaDay(){
    return(
        <>
            <div className="quiz-wrapper">
                <div className="title">
                    <img src={iconDocs}></img>
                    <h1>Kiểm tra tình trạng dạ dày của Quý khách</h1>
                </div>
                <div className="image">
                    <img className="doctor" src={doctor}></img>
                </div>
                <p className="description">Alzheimer là bệnh lý khiến trí nhớ dần kém đi, thay đổi hành vi và mất dần nhận thức trong việc chăm sóc bản thân. Bệnh thường gặp ở người lớn tuổi và ảnh hưởng không nhỏ đến các hoạt động sinh hoạt hàng ngày.
                Kiểm tra ngay với 6 câu hỏi sau để phát hiện sớm và chủ động bảo vệ sức khỏe bản thân cũng như người thân trong gia đình.</p>
                <div className="CheckArea">
                    <button className="BtnCheck">Kiểm tra ngay</button>
                </div>
                <hr style={{marginTop:"20px"}}></hr>
            </div>
        </>
    );
}
function QuizNao(){
    return(
        <>
            <div className="quiz-wrapper">
                <div className="title">
                    <img src={iconDocs}></img>
                    <h1>Kiểm tra tình trạng suy giảm trí nhớ và sa sút trí tuệ của Quý khách</h1>
                </div>
                <div className="image">
                    <img className="doctor" src={doctor}></img>
                </div>
                <p className="description">Alzheimer là bệnh lý khiến trí nhớ dần kém đi, thay đổi hành vi và mất dần nhận thức trong việc chăm sóc bản thân. Bệnh thường gặp ở người lớn tuổi và ảnh hưởng không nhỏ đến các hoạt động sinh hoạt hàng ngày.
                Kiểm tra ngay với 6 câu hỏi sau để phát hiện sớm và chủ động bảo vệ sức khỏe bản thân cũng như người thân trong gia đình.</p>
                <div className="CheckArea">
                    <button className="BtnCheck">Kiểm tra ngay</button>
                </div>
                <hr style={{marginTop:"20px"}}></hr>
            </div>
        </>
    );
}
function Quiz() {
    return (
        <Routes>
            <Route path="quiz-tim-mach" element={<QuizTim />} />
            <Route path="quiz-da-day" element={<QuizDaDay />} />
            <Route path="quiz-nao" element={<QuizNao />} />
            <Route path="/" element={<p>Chọn một bài kiểm tra để bắt đầu.</p>} />
        </Routes>
    );
}
export default Quiz