
type QuoteCardType = {
    quote: string;
    summary: string;
    source: string;
    date: string;
}
export const QuoteCard = ({ quote, summary, source, date } : QuoteCardType) => {
  return (
    <div className="w-full mx-auto my-4 bg-white border-b border-b-[#E5E7EB] rounded-lg overflow-hidden">
    <div className="p-4">
      <p className="text-[20px] mb-2 text-[#111827]">"{quote}"</p>
      <p className="text-sm text-gray-600 mb-4 text-[20px]">{summary}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-300 rounded-full mr-2">
            <img src="/src/assets/new-york.svg" alt="" />
          </div>
          <span>{source}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
        </div>
        <button className="flex items-center hover:text-blue-600">
          Check source 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
  )
}
