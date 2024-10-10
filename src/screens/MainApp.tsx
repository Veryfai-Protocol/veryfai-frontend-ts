import { FactCheckingService } from "@/api/api-service/FactCheck";
import { BetaBanner } from "@/components/beta-banner/beta-banner";
import { Header } from "@/components/nav-menu/Header";
import { ScrollingTags } from "@/components/scrolling-tag/scrolling-tag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { suggestions } from "@/constants/suggestions";
import { useSearchStore } from "@/zustand/search-store";
import { useCallback, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaFilePen } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const mockData = [
  "Taylor Swift's Eras Tour breaks box office records",
  "Electric planes will become mainstream within the next decade",
  "Scientists discover potential 'super-Earth' exoplanet",
  "Humans share 60% of their DNA with bananas",
  "Electric vehicles now outsell gas-powered cars in several countries",
  "Retro fashion from the 90s makes a comeback",
  "They found 1,000 baby oils at P. Diddy's mansion",
  "Elephants are the only animals that can't jump",
  "Arsenal will bottle the league again",
  "A day on Venus is longer than a year on Venus",
  "SpaceX plans to build a hotel in space by 2030",
  "A company is working on a pill that could eliminate the need for sleep",
];

export const MainApp = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //@ts-ignore
  const [animateUp, setAnimateUp] = useState(false);
  const navigate = useNavigate();
  const { inputValue, setInputValue, showVerifierForm, setShowVerifierForm } = useSearchStore();
  // ... (other existing state and functions)

  const handleCloseForm = () => {
    setShowVerifierForm(false);
  };

  const reversedMockData = useMemo(() => [...mockData].reverse(), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(value.trim().length > 0);
  };

  const handleCheck = useCallback(async () => {
    if (inputValue.trim()) {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const response = await FactCheckingService.checkFact(inputValue);
        console.log("Fact check response:", response);
        navigate(`/result-analysis/${encodeURIComponent(response.task_id)}`);
      } catch (error: any) {
        if (error.response) {
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
          setErrorMessage(
            `Error: ${error.response.data.message || "Something went wrong"}`
          );
        } else {
          console.error("Error message:", error.message);
          setErrorMessage("An unknown error occurred. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  }, [inputValue, navigate]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCheck();
    }
  };

  const filteredSuggestions = useMemo(
    () =>
      inputValue.trim()
        ? suggestions.filter((suggestion) =>
            suggestion.toLowerCase().includes(inputValue.toLowerCase())
          )
        : [],
    [inputValue]
  );

  return (
    <div className="flex flex-col items-center justify-center w-full">
       {showVerifierForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Become a Verifier</h2>
            <form>
              <Input
                type="text"
                placeholder="Full Name"
                className="mb-4 w-full"
              />
              <Input
                type="email"
                placeholder="Email"
                className="mb-4 w-full"
              />
              <textarea
                placeholder="Why do you want to become a verifier?"
                className="mb-4 w-full h-32 p-2 border rounded"
              ></textarea>
              <div className="flex justify-end">
                <Button onClick={handleCloseForm} className="mr-2">
                  Cancel
                </Button>
                <Button className="bg-blue-500 text-white">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      )}
      <BetaBanner />
      <div className="bg-gradient-to-r from-[#224B9F] to-[#0C1B39] w-full pt-8 rounded-b-3xl">
        <Header />
        <div className="lg:h-[90%] h-full w-full pb-12 md:px-24 px-4 pt-6 flex flex-col items-center lg:gap-10 gap-8">
          <img
            src="/big-logo.svg"
            alt="logo"
            className={`w-full max-w-[300px] md:max-w-[400px] object-contain ${
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
              <p className="md:text-[24px] text-white">any</p>
              <div className="flex gap-3 bg-[#1E90FF] text-white rounded-lg items-center px-4 py-2">
                <FaFilePen size={20} />
                <p className="md:text-[24px]">statements</p>
              </div>
            </div>
            <p className="md:text-[24px] text-white">for accuracy and truth</p>
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
                  className={`absolute right-4 bg-[#1D1D1E] text-white rounded-full flex items-center gap-2 md:h-[50px] md:w-[123px] w-12 h-12 justify-center hover:bg-[#1D1D1E] transition-all duration-300 ${
                    animateUp ? "translate-y-[-50px] opacity-0" : ""
                  }`}
                  onClick={handleCheck}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <CiSearch size={20} />
                      <span className="hidden md:flex">Check</span>
                    </>
                  )}
                </Button>
              )}
            </div>

            {errorMessage && (
              <div className="text-red-500 text-center mt-4">
                {errorMessage}
              </div>
            )}

            <div
              className={`absolute left-0 right-0 top-full bg-white shadow-2xl rounded-b-xl z-10 overflow-hidden transition-all duration-300 ease-in-out ${
                showSuggestions && filteredSuggestions.length > 0
                  ? "max-h-[300px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {filteredSuggestions.map((suggestion, index) => (
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
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center pt-12 pb-10">
        {" "}
        <div className="flex items-center justify-center w-full space-x-4">
          <div className="h-px w-[40%] bg-gray-300"></div>
           {" "}
          <div className="text-xs text-gray-500 flex items-center space-x-1">
            <span className="text-[#6B7280] lg:text-[20px] text-nowrap text-[15px]">People also searched for</span>
          </div>
          <div className="h-px w-[40%] bg-gray-300"></div>{" "}
        </div>
            {/* Scrolling Tags */}{" "}
        <div className="w-full flex flex-col items-center px-4 lg:px-20 justify-center md:space-y-2 space-y-1">
          <ScrollingTags tags={mockData} direction="left" key="left-scroll" />
          <ScrollingTags
            tags={reversedMockData}
            direction="right"
            key="right-scroll"
          />
        </div>
        {" "}
      </div>
    </div>
  );
};
