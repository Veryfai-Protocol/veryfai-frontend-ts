import { CiSearch } from "react-icons/ci";
import { Logo } from "../logo/logo";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

type InputProp = {
  input: string | undefined;
};

export const Navbar = ({input} : InputProp) => {
  //@ts-ignore
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };


  return (
    <header className="bg-[#1E90FF] w-full flex items-center">
      <nav className="w-full flex flex-col sm:flex-row items-center p-4 sm:gap-16 gap-4 px-10">
        <div className={`transition-all duration-300 ease-in-out sm:opacity-100 sm:translate-y-0`}>
          <Logo />
        </div>
        <div className="w-full">
          <div className="flex justify-start relative w-full md:w-[70%]">
            <Input
              type="text"
              className={`rounded-full bg-[#F3F4F6] py-5 pl-6 pr-10 w-full md:w-[500px] lg:w-[700px] text-gray-700 focus:outline-none`}
              placeholder="Type your statement here"
              value={input}
              onChange={handleInputChange}
            />
            <Button className="bg-[#1E90FF] absolute right-2 top-1/2 transform -translate-y-1/2 text-white rounded-full flex items-center justify-center hover:bg-blue-600">
              <CiSearch className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};