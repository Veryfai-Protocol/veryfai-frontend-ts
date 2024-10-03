import { useSearchStore } from "@/zustand/search-store";
import { CiSearch } from "react-icons/ci";
type SearchTagParams = {
    text: string,
}

export const SearchTag = ({text} : SearchTagParams) => {
  const setInputValue = useSearchStore((state : any) => state.setInputValue);
  const sizes = ["px-4 py-2", "px-5 py-2", "px-6 py-2"];
  const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
  
  const handleClick = () => {
    setInputValue(text);
  };
  
    return (
      <div
        className={`flex items-center space-x-2 border border-gray-300 rounded-lg ${randomSize} text-sm text-gray-700 bg-white shadow-sm hover:bg-gray-100 cursor-pointer`}
        onClick={handleClick}
      >
        <CiSearch />
        <span className="text-nowrap">{text}</span>
      </div>
    );
}
