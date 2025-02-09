import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Member = () => {

  // 멤버 데이터 저장
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태 추가

  // 필터 값 저장 (서버에서 가져옴)
  const [mogackoList, setMogackoList] = useState([]);
  const [studyList, setStudyList] = useState([]);

  // 선택된 필터 상태 관리
  const [selectedGroup, setSelectedGroup] = useState("모각코조");
  const [selectedStudy, setSelectedStudy] = useState("스터디명");

  // 서버에서 멤버 데이터 가져옴
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        console.log("🚀 API 요청 중...");
        const response = await axios.get('http://localhost:8080/member');
        console.log("✅ API 응답:", response.data);

        setMembers(response.data); // 데이터 저장
        setLoading(false); // 로딩 완료

        // 서버에서 가져온 데이터로 필터 리스트 생성
        const mogackoSet = new Set(response.data.map(member => member.mogacko));
        const studySet = new Set(response.data.map(member => member.study));

        console.log(mogackoSet);
        console.log(studySet);

        setMogackoList([...mogackoSet]);
        setStudyList([...studySet]);

      } catch (error) {
        console.error("🥹 데이터 불러오기 실패:", error);
        setError(error); // 에러 상태 저장
        setLoading(false); // 로딩 종료
      }
    };
    fetchMembers();
  }, []);

  // 필터링된 멤버 리스트 반환
  const filteredMembers = members.filter(member => 
    (selectedGroup === "모각코조" || selectedGroup === "전체" || member.mogacko === selectedGroup) &&
    (selectedStudy === "스터디명" || selectedStudy === "전체" || member.study === selectedStudy)
  );

  return (
    <div className="member px-8 py-6">

      {/* 상단 */}
      <div className="flex justify-between items-center w-5/6 mx-auto">

        {/* 타이틀 */}
        <div className="flex items-center gap-3">
          <p className="text-3xl">👩🏻‍💻</p>
          <p className="text-xl">KOSS 부원을 소개합니다</p>
          <p className="text-3xl">🧑🏻‍💻</p>
        </div>

        {/* 모각코 필터 */}
        <div className="flex gap-3">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-md"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}  
          >
            <option value="모각코조" disabled>모각코조</option>
            <option value="전체">전체</option>
            {mogackoList.map((mogacko, index) => (
              <option key={index} value={mogacko}>{mogacko}</option>
            ))}
          </select>

          {/* 스터디 필터 */}
          <select
            className="px-3 py-2 border border-gray-300 rounded-md"
            value={selectedStudy}
            onChange={(e)=>setSelectedStudy(e.target.value)}
          >
            <option value="스터디명" disabled>스터디명</option>
            <option value="전체">전체</option>
            {studyList.map((study, index) => (
              <option key={index} value={study}>{study}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 부원 리스트 */}
      <div className="mt-6 w-5/6 mx-auto">
        {/* 리스트 헤더 */}
        <div className="flex justify-between items-center py-2 font-bold text-center">
          <p className="w-1/4">성명</p>
          <p className="w-1/4">학번</p>
          <p className="w-1/4">모각코 조</p>
          <p className="w-1/4">스터디</p>
        </div>

        <hr className="border-gray-200 my-4" />

        {/* 데이터 로딩 중 */}
        {loading && <p className="text-center text-gray-500 py-4">데이터를 불러오는 중...</p>}

        {/* 에러 발생 시 */}
        {error && <p className="text-center text-red-500 py-4">데이터를 불러오는 중 오류가 발생했습니다.</p>}

        {/* 에러 발생하지 않았을 경우에만 리스트 렌더링 */}
        {!loading && !error && (
          <>
        {/* 부원 정보 */}
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member, index) => (
            <div key={index}>
              <div className="flex justify-between items-center py-3 text-center">
                <p className="w-1/4">{member.username}</p>
                <p className="w-1/4">{member.studentNumber}</p>
                <p className="w-1/4">{member.mogacko}</p>
                <p className="w-1/4">{member.study}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">조건에 맞는 부원이 없습니다.</p>
        )}
        </>
        )}
      </div>
    </div>
  );
};

export default Member;
