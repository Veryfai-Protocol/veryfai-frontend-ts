import { SearchTag } from "@/components/search-tags/search-tag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaFilePen } from "react-icons/fa6";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const mockData = [
  "They found 1,000 baby oils at P. Diddy's mansion",
  "Is Donald Trump's hair red?",
  "Is Kamila Harris Nigerian?",
  "Jesus Christ was black",
  "Donald Trump has won the US election",
  "Arsenal will bottle the league again",
];
export const MainApp = () => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setInputValue(value);

    // Show suggestions if input is not empty
    if (value.trim().length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleCheck = useCallback(() => {
    if (inputValue.trim()) {
      navigate(`/result-analysis/${encodeURIComponent(inputValue)}`);
    }
  }, [inputValue, navigate]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCheck();
    }
  };
  // Mock data for suggestions
  const suggestions = [
    "Is Donald Trump's hair red?",
    "Is Donald Trump dead?",
    "Is Donald Trump still president?",
    "Is Donald Trump going to jail?",
  ];
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="lg:h-[90%] h-full md:mt-24 mt-32 flex flex-col items-center lg:gap-10 gap-8">
        <img
          src="/big-logo.svg"
          alt="logo"
          className="w-full max-w-[200px] md:max-w-[300px] object-contain"
        />

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex gap-4 items-center">
            <div className="flex gap-3 bg-[#16974D] rounded-lg text-white items-center px-4 py-2">
              <FaRegCircleCheck size={20} />
              <p className="md:text-[24px]">Verify</p>
            </div>
            <p className="md:text-[24px]">Your</p>
            <div className="flex gap-3 bg-[#E5E7EB] items-center px-4 py-2">
              <FaFilePen size={20} />
              <p className="md:text-[24px]">statements</p>
            </div>
          </div>
          <p className="md:text-[24px]">for accuracy and truth</p>
        </div>

        <div
          className={`lg:w-[60%] sm:w-[80%] w-[90%] ${
            inputValue.length > 0 ? "bg-white shadow-2xl" : ""
          } relative p-2 rounded-t-xl`}
        >
          <div className="flex items-center">
            <Input
              type="text"
              className={`rounded-full transition-all duration-300 ${
                inputValue.length > 0 ? "bg-white" : "bg-[#F3F4F6]"
              } py-7 pl-6 pr-[140px] w-full text-gray-700 focus:outline-none`}
              placeholder="Type your statement here"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            {inputValue.length > 0 && (
              <Button
                className="absolute right-4 bg-[#1E90FF] text-white rounded-full flex items-center gap-2 h-[50px] w-[123px] justify-center hover:bg-blue-600"
                onClick={handleCheck}
              >
                <CiSearch className="w-5 h-5" />
                <span>Check</span>
              </Button>
            )}
          </div>

          <div
            className={`absolute left-0 right-0 top-full bg-white shadow-2xl rounded-b-xl z-10 overflow-hidden transition-all duration-300 ease-in-out ${
              showSuggestions
                ? "max-h-[300px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setInputValue(suggestion);
                  setShowSuggestions(false);
                }}
              >
                <CiSearch className="mr-2 text-gray-500" />
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px w-[40%] bg-gray-300"></div>

            <div className="text-xs text-gray-500 uppercase flex items-center space-x-1">
              <span>Trending</span>
              <MdOutlineArrowOutward />
            </div>

            <div className="h-px w-[40%] bg-gray-300"></div>
          </div>
          <div className="flex flex-wrap gap-4 p-8 items-center justify-center">
            {mockData.map((tag, index) => (
              <SearchTag key={index} text={tag} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
