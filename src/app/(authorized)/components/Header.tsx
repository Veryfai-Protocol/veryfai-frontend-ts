import { Logo } from '@/app/components/logo/logo';
import { NavTab } from './NavTab';
import { Separator } from '@/components/ui/separator';
import { WalletTab } from './WalletTab';

export const Header = () => {
  return (
    <div className="flex px-14 w-full items-center justify-between bg-gradient-to-r from-blue-blue2 to-blue-blue3 h-[5.66rem]">
      <div className="flex items-center w-1/2 gap-7">
        <Logo />
        <Separator orientation="vertical" className="h-9 bg-gray-gray4" />
        <NavTab />
      </div>
      <WalletTab />
    </div>
  );
};
