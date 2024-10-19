import React from 'react';

interface NoStatementsGraphicProps {
  type: 'supporting' | 'opposing';
  count: number | undefined;
}

const NoStatementsGraphic: React.FC<NoStatementsGraphicProps> = ({
  type,
  count,
}) => {
  return (
    <>
      {count === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 lg:mt-6 mt-5 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No {type} statements available yet.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 lg:mt-6 mt-5 bg-gray-50 rounded-lg">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500 border-opacity-75 mb-4"></div>
        </div>
      )}
    </>
  );
};

export default NoStatementsGraphic;
