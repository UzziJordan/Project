import React, { useEffect, useState } from "react";
import divrec from "../../Images/divrec.svg";
import { useNavigate } from "react-router-dom";

const RecordList = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  // ================= GET FROM LOCAL STORAGE =================
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recordings")) || [];
    setRecords(stored);
  }, []);

  // ================= FORMAT DATE =================
  const formatDate = (date) => {
    if (!date) return "Unknown date";

    const d = new Date(date);
    const today = new Date();

    const isToday =
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear();

    const time = d.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    return isToday
      ? `Today, ${time}`
      : `${d.toLocaleDateString()}, ${time}`;
  };

  // ================= FORMAT DURATION =================
  const formatDuration = (seconds) => {
    if (!seconds) return "0 sec";

    const sec = Math.floor(seconds);
    const mins = Math.floor(sec / 60);
    const hrs = Math.floor(mins / 60);

    if (sec < 60) return `${sec} sec`;
    if (mins < 60) return `${mins} min`;

    const remainingMins = mins % 60;
    return `${hrs}h ${remainingMins}min`;
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-[16px]">
          Recent Recordings
        </h2>

        <span className="text-[14px] text-[#4B5563] cursor-pointer">
          View →
        </span>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {records.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No recordings yet
          </p>
        ) : (
          records.map((rec, index) => (
            <div
              key={index}
              className="bg-white px-6 py-8 rounded-xl flex justify-between items-center"
            >
              {/* LEFT */}
              <div className="flex gap-6">
                <img src={divrec} alt="" />

                <div>
                  <h3 className="font-semibold text-[16px]">
                    {rec.title}
                  </h3>

                  {/* DATE + DURATION */}
                  <div className="flex items-center gap-5 ">
                    <p className="text-[14px] text-[#9CA3AF] flex gap-5 w-75">
                      <span>{formatDate(rec.date)}</span>
                      <span>{formatDuration(rec.duration)}</span>

                      {/* TRANSCRIPT STATUS */}
                      {rec.transcript ? (
                        <span className="text-[#3B82F6] text-[13px]">
                          Transcribed ✓
                        </span>
                      ) : (
                        <span className="text-gray-400">
                          No transcript
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex gap-5 items-center">
                <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  {rec.tag || "General"}
                </span>

                <span
                  onClick={() =>
                    navigate("/dashboard/transcript", { state: rec })
                  }
                  className="text-[14px] text-[#4B5563] cursor-pointer"
                >
                  View →
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecordList;