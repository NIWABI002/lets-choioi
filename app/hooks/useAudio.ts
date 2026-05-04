'use client';

import { useState, useRef, useCallback } from 'react';

export type Lang = 'vi-VN' | 'en-US';

export function useTTS() {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = useCallback((text: string, lang: Lang = 'vi-VN') => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85;
    utterance.pitch = 1.0;

    // prefer a native voice for the target language
    const voices = window.speechSynthesis.getVoices();
    const native = voices.find(
      (v) => v.lang.startsWith(lang.split('-')[0]) && !v.localService === false
    ) ?? voices.find((v) => v.lang.startsWith(lang.split('-')[0]));
    if (native) utterance.voice = native;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
  }, []);

  return { isPlaying, speak, stop };
}

export function useRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordingUrl(url);
        stream.getTracks().forEach((t) => t.stop());
        setIsRecording(false);
      };
      mediaRecorderRef.current = mr;
      mr.start();
      setIsRecording(true);
    } catch {
      setIsRecording(false);
    }
  }, []);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
  }, []);

  const playRecording = useCallback(() => {
    if (!recordingUrl) return;
    const audio = new Audio(recordingUrl);
    audio.play();
  }, [recordingUrl]);

  return { isRecording, recordingUrl, startRecording, stopRecording, playRecording };
}
