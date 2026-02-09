"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";

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
    const [isSupported, setIsSupported] = useState(false);
    const recognitionRef = useRef<any>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
        ) {
            setIsSupported(true);
            const SpeechRecognition =
                (window as any).SpeechRecognition ||
                (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = "es-ES";

            recognitionRef.current.onstart = () => {
                setIsListening(true);
                onDictationStart?.();
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
                onDictationEnd?.();
            };

            recognitionRef.current.onresult = (event: any) => {
                let finalTranscript = "";
                let interimTranscript = "";

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }

                // We only append strictly final results to avoid duplicating text in the textarea
                // logic for a real implementation might be more complex to handle cursor positions,
                // but for now, appending to the end or inserting at cursor is a good start.
                if (finalTranscript && textareaRef.current) {
                    const spaces = textareaRef.current.value.length > 0 && !textareaRef.current.value.endsWith(' ') ? ' ' : '';
                    const newText = spaces + finalTranscript.trim();

                    // Native React setter hack to ensure onChange events fire if needed, 
                    // though direct manipulation is often easier for this specific case
                    const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(
                        window.HTMLTextAreaElement.prototype,
                        "value"
                    )?.set;

                    if (nativeTextAreaValueSetter) {
                        nativeTextAreaValueSetter.call(textareaRef.current, textareaRef.current.value + newText);
                        textareaRef.current.dispatchEvent(new Event('input', { bubbles: true }));
                    }

                    onDictationResult?.(finalTranscript);
                }
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };
        }
    }, [onDictationStart, onDictationEnd, onDictationResult]);

    const toggleDictation = () => {
        if (!isSupported) return;

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
