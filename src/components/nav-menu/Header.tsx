// import { CiSearch } from "react-icons/ci";
import { Logo } from "../logo/logo";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useSearchStore } from "@/zustand/search-store";
// import { useNavigate } from "react-router-dom";
// import { FactCheckingService } from "@/api/api-service/FactCheck";

export const Header = () => {
  const { setShowVerifierForm } = useSearchStore();
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  //@ts-ignore
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setInputValue(value);
//   };

  const handleVerifierClick = () => {
    setShowVerifierForm(true);
  };

//   const handleCheck = useCallback(async () => {
//     if (inputValue.trim()) {
//       setIsLoading(true);
//       setErrorMessage(null);
//       try {
//         const response = await FactCheckingService.checkFact(inputValue);
//         console.log("Fact check response:", response);
//         navigate(`/result-analysis/${encodeURIComponent(response.task_id)}`);
//       } catch (error : any) {
//         if (error.response) {
//           console.error("Error status:", error.response.status);
//           console.error("Error data:", error.response.data);
//           setErrorMessage(`Error: ${error.response.data.message || 'Something went wrong'}`);
//         } else {
//           console.error("Error message:", error.message);
//           setErrorMessage("An unknown error occurred. Please try again.");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   }, [inputValue, navigate]);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       handleCheck();
//     }
//   };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (window.innerWidth <= 640) {
        if (currentScrollY > lastScrollY) {
          setIsLogoVisible(false);
        }

        if (currentScrollY === 0) {
          setIsLogoVisible(true);
        }
      } else {
        setIsLogoVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className="w-full flex items-center z-50">
      <nav
        className={`w-full flex flex-col sm:flex-row items-center justify-between ${
          isLogoVisible ? "p-4" : "p-2"
        } sm:gap-16 gap-4 px-10`}
      >
        {/* Conditional Rendering for Logo Animation */}
        {isLogoVisible && (
          <div
            className={`transition-all duration-1000 ease-in-out ${
              isLogoVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          >
            <Logo />
          </div>
        )}

        <button 
          className="flex text-white items-center gap-2"
          onClick={handleVerifierClick}
        >
          <img src="/person.svg" alt="" />
          <p className="text-[20px]">Become a Verifier</p>
        </button>

        {/* Input Field Animation */}
        {/* <div className={`w-full transition-all duration-1000 ease-in-out`}>
          <div className="flex justify-start relative w-full md:w-[60%]">
            <Input
              type="text"
              className={`rounded-full bg-[#F3F4F6] py-5 pl-6 pr-10 w-full text-gray-700 focus:outline-none`}
              placeholder="Type your statement here"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <Button
              className="bg-[#1E90FF] absolute right-2 top-1/2 transform -translate-y-1/2 text-white rounded-full flex items-center justify-center hover:bg-blue-600"
              onClick={handleCheck}
              disabled={isLoading}
            >
                          {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <CiSearch className="w-5 h-5" />
            )}
            </Button>
          </div>
        </div> */}
      </nav>
    </header>
  );
};
