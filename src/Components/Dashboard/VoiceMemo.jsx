import React, { useState } from 'react';

const VoiceMemoRecorder = () => {

  // ================= STATE =================
  const [title, setTitle] = useState("");
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [duration, setDuration] = useState(0);
  const [tag, setTag] = useState("work");


  // ================= SAVE RECORDING =================
  const handleSave = () => {
    const recordings = JSON.parse(localStorage.getItem("recordings")) || [];

    const newRecording = {
      id: Date.now(),
      title: title || "Untitled Recording",
      transcript,
      summary,
      audioURL,
      duration,
      date: new Date(),
      tag, // ✅ IMPORTANT
    };

    const updated = [newRecording, ...recordings];

    localStorage.setItem("recordings", JSON.stringify(updated));

    alert("Recording saved!");
  };


  // ================= UI =================
  return (
    <div className="p-6">

      {/* TITLE INPUT */}
      <input
        type="text"
        placeholder="Recording title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-3 rounded-lg mb-4"
      />

      {/* TAG SELECTOR */}
      <div className="mb-6">
        <p className="text-sm mb-2 font-medium">Select Tag</p>

        <div className="flex gap-2 flex-wrap">
          {["work", "planning", "interview", "lecture", "product"].map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition ${
                tag === t
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Save Recording
      </button>

    </div>
  );
};

export default VoiceMemoRecorder;