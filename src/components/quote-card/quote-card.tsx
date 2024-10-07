
type QuoteCardType = {
  article_url: string;
  reason: string;
  sentence: string;
  source: string;
}
export const QuoteCard = ({ article_url, sentence, source, reason } : QuoteCardType) => {
  return (
    <div className="w-full mx-auto my-4 bg-white border-b border-b-[#E5E7EB] rounded-lg overflow-hidden shadow-sm">
    <div className="p-4 sm:p-6">
      <p className="text-lg sm:text-xl md:text-2xl mb-2 text-[#111827] font-medium">"{sentence}"</p>
      <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4">{reason}</p>
      <div className="flex flex-row items-center justify-between text-xs sm:text-sm text-gray-500">
        <div className="flex items-center flex-shrink-0 overflow-hidden">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full mr-2 flex-shrink-0">
            <img src="/new-york.svg" alt="" className="w-full h-full object-cover" />
          </div>
          <span className="mr-2 truncate">{source}</span>
          <img src="/dot.svg" alt="" className="mx-2 flex-shrink-0" />
          <span className="truncate"></span>
        </div>
        <button className="flex items-center gap-1 hover:text-blue-600 text-xs sm:text-sm ml-2 flex-shrink-0">
          <a href={article_url} target="_blank" className="hidden sm:inline">Check Source</a>
          <a href={article_url} target="_blank" className="sm:hidden">Source</a>
          <img src="/arrow.svg" alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  </div>
  )
}
