import { Button } from '../ui/button';
import IMG from '../../../../public/no-statement.svg';
import Image from 'next/image';

export const NoResult = ({ tryAgain }: { tryAgain: () => void }) => {
  return (
    <div className="text-center flex flex-col items-center bg-gray-100 rounded-lg p-6">
      <Image src={IMG} alt="" />
      <h2 className="text-2xl font-semibold mb-4">
        Unable to analyse statement.
      </h2>
      <p className="mb-6">
        We couldn&apos;t find any information related to your statement. Try
        typing something else.
      </p>
      <Button onClick={tryAgain}>Retry</Button>
    </div>
  );
};
