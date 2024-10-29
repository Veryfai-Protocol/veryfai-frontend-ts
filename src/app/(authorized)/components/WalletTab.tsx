import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';

export const WalletTab = () => {
  return (
    <div className="flex gap-7 w-1/2 justify-end">
      <Link
        href="/"
        className="flex items-center gap-2 border border-gray-gray4 rounded-full px-4 py-3"
      >
        <span className="grid items-center justify-center bg-blue-blue1 rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.64844 4.27034H5.87651C6.0212 3.78819 6.24225 3.33905 6.52564 2.93701H3.64844C2.54386 2.93701 1.64843 3.83245 1.64844 4.93702L1.64846 14.2704C1.64846 15.3749 2.5439 16.2703 3.64846 16.2703H14.3151C15.4197 16.2703 16.3151 15.3749 16.3151 14.2703V7.60368C16.3151 6.49914 15.4197 5.60371 14.3151 5.60371H2.98177V4.93701C2.98177 4.56883 3.28024 4.27034 3.64844 4.27034ZM12.6484 8.93701C13.3848 8.93701 13.9818 9.53394 13.9818 10.2703C13.9818 11.0067 13.3848 11.6037 12.6484 11.6037C11.912 11.6037 11.3151 11.0067 11.3151 10.2703C11.3151 9.53394 11.912 8.93701 12.6484 8.93701Z"
              fill="white"
            />
            <path
              d="M14.047 4.73486C13.6533 3.03637 12.1308 1.77051 10.3126 1.77051C8.49431 1.77051 6.97179 3.03637 6.57812 4.73486H14.047Z"
              fill="white"
            />
          </svg>
        </span>
        <span className="font-medium text-white">0.000</span>
        <span className="font-medium h-4 w-4 bg-white rounded-full text-center grid justify-center items-center">
          <Image src={'/ether.svg'} width={10} height={10} alt="" />
        </span>
      </Link>
      <Link
        href="/"
        className="flex items-center gap-2 border border-gray-gray4 rounded-full px-4 py-3"
      >
        <span className="grid items-center justify-center bg-gray-gray4 rounded-full p-2">
          <Image src={'/stake.svg'} width={16} height={16} alt="withdraw" />
        </span>
        <span className="font-medium text-white">2.500</span>
        <span className="h-4 w-4 bg-white rounded-full text-center grid justify-center items-center">
          <Image src={'/ether.svg'} width={10} height={10} alt="" />
        </span>
      </Link>
      <Separator orientation="vertical" className="h-9 bg-gray-gray4" />
      <Link href="/" className="flex items-center gap-1">
        <span></span>
        <Image src={'/metamask.svg'} width={24} height={24} alt="stake" />
        <span className="text-white">Stake</span>
      </Link>
    </div>
  );
};
