import { ScrollingTags } from "@/components/scrolling-tag/scrolling-tag";
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
  const [animateUp, setAnimateUp] = useState(false);
  const navigate = useNavigate();

  const reversedMockData = [...mockData].reverse();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(value.trim().length > 0);
  };

  const handleCheck = useCallback(() => {
    if (inputValue.trim()) {
      setAnimateUp(true);
      setTimeout(() => {
        navigate(`/result-analysis/${encodeURIComponent(inputValue)}`);
        window.scrollTo(0, 0);
      }, 200);
    }
  }, [inputValue, navigate]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCheck();
    }
  };

  const suggestions = [
    "Is Donald Trump's hair red?",
    "Is Donald Trump dead?",
    "Is Donald Trump still president?",
    "Is Donald Trump going to jail?",
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full md:px-24 px-4 h-screen">
      <div className="lg:h-[90%] h-full md:mt-24 w-full mt-40 flex flex-col items-center lg:gap-10 gap-8">
        <img
          src="/big-logo.svg"
          alt="logo"
          className={`w-full max-w-[200px] md:max-w-[300px] object-contain ${
            animateUp ? "translate-y-[-50px] opacity-0" : ""
          } transition-all duration-300`}
        />

        <div
          className={`flex flex-col md:flex-row gap-4 items-center ${
            animateUp ? "translate-y-[-50px] opacity-0" : ""
          } transition-all duration-300`}
        >
          <div className="flex gap-4 items-center">
            <div className="flex gap-3 bg-[#16974D] rounded-lg text-white items-center px-4 py-2">
              <FaRegCircleCheck size={20} />
              <p className="md:text-[24px]">Verify</p>
            </div>
            <p className="md:text-[24px]">Your</p>
            <div className="flex gap-3 bg-[#E5E7EB] rounded-lg items-center px-4 py-2">
              <FaFilePen size={20} />
              <p className="md:text-[24px]">statements</p>
            </div>
          </div>
          <p className="md:text-[24px]">for accuracy and truth</p>
        </div>

        <div
          className={`lg:w-[60%] sm:w-[80%] w-[98%] ${
            inputValue.length > 0 ? "shadow-2xl" : ""
          } relative p-2 rounded-t-xl ${
            animateUp ? "bg-transparent shadow-none" : ""
          } transition-all duration-300`}
        >
          <div className="flex items-center">
          <Input
              type="text"
              className={`rounded-full transition-all duration-300 ${
                inputValue.length > 0 ? "bg-white" : "bg-[#F3F4F6]"
              } ${
                animateUp ? "translate-y-[-50px] opacity-0" : ""
              } py-7 pl-6 md:pr-[140px] w-full text-gray-700 focus:outline-none`}
              placeholder="Type your statement here..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            {inputValue.length > 0 && (
              <Button
                className={`absolute right-4 bg-[#1E90FF] text-white rounded-full flex items-center gap-2 md:h-[50px] md:w-[123px] w-12 h-12 justify-center hover:bg-blue-600 transition-all duration-300 ${
                  animateUp ? "translate-y-[-50px] opacity-0" : ""
                }`}
                onClick={handleCheck}
              >
                <CiSearch size={20} />
                <span className="hidden md:flex">Check</span>
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

        <div className="w-full flex flex-col items-center justify-center pb-10">
          <div className="flex items-center justify-center w-full space-x-4">
            <div className="h-px w-[40%] bg-gray-300"></div>
            <div className="text-xs text-gray-500 uppercase flex items-center space-x-1">
              <span>Trending</span>
              <MdOutlineArrowOutward />
            </div>
            <div className="h-px w-[40%] bg-gray-300"></div>
          </div>

          {/* Scrolling Tags */}
          <div className="w-full flex flex-col items-center justify-center md:space-y-2 space-y-1">
            <ScrollingTags tags={mockData} direction="left" />
            <ScrollingTags tags={reversedMockData} direction="right" />
          </div>
        </div>
      </div>
    </div>
  );
};
