import React, {useState} from 'react';
import CharacterImageLeft from "../image/MIDDLE1.png";
import CharacterImageCenter from "../image/MIDDLE2.png";
import CharacterImageRight from "../image/MIDDLE3.png";
import MacBook from "../image/MacBook.png";

function Main() {
    const [activeSection, setActiveSection] = useState(null);
    const [closing, setClosing] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);

    const sectionContent = [
    {
      title: '👋🏻 안녕하세요, Open Source Software 동아리 KOSS입니다!',
      description: 'KOSS는 사회적 문제를 다양한 분야의 SW기술을 통해 해결할 수 있는 방안을 모색하고, 이를 실제 구현하여 오픈 소스 생태계에 기여하는 것을 목표로 하는 국민대학교 소프트웨어융합대학의 학술 동아리예요.',
      backgroundColor: '#E5FBFF',
    },
    {
      title: '💫 우리는 이런 활동을 진행하고 있어요',
      description: '정기적인 스터디, 프로젝트 진행, 그리고 다양한 교류 활동을 통해 성장하고 있습니다.',
      backgroundColor: '#E5FBFF',
    },
    {
      title: '🚀 우리는 이런 성과를 내고 있어요',
      description: '다양한 스터디를 바탕으로 여러 대회에 참가하고 있어요. 프로젝트 주제에 따라 공개SW 개발자대회, 임베디드 소프트웨어 경진대회, 웅진씽크빅 게임 개발 챌린지 등 여러 대회에 많은 부원들이 참여하고 놀라운 성과를 내고 있어요.',
      backgroundColor: '#E5FBFF',
    },
    {
      title: '❤️ 우리는 더 나은 사회를 위해 노력하고 있어요',
      description: '매 학기 방학마다 SW교육 봉사를 진행하고 있어요. 고등학생들이 소프트웨어와 코딩에 대해 미리 접하고 쉽게 다가갈 수 있도록 하는 것을 목표로 커리큘럼을 직접 짜서 수업을 진행하고 있답니다.',
      backgroundColor: '#E5FBFF',
    },
  ];

  const handleClick = (index) => {
    if (activeSection === index) {
      setClosing(index);
      setTimeout(() => {
        setActiveSection(null);
        setClosing(null);
      }, 0);
    } else {
      setActiveSection(index);
    }
  };
  return (
      <div>
          <header style={{
              textAlign: 'center',
              padding: '20px',
              backgroundColor: '#29B2CC',
              color: '#fff',
              position: 'relative'
          }}>
              <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px',
                  maxWidth: '1200px',
                  margin: '0 auto'
              }}>
                  <img src={CharacterImageLeft} alt="Character Left" style={{height: '250px', objectFit: 'contain'}}/>
                  <img src={CharacterImageCenter} alt="Character Center"
                       style={{height: '250px', objectFit: 'contain'}}/>
                  <img src={CharacterImageRight} alt="Character Right" style={{height: '250px', objectFit: 'contain'}}/>
              </div>
          </header>
          <img src={MacBook} alt="MacBook" style={{display: 'block', margin: '20px auto', maxWidth: '100%'}}/>
          <main style={{padding: '10px', textAlign: 'center', backgroundColor: 'white'}}>
              <h2 style={{marginBottom: '20px'}}>KOSS는 어떤 동아리인가요?</h2>
              <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '15px',
                  width: '80%',
                  margin: '0 auto'
              }}>
                  {sectionContent.map((section, index) => (
                      <div
                          key={index}
                          style={{
                              borderRadius: '10px',
                              overflow: 'hidden',
                              width: '100%',
                              transition: 'background-color 0.3s ease',
                              backgroundColor: activeSection === index ? section.backgroundColor : '#f4f4f4',
                          }}
                      >
                          {/* 버튼 (마우스 올리면 파란색, 아니면 회색) */}
                          <div
                              style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  padding: '15px',
                                  cursor: 'pointer',
                                  backgroundColor: hoveredButton === index || activeSection === index ? '#E5FBFF' : 'transparent',
                                  transition: 'background-color 0.3s ease-in-out',
                              }}
                              onMouseEnter={() => setHoveredButton(index)}
                              onMouseLeave={() => setHoveredButton(null)}
                              onClick={() => handleClick(index)}
                          >
                              <p style={{margin: 0, fontSize: '1rem', color: '#000'}}>{section.title}</p>
                          </div>

                          {/* 텍스트 즉시 사라짐 */}
                          <div
                              style={{
                                  maxHeight: activeSection === index ? '200px' : '0',
                                  opacity: closing === index ? '0' : activeSection === index ? '1' : '0',
                                  padding: activeSection === index ? '15px' : '0px 15px',
                                  transition: closing === index ? 'opacity 0.2s ease-in-out' : 'opacity 0.3s ease-in-out, padding 0.3s ease-in-out',
                                  backgroundColor: section.backgroundColor,
                                  overflow: 'hidden',
                              }}
                          >
                              <p style={{margin: 0, fontSize: '1rem', color: '#000'}}>{section.description}</p>
                          </div>

                          {/* max-height 줄이기 */}
                          <div
                              style={{
                                  maxHeight: closing === index ? '0px' : activeSection === index ? '200px' : '0px',
                                  transition: closing === index ? 'max-height 0.3s ease-in-out 0.2s' : 'max-height 0.5s ease-in-out',
                                  overflow: 'hidden',
                              }}
                          />
                      </div>
                  ))}
              </div>
          </main>
      </div>
  );
}

export default Main;
