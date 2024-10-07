
type VoteType = {
  type: 'supporting' | 'opposing';
  count: number | undefined;
  onClick: () => void;
  active: boolean;
}
export const VoteButton = ({type, count, onClick, active} : VoteType) => {
  const isSupporting = type === 'supporting';

  return (
    <button
      onClick={onClick}
      className={`
        rounded-full border flex items-center justify-center gap-2 
        px-4 py-2 min-w-[130px] h-[40px] transition-colors duration-200
        ${active 
          ? 'border-black text-black' 
          : 'border-[#D1D5DB] text-[#6B7280] hover:border-gray-400 hover:text-gray-700'
        }
      `}
    >
      <img 
        src={isSupporting ? "/upvote.svg" : "/downvote.svg"} 
        alt="" 
        className="w-5 h-5"
      />
      <span className="text-sm flex whitespace-nowrap">
        {isSupporting ? 'Supporting' : 'Opposing'} <span className="hidden lg:flex">({count})</span>
      </span>
    </button>
  );
}
