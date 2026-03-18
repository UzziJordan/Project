import React, { useEffect, useState } from 'react'
import { FiUpload, FiMoreHorizontal } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import divrec from '../../Images/divrec.svg'

const RecordHistory = () => {
  const [recordings, setRecordings] = useState([]);
  const [selectedRecording, setSelectedRecording] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('recordings')) || [];
    setRecordings(data);
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
    };

    if (openMenuId !== null) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openMenuId]);

  const formatTime = (seconds) => {
    if (!seconds) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm("Delete this recording?");
    if (!confirmDelete) return;

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

  return (
    <div className='px-18 mt-8 pb-10'>
      <div className="bg-white border-2 border-[#EBEBEB] rounded-xl overflow-hidden shadow-sm">

        {/* Header */}
        <div className="grid grid-cols-5 px-6 py-3 bg-[#EFF2F9] text-[14px] font-semibold text-[#808080]">
          <div className="col-span-2">TITLE</div>
          <div>DATE</div>
          <div>DURATION</div>
          <div>TAGS</div>
        </div>

        {/* Rows */}
        {recordings.length === 0 ? (
          <div className="p-10 text-center text-gray-400 text-sm">
            <p className="mb-2">No recordings yet</p>
            <button 
              onClick={() => navigate('/dashboard/recording')}
              className="text-blue-600 font-medium hover:underline"
            >
              Start your first recording →
            </button>
          </div>
        ) : (
          recordings.map((rec) => (
            <div
              key={rec.id}
              onClick={() => handleRowClick(rec)}
              className="grid grid-cols-5 items-center px-6 py-4 text-[#1F2937] border-t hover:bg-gray-50 cursor-pointer transition"
            >

              {/* Title */}
              <div className="col-span-2 flex items-center text-[16px] font-semibold gap-3">
                <img src={divrec} alt="" className="w-8 h-8 opacity-80" />
                <p className="truncate pr-4">{rec.title}</p>
              </div>

              {/* Date */}
              <div className='text-[14px] text-gray-500'>{rec.date}</div>

              {/* Duration */}
              <div className='text-[14px] font-medium tabular-nums text-gray-600'>
                {formatTime(rec.duration)}
              </div>

              {/* Tags + Actions */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                  {rec.tag || "Meeting"}
                </span>

                <div className="flex gap-2">

                  {/* SHARE */}
                  <button
                    className="p-2 border rounded-lg hover:bg-white hover:shadow-sm transition"
                    onClick={(e) => handleShareClick(e, rec)}
                  >
                    <FiUpload className="text-gray-500" />
                  </button>

                  {/* MENU */}
                  <div className="relative">
                    <button
                      onClick={(e) => handleMenuClick(e, rec)}
                      className="p-2 border rounded-lg hover:bg-white hover:shadow-sm transition"
                    >
                      <FiMoreHorizontal className="text-gray-500" />
                    </button>

                    {openMenuId === rec.id && (
                      <div className="absolute right-0 top-0 w-36 bg-white border rounded-lg shadow-xl z-10 py-1">
                        <button
                          onClick={(e) => handleDelete(rec.id, e)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                        >
                          Delete
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleRowClick(rec); }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-1 text-gray-900">Share & Export</h2>
            <p className="text-sm text-gray-500 mb-8">
              {selectedRecording.title} • {formatTime(selectedRecording.duration)}
            </p>

            {/* Options */}
            <div className="space-y-3">

              {/* Download Audio */}
              <div
                onClick={() => handleDownloadAudio(selectedRecording)}
                className="flex items-center justify-between p-4 border rounded-xl hover:bg-blue-50 hover:border-blue-200 transition cursor-pointer group"
              >
                <div>
                  <p className="font-bold text-gray-800 group-hover:text-blue-700">Download Audio</p>
                  <p className="text-sm text-gray-500">Save recording file locally</p>
                </div>
                <span className="text-gray-400 group-hover:text-blue-500">›</span>
              </div>

              <div 
                onClick={() => {
                  navigator.clipboard.writeText(selectedRecording.summary);
                  alert("Summary copied to clipboard!");
                }}
                className="flex items-center justify-between p-4 border rounded-xl hover:bg-blue-50 hover:border-blue-200 transition cursor-pointer group"
              >
                <div>
                  <p className="font-bold text-gray-800 group-hover:text-blue-700">Copy Summary</p>
                  <p className="text-sm text-gray-500">Copy AI-generated summary</p>
                </div>
                <span className="text-gray-400 group-hover:text-blue-500">›</span>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 cursor-not-allowed opacity-60">
                <div>
                  <p className="font-bold text-gray-800">Download PDF (Coming Soon)</p>
                  <p className="text-sm text-gray-500">Summary + transcript</p>
                </div>
                <span className="text-gray-400">›</span>
              </div>

            </div>

            {/* Link */}
            <div className="mt-8">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Internal Blob URL</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={selectedRecording.audioURL}
                  className="flex-1 px-3 py-2 bg-gray-50 border rounded-lg text-xs font-mono text-gray-500 outline-none"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedRecording.audioURL);
                    alert("Link copied!");
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-md shadow-blue-200"
                >
                  Copy
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 italic">
                * Note: Blob URLs are session-specific and will expire on refresh.
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
      )
}

export default RecordHistory