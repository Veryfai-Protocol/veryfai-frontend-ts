import React from 'react';

interface NoStatementsGraphicProps {
  type: 'supporting' | 'opposing';
}

const NoStatementsGraphic: React.FC<NoStatementsGraphicProps> = ({ type }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 lg:mt-6 mt-5 bg-gray-50 rounded-lg">
<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75 mb-4"></div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No {type} statements found</h3>
      <p className="text-gray-500 text-center">
        We couldn't find any {type} statements for this fact check.
        This might change as we gather more information.
      </p>
    </div>
  );
};

export default NoStatementsGraphic;