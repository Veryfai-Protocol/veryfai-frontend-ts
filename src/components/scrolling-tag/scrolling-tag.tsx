import React, { useRef, useEffect } from 'react';
import { SearchTag } from "@/components/search-tags/search-tag";

interface ScrollingTagsProps {
  tags: string[];
  direction?: 'left' | 'right';
}

export const ScrollingTags: React.FC<ScrollingTagsProps> = ({ tags, direction = 'left' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current) {
        const speed = direction === 'left' ? 1 : -1;
        scrollRef.current.scrollLeft += speed;
        
        if (direction === 'left' && scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        } else if (direction === 'right' && scrollRef.current.scrollLeft <= 0) {
          scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 2;
        }
      }
    };

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div
      className="flex overflow-x-auto gap-4 pt-4 w-full scrollbar-hide"
      ref={scrollRef}
      style={{ whiteSpace: 'nowrap' }}
    >
      <div className={`flex gap-4 ${direction === 'left' ? 'animate-scroll' : 'animate-scroll-reverse'}`}>
        {[...tags, ...tags].map((tag, index) => (
          <SearchTag key={index} text={tag} />
        ))}
      </div>
    </div>
  );
};