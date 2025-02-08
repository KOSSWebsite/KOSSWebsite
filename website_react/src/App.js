import './App.css';

function App() {
  return (
    <div className="App">
      
      {/* 상단 */}
      <div className='top'>
        <p className="emoji">📣</p>
        <p className="text">공지사항</p>
        <p className="writing">｜ 글쓰기 ｜</p>
      </div>
      
      {/* 진행 중인 공지사항 */}
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

      {/* 지난 게시물 */}
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
}

export default App;
