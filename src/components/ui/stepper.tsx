import React, { useState } from 'react';

export interface Step {
    id: string;
    name: string;
    icon: React.ReactNode;
    component: (props: { next: () => void; previous: () => void }) => React.ReactNode;
}

interface CustomStepperProps {
    steps: Step[];
    defaultStepId?: string;
    onLastStep?: () => void;
}

export const Stepper: React.FC<CustomStepperProps> = ({ steps, defaultStepId, onLastStep }) => {
    const [activeStep, setActiveStep] = useState(defaultStepId || steps[0].id);
    const currentIndex = steps.findIndex((step) => step.id === activeStep);

    const next = () => {
        if (currentIndex < steps.length - 1) {
            setActiveStep(steps[currentIndex + 1].id);
        } else if (onLastStep) {
            onLastStep();
        }
    };

    const previous = () => {
        if (currentIndex > 0) {
            setActiveStep(steps[currentIndex - 1].id);
        }
    };

    return (
        <div className="flex flex-col h-full w-full">
            {/* Step indicator */}
            <div className="w-full flex items-center justify-center p-6">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                        <div
                            onClick={() => setActiveStep(step.id)}
                            className={`flex flex-col items-center cursor-pointer select-none ${
                                activeStep === step.id ? 'font-bold' : 'font-normal'
                            }`}
                        >
                            <div>{step.icon}</div>
                            <div>{step.name}</div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className="w-16 h-0.5 bg-gray-300 mx-4" />
                        )}
                    </div>
                ))}
            </div>

            {/* Render current step’s component with next and previous functions */}
            <div className="flex-1 p-6">
                {steps[currentIndex].component({ next, previous })}
            </div>
        </div>
    );
};
