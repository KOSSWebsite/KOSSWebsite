import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    group: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('회원가입 정보:', formData);
    alert('회원가입이 완료되었습니다!');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">성명</label>
            <input
                type="text"
                name="name"
                placeholder="성명을 입력해주세요"
                value={formData.name}
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
                name="group"
                value={formData.group}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                조를 선택해주세요
              </option>
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
                name="group"
                value={formData.group}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                스터디를 선택해주세요
              </option>
              <option value="Python">Python</option>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="FEBE">FE/BE</option>
              <option value="AI">인공지능</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">아이디</label>
            <input
                type="text"
                name="username"
                placeholder="아이디를 입력해주세요"
                value={formData.username}
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
                name="confirmPassword"
                placeholder="비밀번호를 확인해주세요"
                value={formData.confirmPassword}
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
