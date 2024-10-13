import React, { useEffect, useState } from "react";

interface NoStatementsGraphicProps {
  type: "supporting" | "opposing";
  support: number | undefined;
  oppose: number | undefined;
}

const NoStatementsGraphic: React.FC<NoStatementsGraphicProps> = ({ type, support, oppose }) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if ((support ?? 0) === 0 || (oppose ?? 0) === 0) {
        setShowMessage(true);
      }
    }, Math.random() * (20000 - 15000) + 15000); // Random delay between 15-20s

    // Cleanup the timer if component unmounts
    return () => clearTimeout(timer);
  }, [support, oppose]);

  if (showMessage) {
    return (
      <div className="flex flex-col items-center justify-center p-8 lg:mt-6 mt-5 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No {type} statements available yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 lg:mt-6 mt-5 bg-gray-50 rounded-lg">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500 border-opacity-75 mb-4"></div>
    </div>
  );
};

export default NoStatementsGraphic;
