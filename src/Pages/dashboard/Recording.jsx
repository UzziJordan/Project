import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * VoiceMemoRecorder Component
 * Purpose: Handles real-time voice recording, transcription, and automatic summary/todo generation.
 */
const VoiceMemoRecorder = () => {

    // --- STATE AND HOOKS ---
    const [recordingState, setRecordingState] = useState('idle');
    const [recordingTime, setRecordingTime] = useState(0);
    const [waveformBars, setWaveformBars] = useState(Array(20).fill(20));
    const [audioURL, setAudioURL] = useState(null);
    const [transcript, setTranscript] = useState('');

    const navigate = useNavigate();

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const streamRef = useRef(null);
    const intervalRef = useRef(null);
    const recognitionRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const animationRef = useRef(null);


    // --- SIDE EFFECTS ---

    // Initialize Speech Recognition on component mount
    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();

            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onresult = (event) => {
                let currentTranscript = '';

                for (let i = 0; i < event.results.length; i++) {
                    currentTranscript += event.results[i][0].transcript + ' ';
                }

                setTranscript(currentTranscript);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
            };

            recognitionRef.current = recognition;
        }
    }, []);


    // Timer control logic
    useEffect(() => {
        if (recordingState === 'recording') {
            intervalRef.current = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [recordingState]);


    // --- LOGIC AND HELPERS ---

    // Start audio visualization
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


    // Generate a simple extractive summary from the transcript
    const generateSummary = (text) => {
        if (!text || text.trim().length === 0)
        return "No transcript available to summarize.";

        const sentences = text
            .split(/[.!?]/)
            .filter((s) => s.trim().length > 10);

        if (sentences.length === 0)
        return "Transcript too short to summarize.";

        if (sentences.length <= 3)
        return sentences.join('. ') + '.';

        const first = sentences[0];
        const middle = sentences[Math.floor(sentences.length / 2)];
        const last = sentences[sentences.length - 1];

        return [first, middle, last]
        .map((s) => s.trim())
        .join('. ') + '.';
    };


    // Extract potential action items from the transcript
    const generateToDos = (text) => {
        if (!text) return [];

        const actionKeywords = [
            'need to',
            'must',
            'should',
            'will',
            'going to',
            'task',
            'todo',
            'action item',
            'remember to',
            "don't forget to"
        ];

        const sentences = text
            .split(/[.!?]/)
            .filter((s) => s.trim().length > 10);

        const todos = sentences
            .filter((s) =>
                actionKeywords.some((key) =>
                    s.toLowerCase().includes(key)
                )
            )
            .map((s) => ({
                task: s.trim(),
                completed: false,
                id: Date.now() + Math.random()
            }));

        if (todos.length === 0 && sentences.length > 0) {
            return sentences.slice(0, 2).map((s) => ({
                task: s.trim(),
                completed: false,
                id: Date.now() + Math.random()
            }));
        }

        return todos;
    };


    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return `${mins.toString().padStart(2, '0')}:${secs
            .toString()
            .padStart(2, '0')}`;
    };


    // --- HANDLERS ---

    const handleStartRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });

            streamRef.current = stream;

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            audioChunksRef.current = [];
            setTranscript('');

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    audioChunksRef.current.push(e.data);
                }
            };

            mediaRecorder.start();

            if (recognitionRef.current) {
                recognitionRef.current.start();
            }

            const audioContext = new AudioContext();
            audioContextRef.current = audioContext;

            const source = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();

            analyser.fftSize = 64;
            analyserRef.current = analyser;

            source.connect(analyser);

            startWaveform();

            setRecordingState('recording');
        } catch (err) {
            console.error('Mic access denied:', err);
        }
    };


    const handlePause = () => {
        mediaRecorderRef.current?.pause();
        recognitionRef.current?.stop();

        cancelAnimationFrame(animationRef.current);

        setRecordingState('paused');
    };


    const handleResume = () => {
        mediaRecorderRef.current?.resume();
        recognitionRef.current?.start();

        startWaveform();

        setRecordingState('recording');
    };


    const handleStop = () => {
        setRecordingState('processing');

        const finalDuration = recordingTime;
        const finalTranscript = transcript;
        const finalSummary = generateSummary(finalTranscript);
        const finalToDos = generateToDos(finalTranscript);

        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(audioChunksRef.current, {
                type: 'audio/webm'
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
                transcript: finalTranscript || "No transcript captured.",
                summary: finalSummary,
                todos: finalToDos
            };

            const existing =
                JSON.parse(localStorage.getItem('recordings')) || [];

            localStorage.setItem(
                'recordings',
                JSON.stringify([newRecording, ...existing])
            );

            localStorage.setItem(
                'latestRecording',
                JSON.stringify(newRecording)
            );
        };

        mediaRecorderRef.current.stop();
        recognitionRef.current?.stop();

        streamRef.current?.getTracks().forEach((track) => track.stop());

        cancelAnimationFrame(animationRef.current);
        clearInterval(intervalRef.current);

        setTimeout(() => {
            setRecordingTime(0);
            setRecordingState('idle');

            navigate('/dashboard/transcript');
        }, 1500);
    };


    const handleDownload = () => {
        if (!audioURL) return;

        const link = document.createElement('a');

        link.href = audioURL;
        link.download = 'voice-memo.webm';

        link.click();
    };


    // --- RENDER HELPERS ---

    const renderStatusBadge = () => {
        switch (recordingState) {
            case 'idle':
            return (
                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    READY TO RECORD
                </div>
            );

            case 'recording':
            return (
                <div className="flex items-center gap-2 text-blue-600 text-sm font-medium bg-blue-50 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                    RECORDING
                </div>
            );

            case 'paused':
            return (
                <div className="flex items-center gap-2 text-red-500 text-sm font-medium bg-red-50 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    PAUSED
                </div>
            );

            case 'processing':
            return (
                <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                    PROCESSING...
                </div>
            );

            default:
            return null;
        }
    };


    const renderMainButton = () => {
        switch (recordingState) {
            case 'idle':
            return (
                <button
                    onClick={handleStartRecording}
                    className="w-32 h-32 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition text-4xl"
                >
                    🎤
                </button>
            );

            case 'recording':
            return (
                <button
                    onClick={handlePause}
                    className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-4xl"
                >
                    ⏸
                </button>
            );

            case 'paused':
            return (
                <button
                    onClick={handleResume}
                    className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center text-4xl"
                >
                    ▶
                </button>
            );

            default:return null;
        }
    };


    const renderControls = () => {
        if (
            recordingState === 'idle' ||
            recordingState === 'processing'
        )
            return null;

        return (
            <div className="flex gap-3 mt-6">
                <button
                    onClick={
                        recordingState === 'recording'
                            ? handlePause
                            : handleResume
                    }
                    className="px-4 py-2 border rounded hover:bg-gray-50 transition"
                >
                    {recordingState === 'recording'
                        ? 'Pause'
                        : 'Resume'}
                </button>

                <button
                    onClick={handleStop}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                >
                    Stop
                </button>
            </div>
        );
    };


    // --- MAIN RENDER ---
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md flex flex-col items-center">

                <div className="mb-6">
                    {renderStatusBadge()}
                </div>

                <div className="mb-4">
                    {renderMainButton()}
                </div>

                {(recordingState === 'recording' || recordingState === 'paused') && (
                    <div className="text-2xl font-mono font-bold mb-2">
                        {formatTime(recordingTime)}
                    </div>
                )}

                {/* Live Transcript Preview */}
                {transcript && (
                    <div className="w-full mt-4 p-3 bg-blue-50 rounded-xl text-sm text-gray-700 max-h-24 overflow-y-auto italic">
                        "{transcript}"
                    </div>
                )}

                {/* WAVEFORM VISUALIZER */}
                <div className="w-full bg-gray-50 rounded-2xl p-4 my-4">
                    <div className="flex items-center justify-center gap-1 h-12">
                        {waveformBars.map((h, i) => (
                            <div
                                key={i}
                                className="w-1.5 bg-blue-500 rounded-full transition-all duration-75"
                                style={{ height: `${Math.max(10, h)}%` }}
                            />
                        ))}
                    </div>
                </div>

                {renderControls()}

                {/* AUDIO PLAYER AND DOWNLOAD */}
                {audioURL && (
                    <div className="mt-4 w-full">
                        <audio
                            controls
                            src={audioURL}
                            className="w-full"
                        />

                        <button
                            onClick={handleDownload}
                            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                            Download Recording
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default VoiceMemoRecorder;