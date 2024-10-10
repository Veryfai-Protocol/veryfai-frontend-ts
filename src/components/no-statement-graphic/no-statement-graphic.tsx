import React from "react";

interface NoStatementsGraphicProps {
  type: "supporting" | "opposing";
}
//@ts-ignore
const NoStatementsGraphic: React.FC<NoStatementsGraphicProps> = ({ type }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 lg:mt-6 mt-5 bg-gray-50 rounded-lg">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500 border-opacity-75 mb-4"></div>
    </div>
  );
};

export default NoStatementsGraphic;
