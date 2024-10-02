
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
          <div className="w-6 h-6 rounded-full mr-2">
            <img src="/new-york.svg" alt="" />
          </div>
          <span className="text-wrap sm:text-nowrap">{source}</span>
          <img src="/dot.svg" alt="" className="mx-2 sm:mx-4 mt-1" />
          <span>{date}</span>
        </div>
        <button className="flex items-center gap-1 hover:text-blue-600">
          <span className="text-nowrap mt-[-2px]">Check Source</span>
          <img src="/arrow.svg" alt="" />
        </button>
      </div>
    </div>
  </div>
  )
}
