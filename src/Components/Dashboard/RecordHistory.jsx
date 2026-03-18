import React, { useEffect, useState } from 'react'
import { FiUpload, FiMoreHorizontal } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import divrec from '../../Images/divrec.svg';



const RecordHistory = ({ searchTerm = "" }) => {
  // ================= STATE =================
  const [recordings, setRecordings] = useState([]);
  const [selectedRecording, setSelectedRecording] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const navigate = useNavigate();

  // ================= LOAD DATA =================
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('recordings')) || [];
    setRecordings(data);
  }, []);

  // ================= FILTER =================
  const filteredRecordings = recordings.filter((rec) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      rec.title.toLowerCase().includes(searchLower) ||
      (rec.transcript && rec.transcript.toLowerCase().includes(searchLower)) ||
      (rec.summary && rec.summary.toLowerCase().includes(searchLower))
    );
  });

  // ================= CLOSE DROPDOWN =================
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);

    if (openMenuId !== null) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openMenuId]);

  // ================= HELPERS =================
  const formatTime = (seconds) => {
    if (!seconds) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  // ================= ACTIONS =================
  const handleDelete = (id, e) => {
    e.stopPropagation();

    if (!window.confirm("Delete this recording?")) return;

    const updated = recordings.filter((rec) => rec.id !== id);
    setRecordings(updated);
    localStorage.setItem('recordings', JSON.stringify(updated));
    setOpenMenuId(null);
  };

  const handleDownloadAudio = (rec) => {
    const link = document.createElement('a');
    link.href = rec.audioURL;
    link.download = rec.title || 'recording';
    link.click();
  };

  const handleRowClick = (rec) => {
    localStorage.setItem('latestRecording', JSON.stringify(rec));
    navigate('/dashboard/transcript');
  };

  const handleShareClick = (e, rec) => {
    e.stopPropagation();
    setSelectedRecording(rec);
    setShowModal(true);
  };

  const handleMenuClick = (e, rec) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === rec.id ? null : rec.id);
  };

  // ================= UI =================
  return (
    <div className='px-6 mt-8 pb-10'>

      {/* ================= TABLE ================= */}
      <div className="bg-white border-2 border-[#EBEBEB] rounded-xl overflow-hidden shadow-sm">

        {/* Header */}
        <div className="grid grid-cols-5 px-6 py-3 bg-[#EFF2F9] text-[14px] font-semibold text-[#808080]">
          <div className="col-span-2">TITLE</div>
          <div>DATE</div>
          <div>DURATION</div>
          <div>TAGS</div>
        </div>

        {/* Rows */}
        {filteredRecordings.length === 0 ? (
          <div className="p-10 text-center text-gray-400 text-sm">
            <p className="mb-2">
              {searchTerm
                ? `No recordings found matching "${searchTerm}"`
                : "No recordings yet"}
            </p>

            {!searchTerm && (
              <button
                onClick={() => navigate('/dashboard/recording')}
                className="text-blue-600 font-medium hover:underline"
              >
                Start your first recording →
              </button>
            )}
          </div>
        ) : (
          filteredRecordings.map((rec) => (
            <div
              key={rec.id}
              onClick={() => handleRowClick(rec)}
              className="grid grid-cols-5 items-center px-6 py-4 border-t hover:bg-gray-50 cursor-pointer transition"
            >

              {/* TITLE */}
              <div className="col-span-2 flex items-center gap-3 font-semibold">
                <img src={divrec} alt="" className="w-8 h-8 opacity-80" />
                <p className="truncate pr-4">{rec.title}</p>
              </div>

              {/* DATE */}
              <div className='text-sm text-gray-500'>{rec.date}</div>

              {/* DURATION */}
              <div className='text-sm font-medium tabular-nums text-gray-600'>
                {formatTime(rec.duration)}
              </div>

              {/* TAG + ACTIONS */}
              <div className="flex items-center justify-between">

                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                  {rec.tag || "Meeting"}
                </span>

                <div className="flex gap-2">

                  {/* SHARE */}
                  <button
                    onClick={(e) => handleShareClick(e, rec)}
                    className="p-2 border rounded-lg hover:bg-white hover:shadow-sm"
                  >
                    <FiUpload />
                  </button>

                  {/* MENU */}
                  <div className="relative">
                    <button
                      onClick={(e) => handleMenuClick(e, rec)}
                      className="p-2 border rounded-lg hover:bg-white hover:shadow-sm"
                    >
                      <FiMoreHorizontal />
                    </button>

                    {openMenuId === rec.id && (
                      <div className="absolute right-0 top-10 w-36 bg-white border rounded-lg shadow-xl z-20 py-1">
                        <button
                          onClick={(e) => handleDelete(rec.id, e)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRowClick(rec);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                        >
                          View Transcript
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {/* ================= MODAL ================= */}
      {showModal && selectedRecording && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
            >
              ✕
            </button>

            {/* HEADER */}
            <h2 className="text-lg font-semibold mb-1">Share & Export</h2>
            <p className="text-sm text-gray-500 mb-6">
              {selectedRecording.title} • {formatTime(selectedRecording.duration)}
            </p>

            {/* OPTIONS */}
<div className="space-y-3">

  {/* Download Audio */}
  <div
    onClick={() => handleDownloadAudio(selectedRecording)}
    className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 cursor-pointer"
  >
    <div>
      <p className="font-medium">Download Audio</p>
      <p className="text-sm text-gray-500">Save recording file</p>
    </div>
    <span>›</span>
  </div>

  {/* Copy Summary */}
  <div
    onClick={() => {
      navigator.clipboard.writeText(selectedRecording.summary || "No summary available");
    }}
    className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 cursor-pointer"
  >
    <div>
      <p className="font-medium">Copy Summary</p>
      <p className="text-sm text-gray-500">Copy AI-generated summary</p>
    </div>
    <span>›</span>
  </div>

  {/* Download PDF (basic version) */}
  <div
    onClick={() => {
      const content = `
Title: ${selectedRecording.title}

Summary:
${selectedRecording.summary || "No summary"}

Transcript:
${selectedRecording.transcript || "No transcript"}
      `;

      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${selectedRecording.title}.txt`;
      link.click();
    }}
    className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 cursor-pointer"
  >
    <div>
      <p className="font-medium">Download Transcript</p>
      <p className="text-sm text-gray-500">Summary + transcript</p>
    </div>
    <span>›</span>
  </div>

  {/* Export Transcript */}
  <div
    onClick={() => {
      const blob = new Blob(
        [selectedRecording.transcript || "No transcript"],
        { type: "text/plain" }
      );
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${selectedRecording.title}-transcript.txt`;
      link.click();
    }}
    className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 cursor-pointer"
  >
    <div>
      <p className="font-medium">Export Transcript</p>
      <p className="text-sm text-gray-500">txt format</p>
    </div>
    <span>›</span>
  </div>

  {/* Open Audio Link */}
  <div
    onClick={() => window.open(selectedRecording.audioURL, "_blank")}
    className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 cursor-pointer"
  >
    <div>
      <p className="font-medium">Open Audio</p>
      <p className="text-sm text-gray-500">Play in new tab</p>
    </div>
    <span>›</span>
  </div>

</div>            {/* LINK */}
            <div className="flex gap-2 mt-6">
              <input
                readOnly
                value={selectedRecording.audioURL}
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
              />
              <button
                onClick={() =>
                  navigator.clipboard.writeText(selectedRecording.audioURL)
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Copy
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default RecordHistory;