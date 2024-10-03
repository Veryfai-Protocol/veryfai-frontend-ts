import { CiSearch } from "react-icons/ci";
import { Logo } from "../logo/logo";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useCallback, useEffect, useState } from "react";
import { useSearchStore } from "@/zustand/search-store";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { inputValue, setInputValue } = useSearchStore();
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleCheck = useCallback(() => {
    if (inputValue.trim()) {
      setTimeout(() => {
        navigate(`/result-analysis/${encodeURIComponent(inputValue)}`);
        window.location.reload();
      }, 200);
    }
  }, [inputValue, navigate]);

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
    <header className="fixed bg-[#1E90FF] w-full flex items-center z-50">
      <nav
        className={`w-full flex flex-col sm:flex-row items-center ${
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

        {/* Input Field Animation */}
        <div className={`w-full transition-all duration-1000 ease-in-out`}>
          <div className="flex justify-start relative w-full md:w-[70%]">
            <Input
              type="text"
              className={`rounded-full bg-[#F3F4F6] py-5 pl-6 pr-10 w-full md:w-[500px] lg:w-[700px] text-gray-700 focus:outline-none`}
              placeholder="Type your statement here"
              value={inputValue}
              onChange={handleInputChange}
            />
            <Button
              className="bg-[#1E90FF] absolute right-2 top-1/2 transform -translate-y-1/2 text-white rounded-full flex items-center justify-center hover:bg-blue-600"
              onClick={handleCheck}
            >
              <CiSearch className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};
