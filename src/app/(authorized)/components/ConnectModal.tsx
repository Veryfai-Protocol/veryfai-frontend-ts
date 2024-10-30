import { Button } from '@/app/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TriangleAlert } from 'lucide-react';

type Props = {
  onClose: () => void;
  onCancel: () => void;
  onProceed: () => void;
};

export const ConnectModal = ({ onClose, onCancel, onProceed }: Props) => {
  return (
    <div className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60">
      <div
        className="absolute text-theme-gray bg-white rounded-lg top-1/2 
      left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3
       py-6"
      >
        <div className="grid mx-6">
          <div onClick={onClose} className="grid cursor-pointer justify-end">
            <div className="border border-2 rounded-full bg-gray-gray1 h-8 w-8 flex justify-center items-center">
              <span className="text-white font-bold">X</span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-3 mx-6">
            <div className="bg-green-green1 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9987 24.3335C16.7351 24.3335 17.332 24.9304 17.332 25.6668V26.3335H25.332C26.0684 26.3335 26.6654 26.9304 26.6654 27.6668C26.6654 28.4032 26.0684 29.0002 25.332 29.0002H6.66536C5.92899 29.0002 5.33203 28.4032 5.33203 27.6668C5.33203 26.9304 5.92899 26.3335 6.66536 26.3335H14.6654V25.6668C14.6654 24.9304 15.2623 24.3335 15.9987 24.3335Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 15.9998C3 14.7112 4.04467 13.6665 5.33333 13.6665H26.6667C27.9553 13.6665 29 14.7112 29 15.9998V19.9998C29 21.2885 27.9553 22.3332 26.6667 22.3332H5.33333C4.04467 22.3332 3 21.2885 3 19.9998V15.9998ZM7 17.9998C7 17.4476 7.44772 16.9998 8 16.9998H8.01333C8.56561 16.9998 9.01333 17.4476 9.01333 17.9998C9.01333 18.5521 8.56561 18.9998 8.01333 18.9998H8C7.44772 18.9998 7 18.5521 7 17.9998ZM12 16.9998C11.4477 16.9998 11 17.4476 11 17.9998C11 18.5521 11.4477 18.9998 12 18.9998H12.0133C12.5656 18.9998 13.0133 18.5521 13.0133 17.9998C13.0133 17.4476 12.5656 16.9998 12.0133 16.9998H12Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 5.33333C3 4.04467 4.04467 3 5.33333 3H26.6667C27.9553 3 29 4.04467 29 5.33333V9.33333C29 10.622 27.9553 11.6667 26.6667 11.6667H5.33333C4.04467 11.6667 3 10.622 3 9.33333V5.33333ZM7 7.33333C7 6.78105 7.44772 6.33333 8 6.33333H8.01333C8.56561 6.33333 9.01333 6.78105 9.01333 7.33333C9.01333 7.88561 8.56561 8.33333 8.01333 8.33333H8C7.44772 8.33333 7 7.88561 7 7.33333ZM12 6.33333C11.4477 6.33333 11 6.78105 11 7.33333C11 7.88561 11.4477 8.33333 12 8.33333H12.0133C12.5656 8.33333 13.0133 7.88561 13.0133 7.33333C13.0133 6.78105 12.5656 6.33333 12.0133 6.33333H12Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-semibold font-bold">
                Connect to server
              </span>
              <span className="text-xl text-center text-gray-gray1">
                Please ensure that you have a stable internet connection before
                proceeding.
              </span>
            </div>
          </div>
        </div>
        <div className="rounded bg-[#FDF1E5] p-4 my-4 mx-6">
          <h2 className="flex text-[#4A310D] font-semibold text-lg">
            <TriangleAlert fill="#4A310D" className="text-[#FDF1E5]" /> Please
            read before proceeding.
          </h2>
          <div className="grid gap-3">
            <p className="text-[#4A310D]">
              If you experience a disconnection while performing a task, you
              will have a 5-minute grace period to reconnect and continue. If
              you&apos;re unable to reconnect within that time, a deduction will
              be made from your staked tokens.
            </p>
            <p className="text-[#4A310D]">
              You can always go offline by clicking on the green wifi button to
              avoid any penalties.
            </p>
          </div>
        </div>
        <Separator />
        <div className="flex justify-end gap-4 mt-4 mx-6">
          <Button
            onClick={onCancel}
            className="text-lg hover:bg-transparent font-semibold shadow-none bg-transparent border-0 border-transparent border text-blue-blue1"
          >
            CANCEL
          </Button>
          <Button
            onClick={onProceed}
            className="text-lg font-semibold bg-blue-blue1 text-white hover:bg-blue-blue1"
          >
            PROCEED
          </Button>
        </div>
      </div>
    </div>
  );
};
