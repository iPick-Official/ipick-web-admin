import React from 'react';

export const Loading = () => {
    return (
        <div
            className="flex items-center justify-center min-h-screen transition-colors duration-300 'bg-white text-gray-900">
            {/* Spider-Web Background Container */}
            <div id="spider-web-container" className="spider-web-container"></div>
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-[#375e7e] rounded-full animate-ripple"></div>
                <div className="absolute inset-0 border-4 border-[#375e7e] rounded-full animate-ripple delay-300"></div>
            </div>
            <style>{`
        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 1.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
        </div>
    );
};
