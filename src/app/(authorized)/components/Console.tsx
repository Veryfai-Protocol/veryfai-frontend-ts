import { SERVER_STATUS } from '@/app/lib/enums';
import { useWebLLMStore } from '@/app/providers/authorized/webllm-provider';
import { memo, useEffect, useRef } from 'react';

export const Console = memo(() => {
  const { processState, connected, setProcessState } = useWebLLMStore(
    (state) => state
  );
  const dispatch = useRef(setProcessState);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const status = localStorage.getItem('serverStatus');
      const data = status ? JSON.parse(status) : [SERVER_STATUS.NotConnected];
      dispatch.current(data);
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col px-6 py-3 my-6 h-[18.25rem] w-2/3 bg-black rounded-[20px] border border-gray-gray6 border-[6px] text-white">
      <div className="flex justify-between">
        {connected ? (
          <span className="text-green-green1 text-xs">ONLINE</span>
        ) : (
          <span className="text-red-red1 text-xs">OFFLINE</span>
        )}
        <span className="text-white text-xs">Last active: N/A</span>
      </div>
      <div>
        <span className="text-white">
          ------------------------------------------
        </span>
      </div>
      <div className="flex flex-col" id="status">
        {processState.map((item, ind) => (
          <span key={ind} className="text-white text-xs">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
});

Console.displayName = 'Console';
