import React from 'react';

export const Spinner: React.FC = () => {
    return (
        <div role="status" className="flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-black border-t-white rounded-full animate-spin"></div>
        </div>
    );
};
