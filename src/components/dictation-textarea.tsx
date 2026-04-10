"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Loader2, Mic } from "lucide-react";

interface SpeechRecognitionAlternative {
    transcript: string;
}

interface SpeechRecognitionResult {
    isFinal: boolean;
    0: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
    length: number;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent {
    resultIndex: number;
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionInstance {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onstart: (() => void) | null;
    onend: (() => void) | null;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: { error?: string }) => void) | null;
    start: () => void;
    stop: () => void;
}

interface SpeechRecognitionConstructor {
    new (): SpeechRecognitionInstance;
}

declare global {
    interface Window {
        SpeechRecognition?: SpeechRecognitionConstructor;
        webkitSpeechRecognition?: SpeechRecognitionConstructor;
    }
}

interface DictationTextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: React.ReactNode;
    onDictationStart?: () => void;
    onDictationEnd?: () => void;
    onDictationResult?: (text: string) => void;
}

export function DictationTextarea({
    label,
    className,
    onDictationStart,
    onDictationEnd,
    onDictationResult,
    ...props
}: DictationTextareaProps) {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const isSupported = useSyncExternalStore(
        () => () => undefined,
        () => "SpeechRecognition" in window || "webkitSpeechRecognition" in window,
        () => false
    );

    useEffect(() => {
        if (!isSupported) {
            return;
        }

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "es-ES";

        recognition.onstart = () => {
            setIsListening(true);
            onDictationStart?.();
        };

        recognition.onend = () => {
            setIsListening(false);
            onDictationEnd?.();
        };

        recognition.onresult = (event) => {
            let finalTranscript = "";

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }

            if (!finalTranscript || !textareaRef.current) {
                return;
            }

            const currentValue = textareaRef.current.value;
            const spacer =
                currentValue.length > 0 && !currentValue.endsWith(" ") ? " " : "";
            const appendedText = spacer + finalTranscript.trim();
            const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLTextAreaElement.prototype,
                "value"
            )?.set;

            if (nativeTextAreaValueSetter) {
                nativeTextAreaValueSetter.call(
                    textareaRef.current,
                    currentValue + appendedText
                );
                textareaRef.current.dispatchEvent(
                    new Event("input", { bubbles: true })
                );
            }

            onDictationResult?.(finalTranscript.trim());
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
        };

        recognitionRef.current = recognition;

        return () => {
            recognition.onstart = null;
            recognition.onend = null;
            recognition.onresult = null;
            recognition.onerror = null;
            recognition.stop();
            recognitionRef.current = null;
        };
    }, [isSupported, onDictationEnd, onDictationResult, onDictationStart]);

    const toggleDictation = () => {
        if (!isSupported || !recognitionRef.current) return;

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                {label && (
                    <label className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900">
                        <Mic className="h-4 w-4 text-zinc-400" />
                        {label}
                    </label>
                )}
                {isSupported && (
                    <button
                        type="button"
                        onClick={toggleDictation}
                        className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition active:scale-95 shadow-lg ${isListening
                            ? "bg-red-500 text-white hover:bg-red-600 shadow-red-200 animate-pulse"
                            : "bg-zinc-900 text-white hover:bg-zinc-800 shadow-zinc-200"
                            }`}
                    >
                        {isListening ? (
                            <>
                                <Loader2 className="h-3 w-3 animate-spin" />
                                Escuchando...
                            </>
                        ) : (
                            <>
                                <Mic className="h-3 w-3" />
                                Dictar
                            </>
                        )}
                    </button>
                )}
            </div>
            <textarea
                ref={textareaRef}
                className={`w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none ${className}`}
                {...props}
            />
        </div>
    );
}
