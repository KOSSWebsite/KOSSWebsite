import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',  // 사용자 이름
    userId: '',  // 아이디
    password: '',
    password_check: '',
    studentId: '',  // 학번
    mogacko: '',  // 모각코 조
    study: '',  // 스터디
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인 검증
    if (formData.password !== formData.password_check) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/signup', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        alert('회원가입이 완료되었습니다!');
        navigate('/login'); // 로그인 페이지로 이동
      } else {
        alert('회원가입 실패! 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* 성명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">성명</label>
            <input
              type="text"
              name="username"
              placeholder="성명을 입력해주세요"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 학번 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">학번</label>
            <input
              type="text"
              name="studentId"
              placeholder="학번을 입력해주세요"
              value={formData.studentId}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 모각코 조 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">모각코 조</label>
            <select
              name="mogacko"
              value={formData.mogacko}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>조를 선택해주세요</option>
              <option value="1조">1조</option>
              <option value="2조">2조</option>
              <option value="3조">3조</option>
              <option value="4조">4조</option>
              <option value="5조">5조</option>
              <option value="6조">6조</option>
              <option value="7조">7조</option>
              <option value="8조">8조</option>
            </select>
          </div>

          {/* 스터디 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">스터디</label>
            <select
              name="study"
              value={formData.study}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>스터디를 선택해주세요</option>
              <option value="Python">Python</option>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="FEBE">FE/BE</option>
              <option value="AI">인공지능</option>
            </select>
          </div>

          {/* 아이디 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">아이디</label>
            <input
              type="text"
              name="userId"
              placeholder="아이디를 입력해주세요"
              value={formData.userId}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">비밀번호</label>
            <input
              type="password"
              name="password"
              placeholder="영문자, 숫자 포함 8~20자"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">비밀번호 확인</label>
            <input
              type="password"
              name="password_check"
              placeholder="비밀번호를 확인해주세요"
              value={formData.password_check}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
