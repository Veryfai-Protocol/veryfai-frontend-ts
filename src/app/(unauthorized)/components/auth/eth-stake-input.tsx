import { useState, useEffect, Dispatch, SetStateAction} from 'react';
import { Input } from "@/components/ui/input";

const ETH_TO_USD_RATE = 2700; // Example rate, you might want to fetch this dynamically
const MINIMUM_STAKE = 0.37;

type EthStakeType = {
    setStakeInputValue: Dispatch<SetStateAction<string | undefined>>
}

export const EthStakeInput = ({setStakeInputValue} : EthStakeType) => {
  const [inputValue, setInputValue] = useState('');
  const [usdValue, setUsdValue] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (inputValue === '') {
      setUsdValue(0);
      setError(false);
      return;
    }

    const ethValue = parseFloat(inputValue);
    if (isNaN(ethValue)) {
      setUsdValue(0);
      setError(false);
      return;
    }

    const calculatedUsd = ethValue * ETH_TO_USD_RATE;
    setUsdValue(calculatedUsd);
    setError(ethValue < MINIMUM_STAKE);
  }, [inputValue]);

  const handleInputChange = (e : any) => {
      setInputValue(e.target.value);
      setStakeInputValue(e.target.value);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <img src="/etherium.svg" alt="" />
        </div>
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={`pl-10 pr-16 text-[16px] text-[#121212] font-medium h-[60px] rounded-[16px] bg-[#F3F4F6] ${error ? 'border-[#E56363] outline-none focus-visible:ring-0' : ''}`}
          placeholder="0.00"
        />
        <div className="absolute inset-y-0 w-[80px] h-[37px] mt-3 mr-4 right-0 bg-[#E0EFFE] rounded-[8px] flex items-center justify-center pointer-events-none">
          <span className="text-[#1E90FF] sm:text-sm">max</span>
        </div>
      </div>
      {inputValue !== '' && (
        <div className="mt-1 text-[16px] text-[#121212] font-medium">
          {inputValue} ETH ≈ {usdValue.toFixed(2)} USD
        </div>
      )}
      <div className={`mt-2 text-[16px] text-gray-500`}>
        {error
          ? "Your stake is less than 0.37 ETH"
          : `Minimum stake = 0.37 ETH ≈ 1,000 USD`}
      </div>
    </div>
  );
};