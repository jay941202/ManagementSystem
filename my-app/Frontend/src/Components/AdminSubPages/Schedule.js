import React from "react";

export default function Schedule() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed (0 = January)

  // 1일이 무슨 요일인지
  const firstDay = new Date(year, month, 1).getDay();

  // 해당 월의 마지막 날
  const lastDate = new Date(year, month + 2, 0).getDate();

  // 날짜 배열 만들기
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null); // 빈칸 채우기
  }
  for (let i = 1; i <= lastDate; i++) {
    calendarDays.push(i);
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">
        {year}년 {month + 1}월
      </h2>

      {/* 요일 */}
      <div className="grid grid-cols-7 font-bold text-center gap-2 text-gray-600 mb-2">
        <div className="border-2 border-twohas">Sun</div>
        <div className="border-2 border-twohas">Mon</div>
        <div className="border-2 border-twohas">Tue</div>
        <div className="border-2 border-twohas">Wed</div>
        <div className="border-2 border-twohas">Thu</div>
        <div className="border-2 border-twohas">Fri</div>
        <div className="border-2 border-twohas">Sat</div>
      </div>

      {/* 날짜 */}
      <div className="grid grid-cols-7 text-center gap-2">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className="border-2 border-twohas h-32 flex bg-white hover:bg-gray-100"
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
}
