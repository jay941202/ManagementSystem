import React from "react";
import ClockInOut from "./UtilityComponents/ClockInOut";
import UserCashCount from "./UtilityComponents/UserCashCount";
import UserRefund from "./UtilityComponents/UserRefund";
import UnavailableDates from "./UtilityComponents/UnavailableDates";

export default function Utilities() {
  function getWorkdayStr() {
    const now = new Date();
    if (now.getHours() < 3) {
      now.setDate(now.getDate() - 1);
    }
    return `${now.getMonth() + 1}/${now.getDate()}`;
  }

  const workdayStr = getWorkdayStr();

  return (
    <div className="space-y-8">
      <div className="p-6 bg-white rounded-xl shadow-md border-2 border-gray-300">
        <ClockInOut workday={workdayStr} />
      </div>

      <div className="p-6 bg-white rounded-xl shadow-md border-2 border-gray-300">
        <UserCashCount workday={workdayStr} />
      </div>

      <div className="p-6 bg-white rounded-xl shadow-md border-2 border-gray-300">
        <UserRefund workday={workdayStr} />
      </div>
      <div className="p-6 bg-white rounded-xl shadow-md border-2 border-gray-300">
        <UnavailableDates />
      </div>
    </div>
  );
}
