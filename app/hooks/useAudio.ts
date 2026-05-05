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

// iOS Safari は audio/webm 非対応なので対応フォーマットを検出する
function getSupportedMimeType(): string {
  const types = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
    'audio/ogg;codecs=opus',
  ];
  for (const type of types) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }
  return ''; // ブラウザデフォルトに任せる
}

export function useRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = getSupportedMimeType();
      const mr = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      chunksRef.current = [];
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        // blob の type は実際に使った mimeType に合わせる
        const blobType = mr.mimeType || mimeType || 'audio/mp4';
        const blob = new Blob(chunksRef.current, { type: blobType });
        // 前の URL を解放してから新しいものをセット
        if (recordingUrl) URL.revokeObjectURL(recordingUrl);
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
  }, [recordingUrl]);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
  }, []);

  const playRecording = useCallback(() => {
    if (!recordingUrl) return;
    // 前の再生を止めてから新しく再生
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const audio = new Audio(recordingUrl);
    audioRef.current = audio;
    audio.play().catch((err) => {
      console.warn('録音再生エラー:', err);
    });
  }, [recordingUrl]);

  return { isRecording, recordingUrl, startRecording, stopRecording, playRecording };
}
