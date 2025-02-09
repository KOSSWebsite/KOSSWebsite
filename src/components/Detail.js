import React, { useEffect, useState } from "react";
import axios from "axios";

const Detail = () => {
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/notice");
        setNotice(response.data); // API 응답 데이터를 상태에 저장
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl">
        <div className="relative flex justify-center items-center">
          <img
            src={notice?.img || "/default-image.png"} // 데이터가 있으면 img 사용, 없으면 기본 이미지
            alt="Notice Image"
            className="w-90 object-cover rounded-t-2xl"
          />
        </div>

        {/* Main Content */}
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {notice?.title || "제목을 불러오는 중..."}
          </h1>

          <p className="text-gray-800 text-lg mb-4">
            {notice?.content || "내용을 불러오는 중..."}
          </p>

          {/* 기한 표시 */}
          <p className="text-gray-800 font-semibold mb-4">
            마감 기한: {notice?.dueDate || "기한 없음"}
          </p>

          {/* 업로드 시간 표시 */}
          <p className="text-gray-500 text-sm">
            업로드 시간: {notice?.date ? new Date(notice.date).toLocaleString() : "불러오는 중..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
