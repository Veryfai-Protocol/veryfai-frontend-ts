import { Logo } from '../logo/logo';

export const Header = () => {
  return (
    <>
      <header className="w-full flex pt-4 items-center z-50">
        <nav
          className={`w-full flex flex-row items-center justify-between p-2 sm:gap-16 gap-4 px-10`}
        >
          {/* Conditional Rendering for Logo Animation */}
          <div className={`transition-all duration-1000 ease-in-out`}>
            <Logo />
          </div>
        </nav>
      </header>
    </>
  );
};
