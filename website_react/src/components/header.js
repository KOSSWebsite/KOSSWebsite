import React, {useEffect, useState} from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import koss1 from '../image/KOSS1.png';
import koss2 from '../image/KOSS2.png';

function Header() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleAuth = () => {
    if (userId) {
      localStorage.removeItem('userId'); // 저장된 로그인 정보 삭제
      setUserId(null);
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
          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <img
                  src={koss1}
                  alt="Profile"
                  style={{width: '40px', height: '40px'}}
                  onClick={() => navigate('/')}
              />
              <img
                  src={koss2}
                  alt="KOSS Logo"
                  style={{width: '60px', height: '30px'}}
                  onClick={() => navigate('/')}
              />
              <p style={{cursor: 'pointer', marginLeft: 50}} onClick={() => navigate('/notification')}>공지사항</p>
              <p style={{cursor: 'pointer', marginLeft: 30}}>모각코</p>
              <p style={{cursor: 'pointer', marginLeft: 30}}>스터디</p>
              <p style={{cursor: 'pointer', marginLeft: 30}} onClick={() => navigate('/member')}>부원</p>
          </div>


          <div>
              <p
                  style={{cursor: 'pointer', margin: 0, fontSize: '16px'}}
                  onClick={handleAuth}
              >
                  {userId ? `${userId}님, 환영합니다!` : "로그인"}
              </p>
          </div>
      </nav>
    </div>
  );
}

export default Header;
