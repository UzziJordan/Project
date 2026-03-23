import React, { useEffect, useState } from "react";
import divrec from "../../Images/divrec.svg";
import { useNavigate } from "react-router-dom";
import { databases, account } from "../../lib/appwrite";
import { DATABASE_ID, RECORDINGS_COLLECTION_ID } from "../../lib/databaseConfig";
import { Query } from "appwrite";

const RecordList = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ================= GET FROM APPWRITE =================
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const user = await account.get();
        const response = await databases.listDocuments(
          DATABASE_ID,
          RECORDINGS_COLLECTION_ID,
          [
            Query.equal('userId', [user.$id]),
            Query.orderDesc('$createdAt'),
            Query.limit(5)
          ]
        );
        setRecords(response.documents);
      } catch (error) {
        console.error("Error fetching records:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
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

        <span 
          onClick={() => navigate("/dashboard/library")}
          className="text-[14px] text-[#4B5563] cursor-pointer hover:text-blue-600 transition"
        >
          View All →
        </span>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-10 text-center text-gray-400">Loading...</div>
        ) : records.length === 0 ? (
          <div className="bg-white p-10 rounded-xl text-center">
            <p className="text-gray-400 text-sm">
              No recordings yet.
            </p>
            <button 
              onClick={() => navigate("/dashboard/recording")}
              className="mt-4 text-blue-600 font-semibold hover:underline"
            >
              Start recording →
            </button>
          </div>
        ) : (
          records.map((rec) => (
            <div
              key={rec.$id}
              onClick={() => {
                localStorage.setItem('latestRecording', JSON.stringify(rec));
                navigate("/dashboard/transcript");
              }}
              className="bg-white px-6 py-8 rounded-xl flex justify-between items-center hover:shadow-md transition cursor-pointer"
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