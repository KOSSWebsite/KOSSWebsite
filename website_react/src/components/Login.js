import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8080/login', {
      userId: userId,
      password: password,
    });

    if (response.status === 200) {
      localStorage.setItem("userId", userId);
      navigate('/');
      window.location.reload();
    }
  } catch (error) {
    console.error('로그인 실패:', error);
    alert('아이디 또는 비밀번호가 잘못되었습니다.');
  }
};


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="userId"
              placeholder="아이디"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            로그인
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-500">계정이 없으신가요?</p>
          <Link
            to="/signup"
            className="block mt-2 py-3 border border-black rounded-lg text-black hover:bg-gray-100 transition"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
