import React from "react";

const Detail = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl">
        <div className="relative flex justify-center items-center">
          <img
            src="/Group%2059.png"
            alt="Winter Study Header"
            className="w-90 object-cover rounded-t-2xl"
          />
        </div>

        {/* Main Content */}
        <div className="p-6 text-center">
          <p className="text-gray-800 text-lg mb-4">
            겨울방학 동안 함께 성장할 웹 프론트엔드/백엔드 스터디 참여 신청이 오늘 마감됩니다! 🎉
          </p>

          <p className="text-gray-800 mb-4">
            혹시 아직 신청하지 않은 분들 중, 아래에 해당하는 분들이 있다면 이번 기회를 놓치지 마세요!
          </p>

          <ul className="list-disc list-inside mb-4 text-gray-800">
            <li>
              아무 목표 없이 보내는 방학이 아쉬운다면, 이번 스터디로 성장의 계기를 만들어보세요.
            </li>
            <li>
              기초부터 배우고 싶거나 실제 프로젝트를 진행하며 실력을 키우고 싶다면 적극 추천합니다.
            </li>
          </ul>

          <div className="text-center mb-6">
            <p className="bg-green-100 text-green-800 rounded-lg px-5 py-4 inline-block">
              ✅ React와 Node.js라는 인기 있는 스택을 배우며, 실무 프로젝트와 팀 협업을 경험할 수 있습니다.
            </p>
          </div>

          {/* Schedule Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">📅 진행 일정</h2>
            <ul className="list-disc list-inside text-gray-800">
              <li>
                스터디: 12월 23일(토) ~ 2월 7일(수) (진행 상황에 따라 단축 가능)
              </li>
              <li>
                해커톤: 2월 7일(수) ~ 2월 9일(금)
              </li>
            </ul>
          </div>

          {/* Application Link */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">🔗 구글폼 신청</h2>
            <a
              href="https://forms.gle/wS5xWKA67VTo6p6G8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              https://forms.gle/wS5xWKA67VTo6p6G8
            </a>
          </div>

          {/* Fee Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">💳 참가비 안내</h2>
            <p className="text-gray-800">
              - 우리은행 1002963983076 홍길동 (100% 환불 가능)
            </p>
            <p className="text-gray-800">
              - 스터디와 해커톤 참가비는 따로 부과되지 않습니다.
            </p>
          </div>

          <p className="text-gray-800">
            오늘 자정까지가 마감이니 늦지 않게 신청 부탁드립니다! 🙏
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
