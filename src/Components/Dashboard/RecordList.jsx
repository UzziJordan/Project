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

  return (
    <div>
        <div className="flex justify-between mb-4">
            <h2 className="font-semibold text-[16px]">
                Recent Recordings
            </h2>

            <span
                className="text-[14px] text-[#4B5563] cursor-pointer"
                >
                View →
            </span>      
        </div>

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
              <div className="flex gap-6">
                <img src={divrec} alt="" />

                <div>
                  <h3 className="font-semibold text-[16px]">
                    {rec.title}
                  </h3>

                  <p className="text-[14px] text-[#9CA3AF] flex gap-5">
                    {rec.date || "Unknown date"}
                    <span>{rec.duration || "0 min"}</span>

                    {rec.transcript ? (
                      <span className="text-[#3B82F6]">
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

              <div className="flex gap-5 items-center">
                <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  {rec.tag || "General"}
                </span>

                <span
                    onClick={() => navigate("/dashboard/transcript", { state: rec })}
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