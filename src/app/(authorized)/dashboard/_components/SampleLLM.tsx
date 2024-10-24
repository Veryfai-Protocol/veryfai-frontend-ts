'use client';

import { Button } from '@/app/components/ui/button';
import { registerServiceWorker } from '../../../lib/webllm';
import { useState } from 'react';

export const SampleLLM = () => {
  const [status, setStatus] = useState<string[]>([]);

  const handleClick = async () => {
    setStatus([...status, 'Setting up worker...']);
    registerServiceWorker();
  };

  return (
    <>
      <div>
        <div>
          <Button onClick={handleClick}>Connect</Button>
        </div>
        <div className="grid gap-3 bg-black p-3">
          {status.map((item, ind) => (
            <span className="text-white" key={ind}>
              {item}
            </span>
          ))}
          <label className="text-white" id="init-label">
            {' '}
          </label>
        </div>
      </div>
    </>
  );
};
