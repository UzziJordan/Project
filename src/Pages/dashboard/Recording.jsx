// ================= IMPORTS =================
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { databases, storage, account, ID } from '../../lib/appwrite';
import { DATABASE_ID, RECORDINGS_COLLECTION_ID, BUCKET_ID } from '../../lib/databaseConfig';

// Icons
import pauseicon from '../../Images/frrpause.svg';
import recordicon from '../../Images/frmicrophone.svg';
import stopicon from '../../Images/frrstop.svg';

/**
 * VoiceMemoRecorder Component
 * Purpose: Handles live audio recording, real-time transcription, and saving to Appwrite.
 */
const VoiceMemoRecorder = () => {
  
  // ================= STATE =================
  const [recordingState, setRecordingState] = useState("READY TO RECORD"); 
  const [recordingTime, setRecordingTime] = useState(0);                   
  const [waveformBars, setWaveformBars] = useState(Array(20).fill(20));    
  const [transcript, setTranscript] = useState("");                         

  const navigate = useNavigate();

  // ================= REFS (Persistent non-triggering state) =================
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);


  // ================= SIDE EFFECTS =================

  // Initialize Speech Recognition (Browser API)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        let text = "";
        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript + " ";
        }
        setTranscript(text);
      };
      recognitionRef.current = recognition;
    }
  }, []);

  // Timer Control Logic
  useEffect(() => {
    if (recordingState === "recording") {
      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [recordingState]);


  // ================= HELPER FUNCTIONS =================

  // Formats seconds into MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Logic for the animated waveform visualization
  const startWaveform = () => {
    const analyser = analyserRef.current;
    if (!analyser) return;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const animate = () => {
      analyser.getByteFrequencyData(dataArray);
      const bars = Array.from(dataArray).slice(0, 20).map((v) => (v / 255) * 100);
      setWaveformBars(bars);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
  };


  // ================= EVENT HANDLERS =================

  // START RECORDING
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = MediaRecorder.isTypeSupported("audio/mp4") ? "audio/mp4" : "audio/webm";
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];
      setTranscript("");

      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      mediaRecorder.start();
      recognitionRef.current?.start();

      // Audio Context for Waveform
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === "suspended") await audioContext.resume();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;
      source.connect(analyser);
      
      startWaveform();
      setRecordingState("recording");
    } catch (err) {
      alert("Microphone access is required to record.");
    }
  };

  // PAUSE / RESUME
  const handlePause = () => {
    mediaRecorderRef.current?.pause();
    recognitionRef.current?.stop();
    cancelAnimationFrame(animationRef.current);
    setRecordingState("paused");
  };

  const handleResume = () => {
    mediaRecorderRef.current?.resume();
    recognitionRef.current?.start();
    startWaveform();
    setRecordingState("recording");
  };

  // STOP & SAVE TO APPWRITE
  const handleStop = () => {
    setRecordingState("processing");
    const finalDuration = recordingTime;

    mediaRecorderRef.current.onstop = async () => {
      const mimeType = MediaRecorder.isTypeSupported("audio/mp4") ? "audio/mp4" : "audio/webm";
      const blob = new Blob(audioChunksRef.current, { type: mimeType });

      try {
        const user = await account.get();
        const fileId = ID.unique();
        
        // Upload Audio File to Appwrite Storage
        const file = new File([blob], `recording-${Date.now()}.mp4`, { type: mimeType });
        await storage.createFile(BUCKET_ID, fileId, file);
        const fileUrl = storage.getFileView(BUCKET_ID, fileId);;;

        // Prepare Metadata for Database
        const newRecording = {
          userId: user.$id,
          title: `Recording ${new Date().toLocaleTimeString()}`,
          date: new Date().toISOString(),
          duration: finalDuration,
          audioFileId: fileId,
          audioURL: fileUrl.toString(),
          tag: "Meeting",
          transcript: transcript || "No transcript available",
          summary: transcript ? (transcript.slice(0, 150) + "...") : "No summary available"
        };

        // Save to Appwrite Database
        const response = await databases.createDocument(
          DATABASE_ID,
          RECORDINGS_COLLECTION_ID,
          ID.unique(),
          newRecording
        );

        // Store in localStorage for immediate access in tabs
        localStorage.setItem("latestRecording", JSON.stringify(response));

        // Cleanup and Redirect
        setTimeout(() => {
          setRecordingTime(0);
          setRecordingState("READY TO RECORD");
          navigate("/dashboard/transcript");
        }, 500);

      } catch (error) {
        console.error("Save error:", error);
        alert("Failed to save recording.");
        setRecordingState("READY TO RECORD");
      }
    };

    mediaRecorderRef.current.stop();
    recognitionRef.current?.stop();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    cancelAnimationFrame(animationRef.current);
    clearInterval(intervalRef.current);
  };


  // ================= MAIN UI RENDER =================
  return (
    <div className="flex items-center justify-center mt-5 font-geist">
      <div className="p-10 w-full max-w-md flex flex-col items-center">

        {/* STATUS BADGE */}
        <div className={`mb-4 text-[18px] font-semibold flex items-center gap-2 rounded-full px-4 py-2
          ${recordingState === "recording" ? "bg-[#D4D4FE] text-[#4C4CFB]" : 
            recordingState === "paused" ? "bg-[#FED3D4] text-[#FC464A]" : 
            recordingState === "processing" ? "bg-[#D4D4FE] text-[#4C4CFB]" : 
            "bg-[#E9E9FF] text-[#808080]"}`}
        >
          <div className={`h-3 w-3 rounded-full animate-pulse ${recordingState === "recording" ? "bg-[#4C4CFB]" : recordingState === "paused" ? "bg-[#FC464A]" : "bg-[#808080]"}`}></div>
          {recordingState.toUpperCase()}
        </div>        
      
        {/* MAIN RECORD BUTTON */}
        <button
          onClick={handleStartRecording}
          disabled={recordingState !== "READY TO RECORD"}
          className="w-40 h-40 mt-10 flex items-center justify-center transition-transform active:scale-95"
        >
          <img
            src={recordingState === "paused" ? pauseicon : recordicon}
            alt="recorder button"
            className={`rounded-full p-14.5 ${
            recordingState === "paused"
              ? "bg-[#FB2126] text-[#FC464A]"
              : "bg-[#2828FA] text-[#4C4CFB]"
          }`}
          />
        </button>

        <div className="mt-10 text-sm text-[#555555] font-semibold text-center">
          <p>
            {recordingState === "READY TO RECORD" && "Tap to Start Recording"}
            {recordingState === "recording" && "Tap pause or stop to finish"}
            {recordingState === "paused" && "Tap resume to continue"}
            {recordingState === "processing" && "Processing your memo..."}
          </p>
        </div>

        {/* TIMER & WAVEFORM */}
        {(recordingState === "recording" || recordingState === "paused") && (
          <div className="text-2xl mt-4 font-mono">{formatTime(recordingTime)}</div>
        )}

        <div className="w-full bg-white rounded-2xl p-4 mt-5 border border-gray-100 shadow-sm">
          <div className="flex gap-1 h-12 items-center justify-center">
            {waveformBars.map((h, i) => (
              <div key={i} className="w-1.5 bg-[#B8B8FD] rounded-full transition-all duration-75" style={{ height: `${Math.max(10, h)}%` }} />
            ))}
          </div>
        </div>

        {/* CONTROLS (VISIBLE WHEN RECORDING) */}
        {recordingState !== "READY TO RECORD" && recordingState !== "processing" && (
          <div className="flex gap-3 mt-5">
            <button
              onClick={
                recordingState === "recording"
                  ? handlePause
                  : handleResume
              }
              className="px-5 py-2 text-[16px] flex items-center gap-2 font-semibold bg-[#FFFFFF] text-[#2B2B2B] border border-[#2B2B2B] rounded-xl"
            >
              {recordingState === "recording" ? 
              <img className="p-1 size-4 bg-[#2B2B2B] rounded-full" src={pauseicon} alt="" /> : 
              <img className="p-1 size-4 bg-[#2828FA] rounded-full" src={recordicon} alt="" /> }
              
              {recordingState === "recording" ? "Pause" : "Resume"}
            </button>
            <button onClick={handleStop} className="px-5 py-2 flex items-center gap-2 font-bold bg-[#FED3D4] text-[#FB2126] rounded-xl hover:bg-[#ffc6c8]">
              <img className="size-5" src={stopicon} alt="" /> Stop & Save
            </button>
          </div>
        )}

        <div className="text-center font-medium mt-8 text-gray-400 text-xs">
          <p>Memo will automatically transcribe and summarize your recording when you stop.</p>
        </div>

      </div>
    </div>
  );
};

export default VoiceMemoRecorder;