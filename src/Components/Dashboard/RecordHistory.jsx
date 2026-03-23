// ================= IMPORTS =================
import React, { useEffect, useState } from 'react';
import { FiUpload, FiMoreHorizontal } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { databases, storage, account } from '../../lib/appwrite';
import { DATABASE_ID, RECORDINGS_COLLECTION_ID, BUCKET_ID } from '../../lib/databaseConfig';
import { Query } from 'appwrite';

import divrec from '../../Images/divrec.svg';
import audioi from '../../Images/audio.svg';
import linkk from '../../Images/linkk.svg'
import pdf from '../../Images/pdf.svg'
import summaryi from '../../Images/summary.svg'
import transcripti from '../../Images/transcript.svg'


// ================= COMPONENT =================
const RecordHistory = ({ searchTerm = "" }) => {

  // ================= STATE =================
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecording, setSelectedRecording] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const navigate = useNavigate();


  // ================= LOAD DATA =================
  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const user = await account.get();
        const response = await databases.listDocuments(
          DATABASE_ID,
          RECORDINGS_COLLECTION_ID,
          [
            Query.equal('userId', [user.$id]),
            Query.orderDesc('$createdAt')
          ]
        );
        setRecordings(response.documents);
      } catch (error) {
        console.error("Error fetching recordings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecordings();
  }, []);


  // ================= FILTER RECORDINGS =================
  const filteredRecordings = recordings.filter((rec) => {
    const searchLower = searchTerm.toLowerCase();

    const title = rec?.title || "";
    const transcript = rec?.transcript || "";
    const summary = rec?.summary || "";

    return (
      title.toLowerCase().includes(searchLower) ||
      transcript.toLowerCase().includes(searchLower) ||
      summary.toLowerCase().includes(searchLower)
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

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTagStyles = (tag) => {
    const t = (tag || "").toLowerCase();

    if (t === "product") return "bg-[#EFF6FF] text-[#2563EB]";
    if (t === "interview") return "bg-[#F5F3FF] text-[#7C3AED]";
    if (t === "lecture") return "bg-[#F0FDF4] text-[#16A34A]";
    if (t === "client") return "bg-[#FFFBEB] text-[#D97706]";

    return "bg-blue-50 text-blue-600";
  };


  // ================= ACTIONS =================
  const handleDelete = async (rec, e) => {
    e.stopPropagation();

    if (!window.confirm("Delete this recording?")) return;

    try {
      // 1. Delete from Database
      await databases.deleteDocument(
        DATABASE_ID,
        RECORDINGS_COLLECTION_ID,
        rec.$id
      );

      // 2. Delete from Storage (optional/best effort)
      if (rec.audioFileId) {
        try {
          await storage.deleteFile(BUCKET_ID, rec.audioFileId);
        } catch (storageError) {
          console.warn("Could not delete file from storage:", storageError);
          // We don't throw here so the UI still updates if the document was deleted
        }
      }

      const updated = recordings.filter((r) => r.$id !== rec.$id);
      setRecordings(updated);
    } catch (error) {
      console.error("Error deleting recording:", error);
      alert("Failed to delete recording from Appwrite.");
    }

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
    setOpenMenuId(openMenuId === rec.$id ? null : rec.$id);
  };


  // ================= UI =================
  return (
    <div className='px-4 md:px-6 mt-2 pb-10'>

      
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm">

        {/* HEADER */}
        <div className="grid grid-cols-2 md:grid-cols-5 px-4 md:px-6 py-3 bg-[#EFF2F9] border-b border-[#EBEBEB] text-[12px] md:text-[14px] font-semibold text-[#808080]">
          <div className="col-span-1 md:col-span-2">TITLE</div>
          <div className="hidden md:block">DATE</div>
          <div className="hidden md:block">DURATION</div>
          <div className="text-right md:text-left">TAGS / ACTIONS</div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="p-10 text-center text-gray-400 text-sm italic">Loading recordings...</div>
        ) : filteredRecordings.length === 0 ? (
          
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
              key={rec.$id}
              onClick={() => handleRowClick(rec)}
              className="grid grid-cols-2 md:grid-cols-5 items-center px-4 md:px-6 py-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer transition"
            >

              {/* TITLE */}
              <div className="col-span-1 md:col-span-2 flex items-center gap-2 md:gap-3 font-semibold">
                <img src={divrec} alt="record icon" className="w-6 h-6 md:w-8 md:h-8 opacity-80 shrink-0" />
                <div className="truncate">
                  <p className="truncate text-[#1F2937] text-[14px] md:text-[16px] font-medium pr-2">
                    {rec.title || "Untitled Recording"}
                  </p>
                  {/* Show date on mobile title as subtext */}
                  <p className="md:hidden text-[10px] text-gray-400 font-normal">
                    {formatDate(rec.date)} • {formatTime(rec.duration || 0)}
                  </p>
                </div>
              </div>

              {/* DATE - Hidden on mobile */}
              <div className='hidden md:block text-[14px] text-[#1F2937]'>
                {formatDate(rec.date)}
              </div>

              {/* DURATION - Hidden on mobile */}
              <div className='hidden md:block text-[14px] text-[#1F2937]'>
                {formatTime(rec.duration || 0)}
              </div>

              {/* TAG + ACTIONS */}
              <div className="flex items-center justify-end md:justify-between gap-2">

                <span
                  className={`hidden sm:inline-block px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider ${getTagStyles(
                    rec.tag
                  )}`}
                >
                  {rec.tag || "Meeting"}
                </span>
                
                <div className="flex gap-1 md:gap-2">
                  
                  <button
                    onClick={(e) => handleShareClick(e, rec)}
                    className="p-1.5 md:p-2 border text-[#6B7280] border-[#E5E7EB] rounded-lg hover:bg-white hover:shadow-sm"
                  >
                    <FiUpload size={16} />
                  </button>
                  
                  <div className="relative">
                    <button
                      onClick={(e) => handleMenuClick(e, rec)}
                      className="p-1.5 md:p-2 border text-[#6B7280] border-[#E5E7EB] rounded-lg hover:bg-white hover:shadow-sm"
                    >
                      <FiMoreHorizontal size={16} />
                    </button>
                    
                    {openMenuId === rec.$id && (
                      <div className="absolute right-0 bottom-0 w-36 bg-white border border-gray-200 rounded-lg shadow-xl z-20 py-1">

                        <button
                          onClick={(e) => handleDelete(rec, e)}
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

      
      <div className='flex justify-between items-center'>
        {/* HEADER */}
        <div>
          <h2 className="text-[22px] font-bold mb-1">Share & Export</h2>
          <p className="text-[14px] text-[#808080] mt-2">
            {selectedRecording.title || "Untitled Recording"} • {formatTime(selectedRecording.duration || 0)}
          </p>
        </div>

        {/* CLOSE BUTTON */}
        <div>
          <button
            onClick={() => setShowModal(false)}
            className="px-3.5 py-2 bg-[#EBEBEB] text-[#374957] rounded-full flex items-center justify-center"
          >
            ✕
          </button>
        </div>


      </div>

      {/* OPTIONS */}
      <div className="space-y-3 mt-3">

        {/* DOWNLOAD AUDIO */}
        <div
          onClick={() => handleDownloadAudio(selectedRecording)}
          className="flex items-center justify-between px-4 py-2 border border-[#DDDDDD] rounded-xl hover:bg-gray-50 cursor-pointer"
        >
          <div className='flex gap-4 items-center'>
            <img src={audioi} alt="" 
            className='p-4 rounded-2xl bg-[#D4D4FE]'/>

            <div>
              <p className="text-[#2B2B2B] text-[18px] font-medium ">Download Audio</p>
              <p className="text-[16px] font-medium text-[#AAAAAA]">Save recording file</p>
            </div>
          </div>

          <span className='text-[#374957] text-[25px] '> › </span>
        </div>

        {/* COPY SUMMARY */}
        <div
          onClick={() => {
            navigator.clipboard.writeText(
              selectedRecording.summary || "No summary available"
            );
          }}
          className="flex items-center justify-between px-4 py-2 border border-[#DDDDDD] rounded-xl hover:bg-gray-50 cursor-pointer"
        >
          <div className='flex gap-4 items-center'>
            <img src={summaryi} alt="" 
            className='p-4 rounded-2xl bg-[#D4D4FE]'/>

            <div>
              <p className="text-[#2B2B2B] text-[18px] font-medium ">Copy Summary</p>
              <p className="text-[16px] font-medium text-[#AAAAAA]">Copy AI-generated summary</p>
            </div>
          </div>

          <span className='text-[#374957] text-[25px] '> › </span>
        </div>

        {/* DOWNLOAD TRANSCRIPT */}
        <div
          onClick={() => {
            const content = `
            Title: ${selectedRecording.title || ""}

            Summary:
            ${selectedRecording.summary || "No summary"}

            Transcript:
            ${selectedRecording.transcript || "No transcript"}
            `;

            const blob = new Blob([content], { type: "text/plain" });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `${selectedRecording.title || "recording"}.txt`;
            link.click();
          }}
          className="flex items-center justify-between px-4 py-2 border border-[#DDDDDD] rounded-xl hover:bg-gray-50 cursor-pointer"
        >
          <div className='flex gap-4 items-center'>
            <img src={pdf} alt="" 
            className='p-4 rounded-2xl bg-[#D4D4FE]'/>

            <div>
              <p className="text-[#2B2B2B] text-[18px] font-medium ">Download PDF</p>
              <p className="text-[16px] font-medium text-[#AAAAAA]">Summary + full transcript as PDF</p>
            </div>
          </div>

          <span className='text-[#374957] text-[25px] '> › </span>
        </div>


        {/* EXPORT TRANSCRIPT */}
        <div
          onClick={() => {
            const blob = new Blob(
              [selectedRecording.transcript || "No transcript"],
              { type: "text/plain" }
            );

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `${selectedRecording.title || "recording"}-transcript.txt`;
            link.click();
          }}
          className="flex items-center justify-between px-4 py-2 border border-[#DDDDDD] rounded-xl hover:bg-gray-50 cursor-pointer"
        >
          <div className='flex gap-4 items-center'>
            <img src={transcripti} alt="" 
            className='p-3 rounded-2xl bg-[#D4D4FE]'/>

            <div>
              <p className="text-[#2B2B2B] text-[18px] font-medium ">Export Transcript</p>
              <p className="text-[16px] font-medium text-[#AAAAAA]">Download as .txt, .md or .docx</p>
            </div>
          </div>

          <span className='text-[#374957] text-[25px] '> › </span>
        </div>

        {/* OPEN AUDIO */}
        <div
          onClick={() => window.open(selectedRecording.audioURL, "_blank")}
          className="flex items-center justify-between px-4 py-2 border border-[#DDDDDD] rounded-xl hover:bg-gray-50 cursor-pointer"
        >
          <div className='flex gap-4 items-center'>
            <img src={linkk} alt="" 
            className='p-3 rounded-2xl bg-[#D4D4FE]'/>

            <div>
              <p className="text-[#2B2B2B] text-[18px] font-medium ">Share Link</p>
              <p className="text-[16px] font-medium text-[#AAAAAA]">Anyone with link can view (read only) </p>
            </div>
          </div>

          <span className='text-[#374957] text-[25px] '> › </span>
        </div>

      </div>

      {/* AUDIO LINK */}
      <div className="flex gap-2 mt-6">
        <input
          readOnly
          value={selectedRecording.audioURL || ""}
          className="flex-1 px-3 py-2 border border-[#DDDDDD] text-[14px] text-[#808080] font-medium rounded-lg text-sm"
        />

        <button
          onClick={() =>
            navigator.clipboard.writeText(selectedRecording.audioURL || "")
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