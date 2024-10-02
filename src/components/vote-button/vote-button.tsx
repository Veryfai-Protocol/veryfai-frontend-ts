
type VoteType = {
  type: 'supporting' | 'opposing';
  count: number;
}
export const VoteButton = ({type, count} : VoteType) => {
  const isSupporting = type === 'supporting';
  return (
    <div className={`
        rounded-full border ${isSupporting ? 'border-black' : 'border-[#D1D5DB]'}
        flex items-center justify-center gap-2 px-4 py-2 min-w-[130px] h-[40px]
      `}>
        <img src={isSupporting ? "/upvote.svg" : "/downvote.svg"} alt="" className="w-5 h-5" />
        <p className={`text-sm whitespace-nowrap ${isSupporting ? 'text-black' : 'text-[#6B7280]'}`}>
          {isSupporting ? 'Supporting' : 'Opposing'} ({count})
        </p>
      </div>
  )
}
