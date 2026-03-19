import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const VoiceMemoRecorder = () => {
  // ---------------- STATE ----------------
  const [recordingState, setRecordingState] = useState("idle");
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
      setRecordingState("idle");
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md flex flex-col items-center">

        <div className="mb-4 text-sm text-gray-500">
          {recordingState.toUpperCase()}
        </div>

        {/* BUTTON */}
        <button
          onClick={
            recordingState === "idle"
              ? handleStartRecording
              : recordingState === "recording"
              ? handlePause
              : handleResume
          }
          className="w-32 h-32 rounded-full bg-blue-600 text-white text-4xl flex items-center justify-center"
        >
          {recordingState === "recording" ? "⏸" : "🎤"}
        </button>

        {/* TIMER */}
        {(recordingState === "recording" ||
          recordingState === "paused") && (
          <div className="text-2xl font-mono mt-4">
            {formatTime(recordingTime)}
          </div>
        )}

        {/* WAVEFORM */}
        <div className="w-full bg-gray-50 rounded-2xl p-4 my-4">
          <div className="flex gap-1 h-12 items-center justify-center">
            {waveformBars.map((h, i) => (
              <div
                key={i}
                className="w-1.5 bg-blue-500 rounded-full"
                style={{ height: `${Math.max(10, h)}%` }}
              />
            ))}
          </div>
        </div>

        {/* CONTROLS */}
        {recordingState !== "idle" && recordingState !== "processing" && (
          <button
            onClick={handleStop}
            className="px-4 py-2 bg-red-100 text-red-600 rounded"
          >
            Stop
          </button>
        )}

        {/* AUDIO */}
        {audioURL && (
          <>
            <audio controls src={audioURL} className="w-full mt-4" />
            <button
              onClick={handleDownload}
              className="mt-2 w-full bg-blue-600 text-white py-2 rounded"
            >
              Download
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VoiceMemoRecorder;