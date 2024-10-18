// import { Button } from "../ui/button";

export const NoResult = () => {
  return (
    <div className="text-center flex flex-col items-center bg-gray-100 rounded-lg p-6">
      <img src="/no-statement.svg" alt="" />
      <h2 className="text-2xl font-semibold mb-4">
        Unable to analyse statement.
      </h2>
      <p className="mb-6">
        We couldn't find any information related to your statement. Try typing
        something else.
      </p>
    </div>
  );
};
