import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/notice')
      .then(response => {
        console.log("📡 서버 응답 데이터:", response.data);
  
        if (Array.isArray(response.data) && response.data.length > 0) {
          const sortedNotices = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setNotices(sortedNotices);
        } else {
          console.warn("🥹 게시물 없음"); // 데이터가 비어있을 경우 경고 출력
          setNotices([]); // 빈 배열로 설정
        }
      })
      .catch(error => {
        console.error("🥹 데이터 불러오기 실패:", error);
        setNotices([]); // 오류 발생 시 빈 배열로 설정
      });
  }, []);
  

  // 최신 게시물 2개 
  const recentNotices = notices.slice(0, 2);
  // 나머지 공지 (지난 게시물)
  const pastNotices = notices.slice(2);

  return (
    <div className="flex flex-col items-center w-full">

      {/* 타이틀 */}
      <div className="flex items-center justify-center gap-[1vw] h-[13vh] w-full">
        <p className="text-[50px]">📣</p>
        <p className="text-[24px] font-medium">공지사항</p>
        <p className="pl-[70vw] cursor-pointer" onClick={() => navigate('/edit')}>｜ 글쓰기 ｜</p>
      </div>

      {/* 진행 중인 공지사항 (최신 2개) */}
      <div className="flex flex-wrap justify-center gap-[2.5vw] w-full">
        {notices.length === 0 ? (
          <p className="text-gray-500 text-lg">📭 게시물이 없습니다.</p>
        ) : (
          recentNotices.map((notice) => (
            <div key={notice._id} className="bg-gray-100 rounded-[28px] w-[607px] flex flex-col text-left overflow-hidden">
              <div className="w-full overflow-hidden">
                <img className="w-full h-[375px] object-cover rounded-t-[28px]" src="/bg.jpeg" />
              </div>
              <div className="flex items-center justify-start gap-[5px] w-[90%] px-9 py-4"> 
                <p className="text-[20px] font-medium">{notice.title}</p>
                <p className="text-[16px] text-gray-600">(~{notice.dueDate})</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 지난 게시물 */}
      <div className="flex flex-col w-[87vw] pt-[6vh] mx-auto">
        {pastNotices.map((notice) => (
          <React.Fragment key={notice._id}>
            <div className="flex justify-between items-center py-[1vh] gap-[1vw]">
              <p className="text-[18px]">{notice.title}</p>
              <p className="text-[15px] text-gray-500">(~{notice.dueDate})</p>
            </div>
            <hr className="w-full h-[1px] bg-gray-200 border-none my-4" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Notification;
