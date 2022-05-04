import { ArrowLeft } from "phosphor-react";
import { FeedbackType, feedbackTypes } from "..";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
}

export function FeedbackContentStep({ feedbackType } : FeedbackContentStepProps) {
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    return (
        <>
            <header>
                <button type="button" className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
                    <ArrowLeft />
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img 
                    src={feedbackTypeInfo.image.source}
                    alt={feedbackTypeInfo.image.alt}
                    className="w-5 h-5"
                    />

                    {feedbackTypeInfo.title}
                </span>
            </header>
        </>
    )
}