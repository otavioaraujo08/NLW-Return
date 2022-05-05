// Biblioteca para gravar o estado da aplicação
import { useState } from 'react'
// Componentes
import { CloseButton } from '../CloseButton'
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep'
// Imagens 
import bugImageUrl      from '../../assets/bug.png'
import ideaImageUrl     from '../../assets/idea.png'
import thoughtImageUrl  from '../../assets/thought.png'
import { FeedbackContentStep } from './Steps/FeedbackContentStep'
import { FeedbackSucessStep } from './Steps/FeedbackSucessStep'

// Nosso Objetos com os tipos de feddback possíveis
export const feedbackTypes = {
    BUG:   {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inseto'
        }
    },

    IDEA:  {
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'Imagem de uma lampada'
        }
    },

    OTHER: {
        title: 'Outro',
        image: {
            source: thoughtImageUrl,
            alt: 'Imagem de uma nuvem'
        }
    },
}

// Tipando os valores de feedback para que seja possível escolher apenas entre os valores declarados
export type FeedbackType = keyof typeof feedbackTypes

export function Index() {
    // Permitindo apenas os valores dentro de FeedbackType ou nulos
    const [ feedbackType, setFeedbackTypes ] = useState<FeedbackType | null>(null)
    // Redirecionar os usuários para uma tela de feedback
    const [ feedbackSent, setFeedbackSent ] = useState(false);

    function handleRestartFeedback() {
        setFeedbackSent(false)
        setFeedbackTypes(null);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadows-lg w-[calc(100vw-2rem)] md:w-auto">
            { feedbackSent ? (
                <FeedbackSucessStep onFeedbackRestartRequested={handleRestartFeedback}/>
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedbackTypeStep onFeedbackTypeChange={setFeedbackTypes} />
                    ) : (
                        <FeedbackContentStep 
                        feedbackType={feedbackType} 
                        onFeedbackRestartRequested={handleRestartFeedback}
                        // Ao clicar, redirecionar para página de sucesso
                        onFeedbackSent={() => setFeedbackSent(true)}
                        />
                    )}
                </>
            )}

            <footer className="text-xs text-neutral-400">
                Feito com ♥ <a className="underline underline-offset-2" href="https://rocketseat.com.br">pela Rocketseat</a>
            </footer>
        </div>
    );
}