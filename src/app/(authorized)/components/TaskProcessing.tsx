'use client';

import { Button } from '@/app/components/ui/button';
import { ConnectModal } from './ConnectModal';
import { useState } from 'react';
import { Wifi } from 'lucide-react';

export const TaskProcessing = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleProceed = () => {
    setConnected(true);
    setShowModal(false);
  };
  return (
    <>
      <div className="flex bg-white rounded-[32px] px-6 gap-6">
        <div className="grid px-6 py-3 my-6 h-[18.25rem] w-2/3 bg-black rounded-[20px] border border-gray-gray6 border-[6px] text-white">
          <div className="flex justify-between">
            <span className="text-red-red1 text-xs">OFFLINE</span>
            <span className="text-white text-xs">Last active: N/A</span>
          </div>
        </div>
        <div className="flex flex-col gap-8 items-center justify-center py-6 border-l w-1/3 border-l-gray-gray3">
          {!connected ? (
            <Button
              onClick={() => setShowModal((showModal) => !showModal)}
              className="rounded-full h-32 w-32 shadow-custom bg-gradient-to-b from-gray-gray1 to-gray-gray7"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="57"
                height="57"
                viewBox="0 0 57 57"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20.9178 33.7508C21.829 32.8396 23.3064 32.8396 24.2176 33.7508L28.4011 37.9342L32.5845 33.7508C33.4957 32.8396 34.9731 32.8396 35.8843 33.7508C36.7955 34.6619 36.7955 36.1394 35.8843 37.0506L31.7009 41.234L35.8843 45.4174C36.7955 46.3286 36.7955 47.8061 35.8843 48.7172C34.9731 49.6284 33.4957 49.6284 32.5845 48.7172L28.4011 44.5338L24.2176 48.7172C23.3064 49.6284 21.829 49.6284 20.9178 48.7172C20.0066 47.8061 20.0066 46.3286 20.9178 45.4174L25.1013 41.234L20.9178 37.0506C20.0066 36.1394 20.0066 34.6619 20.9178 33.7508Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M28.6056 21.4009C34.6484 21.4009 40.4906 24.0627 45.2674 29.1345C46.1511 30.0725 46.107 31.5492 45.1687 32.4326C44.2307 33.3163 42.754 33.2722 41.8706 32.3339C37.8563 28.0723 33.1985 26.0675 28.6056 26.0675C24.0038 26.0675 19.1884 28.0812 14.8856 32.3841C13.9744 33.2953 12.497 33.2953 11.5858 32.3841C10.6745 31.4729 10.6745 29.9955 11.5858 29.0843C16.6163 24.0539 22.5721 21.4009 28.6056 21.4009Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M28.401 7.40088C37.0227 7.40083 45.5228 10.7682 53.2398 17.2845C54.2245 18.1159 54.3486 19.5881 53.5173 20.5727C52.6857 21.5573 51.2136 21.6814 50.2289 20.85C43.2091 14.9223 35.7445 12.0675 28.401 12.0675C21.0578 12.0676 13.5931 14.9224 6.57317 20.8503C5.5886 21.6817 4.11643 21.5575 3.28502 20.573C2.4536 19.5884 2.57776 18.1162 3.56234 17.2848C11.2793 10.7683 19.7795 7.40093 28.401 7.40088Z"
                  fill="white"
                />
              </svg>
            </Button>
          ) : (
            <Button className="rounded-full h-32 w-32 shadow-custom bg-gradient-to-b from-green-green1 to-green-green2">
              <Wifi size={55} />
            </Button>
          )}
          <div className="grid justify-center items-center bg-gray-gray2 rounded py-2 px-6">
            <span className="text-center font-semibold">
              {connected ? 'Connected' : 'Disconnected'}
            </span>
            <span className="text-center">Connect to server</span>
          </div>
        </div>
      </div>
      {showModal && (
        <ConnectModal
          onClose={handleClose}
          onCancel={handleClose}
          onProceed={handleProceed}
        />
      )}
    </>
  );
};
