import { CiSearch } from "react-icons/ci";
type SearchTagParams = {
    text: string,
    key: number
}

export const SearchTag = ({text, key} : SearchTagParams) => {
    const sizes = ["px-4 py-2", "px-5 py-2", "px-6 py-2"];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
  
    return (
      <div
        key={key}
        className={`flex items-center space-x-2 border border-gray-300 rounded-lg ${randomSize} text-sm text-gray-700 bg-white shadow-sm hover:bg-gray-100 cursor-pointer`}
      >
        <CiSearch />
        <span>{text}</span>
      </div>
    );
}
