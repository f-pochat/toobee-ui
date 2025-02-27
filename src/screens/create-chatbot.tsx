import {Button} from "@/components/ui/button.tsx";
import {CreateChatbotStepper} from "@/components/create-chatbot/CreateChatbotStepper.tsx";
import {useState} from "react";
import {t} from "i18next";



export const CreateChatbot = () => {
    const [showStepper, setShowStepper] = useState(false)
    const [animateOut, setAnimateOut] = useState(false)

    const handleClick = () => {
        setAnimateOut(true)
        setTimeout(() => {
            setShowStepper(true)
        }, 300)
    }

    return (
        <>
            {
                showStepper ? <CreateChatbotStepper /> :
                    <div className="flex flex-col items-center justify-center h-screen bg-white overflow-hidden">
                        <div
                            className={`flex flex-col items-center transition-transform duration-300 ${animateOut ? "animate-slideUpOut" : ""}`}>
                            <h1 className="text-6xl font-mono text-center overflow-hidden whitespace-nowrap border-r-4 border-black animate-typewriter">
                                {t('welcome.title')}
                            </h1>
                            <div
                                className="mt-8 opacity-0 animate-slideFadeIn"
                                style={{animationDelay: '1s'}}
                            >
                                <Button onClick={handleClick}>
                                    {t('welcome.create-chatbot-button')}
                                </Button>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}