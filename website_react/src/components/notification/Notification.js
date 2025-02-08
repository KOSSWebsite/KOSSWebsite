import React from 'react';
import './Notification.css';

const Notification = () => {
    return (
    <div className="App">

      <div className='top'>
        <p className="emoji">📣</p>
        <p className="text">공지사항</p>
        <p className="writing">｜ 글쓰기 ｜</p>
      </div>

      <div className="noticeContainer">
        <div className="notice">
          <div className="imageContainer">
            <img className="noticeImage" src="/bg.jpeg" />
          </div>
          <div className="textContainer">
            <p className="main-title">겨울방학 스터디 신청</p>
            <p className="main-date">(~2024.00.00)</p>
          </div>
        </div>

        <div className="notice">
          <div className="imageContainer">
            <img className="noticeImage" src="/bg.jpeg" />
          </div>
          <div className="textContainer">
            <p className="main-title">겨울방학 스터디 신청</p>
            <p className="main-date">(~2024.00.00)</p>
          </div>
        </div>

      </div>

      <div className="listContainer">
        <div className="list">
          <p className="title">2024-2 스터디 신청</p>
          <p className="date">(~2024.00.00)</p>
        </div>
        <hr className="divider" />

        <div className="list">
          <p className="title">2024-2 기말고사 열품타 이벤트</p>
          <p className="date">(~2024.00.00)</p>
        </div>
        <hr className="divider" />

        <div className="list">
          <p className="title">2024-2 빼빼로데이 이벤트</p>
          <p className="date">(~2024.00.00)</p>
        </div>
    </div>
    </div>
  );
};

export default Notification;
