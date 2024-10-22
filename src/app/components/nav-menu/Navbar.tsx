import { FactSearch } from '@/app/(unauthorized)/components/factSearch';
import { Logo } from '../logo/logo';

export const Navbar = () => {
  return (
    <>
      <div className="grid py-3 w-full z-50 fixed bg-gradient-to-r from-blue-blue2 to-blue-blue3">
        <div className="grid md:flex items-center justify-self-center w-full lg:w-11/12 md:gap-y-12 lg:px-0 px-4">
          <div className="grid md:justify-start justify-center md:w-1/4 w-full">
            <Logo />
          </div>
          <div className="md:w-3/4 w-full">
            <FactSearch />
          </div>
          <div className="md:w-1/4 w-0 hidden md:grid">&nbsp;</div>
        </div>
      </div>
    </>
  );
};
