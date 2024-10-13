import { useState } from "react";

type ReadMoreTypes = {
    text: string,
    limit: number,
}

export const ReadMoreText = ({ text, limit } : ReadMoreTypes) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
      setIsExpanded(!isExpanded);
    };
  return (
    <div>
    <div>
      {isExpanded ? text : text.slice(0, limit) + '...'}
      <button
      onClick={toggleReadMore}
      className="text-blue-500 hover:text-blue-700"
    >
      {isExpanded ? 'Read Less' : 'Read More'}
    </button>
    </div>
    
  </div>
  )
}
