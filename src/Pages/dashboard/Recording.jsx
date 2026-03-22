import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import pauseicon from '../../Images/frrpause.svg'
import recordicon from '../../Images/frmicrophone.svg'
import stopicon from '../../Images/frrstop.svg'

const VoiceMemoRecorder = () => {
  // ---------------- STATE ----------------
  const [recordingState, setRecordingState] = useState("READY TO RECORD");
  const [recordingTime, setRecordingTime] = useState(0);
  const [waveformBars, setWaveformBars] = useState(Array(20).fill(20));
  const [audioURL, setAudioURL] = useState(null);
  const [transcript, setTranscript] = useState("");

  const navigate = useNavigate();

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

  // ---------------- SPEECH RECOGNITION ----------------
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

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

  // ---------------- TIMER ----------------
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

  // ---------------- WAVEFORM ----------------
  const startWaveform = () => {
    const analyser = analyserRef.current;
    if (!analyser) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const animate = () => {
      analyser.getByteFrequencyData(dataArray);

      const bars = Array.from(dataArray)
        .slice(0, 20)
        .map((v) => (v / 255) * 100);

      setWaveformBars(bars);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  // ---------------- HELPERS ----------------
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // ---------------- START ----------------
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      const mimeType = MediaRecorder.isTypeSupported("audio/mp4")
        ? "audio/mp4"
        : "audio/webm";

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];
      setTranscript("");

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.start();
      recognitionRef.current?.start();

      // iPhone fix
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();

      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 64;
      analyserRef.current = analyser;

      source.connect(analyser);
      startWaveform();

      setRecordingState("recording");
    } catch (err) {
      console.error(err);
      alert("Microphone access is required");
    }
  };

  // ---------------- PAUSE ----------------
  const handlePause = () => {
    mediaRecorderRef.current?.pause();
    recognitionRef.current?.stop();
    cancelAnimationFrame(animationRef.current);
    setRecordingState("paused");
  };

  // ---------------- RESUME ----------------
  const handleResume = () => {
    mediaRecorderRef.current?.resume();
    recognitionRef.current?.start();
    startWaveform();
    setRecordingState("recording");
  };

  // ---------------- STOP ----------------
  const handleStop = () => {
    setRecordingState("processing");

    const finalDuration = recordingTime;

    mediaRecorderRef.current.onstop = () => {
      const mimeType = MediaRecorder.isTypeSupported("audio/mp4")
        ? "audio/mp4"
        : "audio/webm";

      const blob = new Blob(audioChunksRef.current, {
        type: mimeType,
      });

      const url = URL.createObjectURL(blob);
      setAudioURL(url);

      const newRecording = {
        id: Date.now(),
        title: `Recording ${new Date().toLocaleTimeString()}`,
        date: new Date().toLocaleDateString(),
        duration: finalDuration,
        audioURL: url,
        tag: "Meeting",
        transcript: transcript || "No transcript",
        summary: transcript.slice(0, 120) + "...",
      };

      const existing =
        JSON.parse(localStorage.getItem("recordings")) || [];

      localStorage.setItem(
        "recordings",
        JSON.stringify([newRecording, ...existing])
      );

      localStorage.setItem(
        "latestRecording",
        JSON.stringify(newRecording)
      );
    };

    mediaRecorderRef.current.stop();
    recognitionRef.current?.stop();

    streamRef.current?.getTracks().forEach((t) => t.stop());

    cancelAnimationFrame(animationRef.current);
    clearInterval(intervalRef.current);

    setTimeout(() => {
      setRecordingTime(0);
      setRecordingState("READY TO RECORD");
      navigate("/dashboard/transcript");
    }, 1500);
  };

  // ---------------- DOWNLOAD ----------------
  const handleDownload = () => {
    if (!audioURL) return;

    const link = document.createElement("a");
    link.href = audioURL;
    link.download = "voice-memo.mp4";
    link.click();
  };

  // ---------------- UI ----------------
  return (
    <div className="flex items-center justify-center mt-5">
      <div className="p-10 w-full max-w-md flex flex-col items-center">

      <div
        className={`mb-4 text-[18px] font-semibold flex items-center gap-2 rounded-4xl px-4 py-2
          ${
            recordingState === "recording"
              ? "bg-[#D4D4FE] text-[#4C4CFB]"
              : recordingState === "paused"
              ? "bg-[#FED3D4] text-[#FC464A]"
              : recordingState === "processing"
              ? "bg-[#D4D4FE] text-[#4C4CFB]"
              : "bg-[#E9E9FF] text-[#808080]"
          }
        `}
      >
        <div
          className={`h-3 w-3 rounded-full ${
            recordingState === "recording"
              ? "bg-[#4C4CFB]"
              : recordingState === "paused"
              ? "bg-[#FC464A]"
              : recordingState === "processing"
              ? "bg-[#1D8D2E]"
              : "bg-[#808080]"
          }`}
        ></div>

        {recordingState.toUpperCase()}
      </div>        
      
      {/* BUTTON */}
      
        <button
          onClick={handleStartRecording}
          disabled={recordingState !== "READY TO RECORD"}
          className="w-40 h-40 mt-10 flex items-center justify-center"
        >
          <img
            src={recordingState === "paused" ? pauseicon : recordicon}
            alt="recorder button"
            className={`rounded-full p-14.5 border-8 ${
            recordingState === "paused"
              ? "bg-[#FB2126] text-[#FC464A]"
              : "bg-[#2828FA] text-[#4C4CFB]"
          }`}
          />
        </button>

        <div className="mt-10 text-sm text-[#555555] font-semibold text-[16px] text-center">
          <p>
            {recordingState === "READY TO RECORD" &&
              "Press to Start Recording"}

            {recordingState === "recording" &&
              "Tap pause to pause · Stop to save"}

            {recordingState === "paused" &&
              "Tap resume to resume · Stop to save"}

            {recordingState === "processing" &&
              "Transcribing and summarizing your recording..."}
          </p>
        </div>

        {/* TIMER */}
        {(recordingState === "recording" ||
          recordingState === "paused") && (
          <div className="text-2xl mt-4 mb-0">
            {formatTime(recordingTime)}
          </div>
        )}

        {/* WAVEFORM */}
        <div className="w-full bg-[#FFFFFF] rounded-2xl p-4 mt-5">
          <div className="flex gap-1 h-12 items-center justify-center">
            {waveformBars.map((h, i) => (
              <div
                key={i}
                className="w-1.5 bg-[#B8B8FD] rounded-full"
                style={{ height: `${Math.max(10, h)}%` }}
              />
            ))}
          </div>
        </div>

        {/* CONTROLS */}
        {recordingState !== "READY TO RECORD" && recordingState !== "processing" && (
          <div className="flex gap-3 mt-5">

            {/* PAUSE / RESUME */}
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

            {/* STOP */}
            <button
              onClick={handleStop}
              className="px-5 py-2 text-[16px] flex items-center gap-2 font-semibold bg-[#FED3D4] text-[#FB2126] rounded-xl"
            >
              <img className="p-1 size-6" src={stopicon} alt="" />
              Stop & Save
            </button>
              
          </div>
          
        )}

          <div className="text-center font-semibold mt-5 text-[#808080] text-[13px] ">
            <p>Memo will automatically transcribe your recording
              and generate a summary when you stop.
            </p>
          </div>

      </div>
    </div>
  );
};

export default VoiceMemoRecorder;