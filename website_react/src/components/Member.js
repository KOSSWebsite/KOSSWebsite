import React, { useState } from 'react';

const Member = () => {

  const members = [
    { name: "이민우", number: "20200000", group: "2조", study: "Web" },
    { name: "이동언", number: "20211111", group: "8조", study: "Python" },
    { name: "박혜민", number: "20222222", group: "3조", study: "React" },
    { name: "조시연", number: "20233333", group: "1조", study: "CV" },
    { name: "민승호", number: "20211234", group: "5조", study: "Flutter" },
    { name: "서다솜", number: "20244444", group: "6조", study: "Flutter" }
  ];

  // 선택된 필터 상태 관리
  const [selectedGroup, setSelectedGroup] = useState("모각코조");
  const [selectedStudy, setSelectedStudy] = useState("스터디명");

  // 필터링된 멤버 리스트 반환
  const filteredMembers = members.filter(member => 
    (selectedGroup === "모각코조" || selectedGroup === "전체" || member.group === selectedGroup) &&
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

        {/* 필터 */}
        <div className="flex gap-3">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-md"
            value={selectedGroup}
            onChange={(e)=>setSelectedGroup(e.target.value)}  
          >
            <option value="모각코조" disabled>모각코조</option>
            <option value="전체">전체</option>
            <option value="1조">1조</option>
            <option value="2조">2조</option>
            <option value="3조">3조</option>
            <option value="4조">4조</option>
            <option value="5조">5조</option>
            <option value="6조">6조</option>
            <option value="7조">7조</option>
            <option value="8조">8조</option>
          </select>

          <select
            className="px-3 py-2 border border-gray-300 rounded-md"
            value={selectedStudy}
            onChange={(e)=>setSelectedStudy(e.target.value)}
          >
            <option value="스터디명" disabled>스터디명</option>
            <option value="전체">전체</option>
            <option value="Web">Web</option>
            <option value="Python">Python</option>
            <option value="CV">CV</option>
            <option value="Flutter">Flutter</option>
            <option value="React">React</option>
            <option value="게임">게임</option>
            <option value="인공지능">인공지능</option>
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

        {/* 부원 정보 */}
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member, index) => (
            <div key={index}>
              <div className="flex justify-between items-center py-3 text-center">
                <p className="w-1/4">{member.name}</p>
                <p className="w-1/4">{member.number}</p>
                <p className="w-1/4">{member.group}</p>
                <p className="w-1/4">{member.study}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">조건에 맞는 부원이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Member;
