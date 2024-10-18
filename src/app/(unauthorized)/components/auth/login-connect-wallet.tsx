import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CloseButton } from './closeButton';

type ConnectWalletType = {
  closeForm: () => void;
  onConnect: () => void;
  handleRegister: () => void;
};
export const LoginConnectWallet = ({
  closeForm,
  handleRegister,
}: ConnectWalletType) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white p-2 sm:p-[6px] flex flex-col items-center rounded-3xl w-full max-w-md lg:max-w-lg xl:max-w-xl max-h-[calc(100vh-2rem)]  relative">
        <div className="bg-white px-4 sm:px-6 w-full pt-4 pb-4 rounded-xl shadow-xl">
          <div className="flex items-end justify-end sticky top-2 right-2 z-10">
            <CloseButton onClick={closeForm} />
          </div>
          <div className="flex flex-col items-center border-b pb-4 sm:pb-7 mt-[-30px]">
            <img src="/veryfai-login.svg" alt="" className="w-12 sm:w-16" />
            <h1 className="font-bold text-xl sm:text-2xl lg:text-[28px] font-sans text-center mt-2">
              Login as a <span className="text-[#16974D]">Fact-checker</span>
            </h1>
            <h2 className="text-sm sm:text-base lg:text-[20px] text-center text-[#6B7280] font-sans mt-2">
              Welcome back, let’s get you back in.
            </h2>
          </div>
          <div className="mt-3">
            <h1 className="font-medium text-[#4B5563] pb-3 text-sm sm:text-base">
              Select wallet to login
            </h1>
            <div className="flex flex-col gap-2 sm:gap-[12px] max-h-[40vh] overflow-y-auto scrollbar-hide pr-1"></div>

            <div className="w-full flex items-center justify-center">
              <ConnectButton />
            </div>
            <div className="flex gap-2 items-center justify-center mt-2">
              <p className="text-[20px]">Don't have an account?</p>
              <div
                role="button"
                onClick={handleRegister}
                className="text-[#1E90FF] uppercase"
              >
                Register
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
