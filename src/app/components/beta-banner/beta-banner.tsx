import React from 'react';

export const BetaBanner: React.FC = () => {
  return (
    <div className="bg-yellow-400 text-black py-2 px-4 text-center fixed top-0 left-0 right-0 z-50 whitespace-nowrap overflow-hidden">
      <div className="inline-block">
        <p className="font-bold inline-block">
          Beta Version: This site is in active development.
        </p>
      </div>
    </div>
  );
};
