import React, { useState } from "react";


function Recorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
  };

  const pauseRecording = () => {
    setIsPaused(!isPaused);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    alert("Recording Saved!");
  };

  return (
    <div className="container">
      {!isRecording && (
        <>
          <p className="bg-[#E9E9FF] top">• READY TO RECORD</p>

          <div className="mic-button" onClick={startRecording}>
            🎤
          </div>

          <p className="instruction">Press to Start Recording</p>
        </>
      )}

      {isRecording && (
        <>
          <p className="recording">● RECORDING</p>

          <div className="mic-button">🎤</div>

          <p>Tap pause to pause - Stop to save</p>

          <div className="wave-box">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>

          <div className="buttons">
            <button onClick={pauseRecording}>
              {isPaused ? "Resume" : "Pause"}
            </button>

            <button className="stop" onClick={stopRecording}>
              Stop & Save
            </button>
          </div>
        </>
      )}

      <p className="note">
        Memo will automatically transcribe your recording and generate a
        summary when you stop.
      </p>
    </div>
  );
}

export default Recorder;