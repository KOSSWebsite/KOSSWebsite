import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import koss1 from '../image/KOSS1.png';
import koss2 from '../image/KOSS2.png';

function Header() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null); // 로그인한 사용자 정보
  const [mogackoLinks, setMogackoLinks] = useState({}); // 모각코 링크 데이터
  const [studyLinks, setStudyLinks] = useState({}); // 스터디 링크 데이터

  // 1️⃣ 로컬스토리지에서 userId 가져오기
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // 2️⃣ GET 요청으로 멤버 데이터 가져오기
  useEffect(() => {
    if (!userId) return;

    fetch('http://localhost:8080/member')
      .then((res) => res.json())
      .then((data) => {
        const foundUser = data.find(member => member.userId === userId);
        if (foundUser) {
          setUserData(foundUser);
        }
      })
      .catch((error) => console.error("Error fetching members:", error));
  }, [userId]);

  // 3️⃣ 모각코 & 스터디 데이터 가져오기
  useEffect(() => {
    fetch('http://localhost:8080/mogacko')
      .then((res) => res.json())
      .then((data) => {
        const links = {};
        data.forEach(item => {
          const key = Object.keys(item).find(k => k !== "_id"); // _id 제외한 필드 찾기
          if (key) links[key] = item[key];
        });
        setMogackoLinks(links);
      })
      .catch((error) => console.error("Error fetching mogacko:", error));

    fetch('http://localhost:8080/study')
      .then((res) => res.json())
      .then((data) => {
        const links = {};
        data.forEach(item => {
          const key = Object.keys(item).find(k => k !== "_id");
          if (key) links[key] = item[key];
        });
        setStudyLinks(links);
      })
      .catch((error) => console.error("Error fetching study:", error));
  }, []);

  // 4️⃣ 모각코 & 스터디 링크 이동 함수
  const handleMogackoClick = () => {
    if (userData && mogackoLinks[userData.mogacko]) {
      window.open(mogackoLinks[userData.mogacko], '_blank');
    } else {
      alert("모각코 링크를 찾을 수 없습니다.");
    }
  };

  const handleStudyClick = () => {
    if (userData && studyLinks[userData.study]) {
      window.open(studyLinks[userData.study], '_blank');
    } else {
      alert("스터디 링크를 찾을 수 없습니다.");
    }
  };

  // 5️⃣ 로그인 & 로그아웃 처리
  const handleAuth = () => {
    if (userId) {
      localStorage.removeItem('userId');
      setUserId(null);
      setUserData(null);
      alert("로그아웃 되었습니다.");
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <nav
        className="navbar"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img
            src={koss1}
            alt="Profile"
            style={{ width: '40px', height: '40px' }}
            onClick={() => navigate('/')}
          />
          <img
            src={koss2}
            alt="KOSS Logo"
            style={{ width: '60px', height: '30px' }}
            onClick={() => navigate('/')}
          />
          <p style={{ cursor: 'pointer', marginLeft: 50 }} onClick={() => navigate('/notification')}>공지사항</p>
          <p style={{ cursor: 'pointer', marginLeft: 30 }} onClick={handleMogackoClick}>모각코</p>
          <p style={{ cursor: 'pointer', marginLeft: 30 }} onClick={handleStudyClick}>스터디</p>
          <p style={{ cursor: 'pointer', marginLeft: 30 }} onClick={() => navigate('/member')}>부원</p>
        </div>

        <div>
          <p
            style={{ cursor: 'pointer', margin: 0, fontSize: '16px' }}
            onClick={handleAuth}
          >
            {userData ? `${userData.username}님, 환영합니다!` : "로그인"}
          </p>
        </div>
      </nav>
    </div>
  );
}

export default Header;
