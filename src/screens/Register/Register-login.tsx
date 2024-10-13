import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import "../../App.css";
import LoginBackground from "/login-img.png";
import Spinner from "@/components/loader/loading-spinner";
import { ConnectWallet } from "./component/connect-wallet";
import { StakeNEarn } from "./component/stake-n-earn";
import { LoginConnectWallet } from "../Login/components/login-connect-wallet";

type RegisterLoginProps = {
  closeForm: () => void;
};

export const RegisterLogin: React.FC<RegisterLoginProps> = ({ closeForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [showLoginConnectWallet, setShowLoginConnectWallet] = useState(false);
  const [showStakeNEarn, setShowStakeNEarn] = useState(false);

  const handleRegister = () => {
    setIsLoading(true);
    // Simulating an API call
    setTimeout(() => {
      setIsLoading(false);
      setShowConnectWallet(true);
    }, 2000);
  };

  const handleLogin = () => {
    setIsLoading(true);
    // Simulating an API call
    setTimeout(() => {
      setIsLoading(false);
      setShowLoginConnectWallet(true);
    }, 2000);
  }

  const handleConnectWallet = () => {
    setIsLoading(true);
    // Simulating wallet connection
    setTimeout(() => {
      setIsLoading(false);
      setShowStakeNEarn(true);
    }, 2000);
  };

  if (showStakeNEarn) {
    return <StakeNEarn closeForm={closeForm} />;
  }

  if (showLoginConnectWallet) {
    return <LoginConnectWallet closeForm={closeForm} onConnect={handleConnectWallet} handleRegister={handleRegister} />;
  }

  if (showConnectWallet) {
    return <ConnectWallet closeForm={closeForm} onConnect={handleConnectWallet} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-[6px] rounded-xl max-w-md w-full relative">
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-xl z-10">
            <div className="bg-white rounded-3xl py-6 px-8">
              <Spinner />
            </div>
          </div>
        )}
        <div
          className="bg-white px-6 pt-4 pb-4 rounded-xl shadow-xl"
          style={{
            backgroundImage: `url(${LoginBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex items-center justify-between">
            <LogoSVG />
            <CloseButton onClick={closeForm} />
          </div>

          <div className="flex flex-col items-center gap-4 justify-center mt-36 bg-white rounded-2xl p-4">
            <h1 className="text-3xl font-bold">
              Earn as a <span className="text-[#16974D]">Fact-Checker</span>
            </h1>
            <p className="text-center text-[#6B7280]">
              Join millions of persons around the world and earn by verifying
              statements for accuracy and truth.
            </p>
            <Button
              className="w-[90%] uppercase text-[16px] hover:bg-sky-400 bg-[#1E90FF] px-4 h-[44px] rounded-lg"
              onClick={handleRegister}
              disabled={isLoading}
            >
              Register
            </Button>
            <Button
              className="w-[90%] outline-none border-none shadow-none uppercase text-[16px] hover:bg-transparent bg-transparent text-[#1E90FF] px-4 h-[44px] rounded-lg"
              onClick={handleLogin}
              disabled={isLoading}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// LogoSVG and CloseButton components remain unchanged

const LogoSVG = () => (
  <svg
    width="53"
    height="28"
    viewBox="0 0 53 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50.0616 13.1842C50.0616 20.1898 44.4207 25.8689 37.4624 25.8689C30.5041 25.8689 24.8633 20.1898 24.8633 13.1842C24.8633 6.17865 30.5041 0.499512 37.4624 0.499512C44.4207 0.499512 50.0616 6.17865 50.0616 13.1842ZM27.4764 13.1842C27.4764 18.7368 31.9473 23.238 37.4624 23.238C42.9775 23.238 47.4484 18.7368 47.4484 13.1842C47.4484 7.63166 42.9775 3.13041 37.4624 3.13041C31.9473 3.13041 27.4764 7.63166 27.4764 13.1842Z"
      fill="white"
    />
    <path
      d="M45.8984 23.2329L48.2742 20.8411L51.325 23.9126C51.9811 24.5731 51.9811 25.644 51.325 26.3045C50.669 26.965 49.6053 26.965 48.9493 26.3045L45.8984 23.2329Z"
      fill="white"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M37.8622 8.53322C37.5215 8.24739 37.0266 8.24739 36.6859 8.53322L35.5566 9.48071H33.8618C33.3544 9.48071 32.9431 9.89481 32.9431 10.4056V12.112L32.002 13.249C31.7181 13.5919 31.7181 14.0902 32.002 14.4332L32.9431 15.5702L32.9431 17.2765C32.9431 17.7873 33.3544 18.2015 33.8618 18.2015H35.5566L36.6859 19.1489C37.0266 19.4348 37.5215 19.4348 37.8622 19.1489L38.9915 18.2015H40.6863C41.1937 18.2015 41.605 17.7873 41.605 17.2765V15.5702L42.5461 14.4332C42.83 14.0902 42.83 13.5919 42.5461 13.249L41.605 12.112V10.4056C41.605 9.89481 41.1937 9.48071 40.6863 9.48071H38.9915L37.8622 8.53322ZM39.0915 12.9885C39.3486 12.8537 39.4485 12.5345 39.3146 12.2756C39.1807 12.0167 38.8636 11.9161 38.6065 12.051C37.8569 12.4441 37.2452 13.1965 36.8411 13.7899C36.8061 13.8413 36.7723 13.892 36.7398 13.9418C36.6663 14.0542 36.5993 14.162 36.5389 14.2624C36.4939 14.224 36.4501 14.1886 36.4085 14.1562C36.3952 14.1459 36.3821 14.1358 36.3693 14.1261C36.2563 14.0404 36.1546 13.9729 36.0804 13.9263C36.0431 13.9029 36.0123 13.8845 35.99 13.8714C35.9789 13.8649 35.9697 13.8597 35.963 13.8559L35.9545 13.8512L35.9517 13.8496L35.9506 13.849L35.9498 13.8485C35.695 13.7092 35.3763 13.8042 35.2379 14.0607C35.0995 14.3171 35.194 14.6381 35.4486 14.7774L35.4497 14.778L35.4637 14.7861C35.477 14.7939 35.498 14.8063 35.5247 14.8231C35.5784 14.8569 35.6539 14.907 35.7378 14.9706C35.9129 15.1033 36.0913 15.27 36.1996 15.4435C36.3012 15.6065 36.4829 15.701 36.6739 15.6901C36.8647 15.6792 37.0346 15.5646 37.1174 15.3911L37.1187 15.3884L37.1254 15.3748C37.1316 15.3622 37.1412 15.3428 37.1542 15.3174C37.1801 15.2665 37.2192 15.1916 37.2703 15.0991C37.3727 14.9137 37.5216 14.66 37.707 14.3877C38.0904 13.8249 38.5812 13.2561 39.0915 12.9885Z"
      fill="white"
    />
    <rect
      x="6.80173"
      y="6.8403"
      width="12.5934"
      height="12.6847"
      stroke="white"
      stroke-width="0.845647"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray="6.77 6.77"
    />
    <rect
      x="8.05469"
      y="13.1831"
      width="10.0793"
      height="0.845648"
      rx="0.422824"
      fill="white"
    />
    <path
      d="M25.6983 13.1842C25.6983 20.1898 20.0575 25.8689 13.0991 25.8689C6.14083 25.8689 0.5 20.1898 0.5 13.1842C0.5 6.17865 6.14083 0.499512 13.0991 0.499512C20.0575 0.499512 25.6983 6.17865 25.6983 13.1842ZM3.11315 13.1842C3.11315 18.7368 7.58404 23.238 13.0991 23.238C18.6143 23.238 23.0851 18.7368 23.0851 13.1842C23.0851 7.63166 18.6143 3.13041 13.0991 3.13041C7.58404 3.13041 3.11315 7.63166 3.11315 13.1842Z"
      fill="white"
    />
  </svg>
);

export const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <Button
    onClick={onClick}
    className="bg-transparent hover:bg-transparent shadow-none border-none outline-none"
  >
    <svg
      width="41"
      height="40"
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b_419_1477)">
        <rect
          x="0.0117188"
          width="40"
          height="40"
          rx="20"
          fill="#121212"
          fill-opacity="0.4"
        />
        <path
          d="M12.6278 26.1161C12.1397 26.6042 12.1397 27.3957 12.6278 27.8839C13.116 28.372 13.9075 28.372 14.3956 27.8839L28.3956 13.8839C28.8838 13.3957 28.8838 12.6043 28.3956 12.1161C27.9075 11.628 27.116 11.628 26.6278 12.1161L12.6278 26.1161Z"
          fill="white"
        />
        <path
          d="M14.3956 12.1161C13.9075 11.628 13.116 11.628 12.6278 12.1161C12.1397 12.6043 12.1397 13.3957 12.6278 13.8839L26.6279 27.8839C27.116 28.372 27.9075 28.372 28.3956 27.8839C28.8838 27.3957 28.8838 26.6042 28.3956 26.1161L14.3956 12.1161Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_419_1477"
          x="-3.98828"
          y="-4"
          width="48"
          height="48"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_419_1477"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_419_1477"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  </Button>
);
