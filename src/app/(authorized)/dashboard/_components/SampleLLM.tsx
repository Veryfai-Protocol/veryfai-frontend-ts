'use client';

import { Button } from '@/app/components/ui/button';
import { registerServiceWorker } from '../../../lib/webllm';
import { useEffect, useState } from 'react';
import { createTask, login } from '@/app/lib/data-fetching/task';
import { authUser, startTimer } from '@/app/lib/utils';

export const SampleLLM = () => {
  const [status, setStatus] = useState<string[]>([]);
  const [task, setTask] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    const getuser = async () => {
      await login();
    };
    getuser();
  }, []);

  const handleClick = async () => {
    setStatus([...status, 'Setting up worker...']);
    await registerServiceWorker();
    if (
      navigator.serviceWorker &&
      (navigator.serviceWorker.controller ||
        (await navigator.serviceWorker.ready).active)
    ) {
      startTimer();
      setDisabled(true);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user_id = authUser()?.user.id;
    console.log(user_id);
    const payload = {
      type: 'string',
      content: task,
      status: 'pending',
      completion_metadata: {},
    };
    setLoading(true);
    const response = await createTask(payload);
    if (response.status <= 201) {
      setMsg('Task sent');
    }
    setLoading(false);
  };

  return (
    <>
      <div>
        <div>
          <Button onClick={handleClick} disabled={disabled}>
            Connect
          </Button>
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
        <div>
          <form>
            <label>Add task</label>
            <input value={task} onChange={(e) => setTask(e.target.value)} />
            <Button onClick={handleSubmit} disabled={loading}>
              Post
            </Button>
          </form>
          <span className="text-green-200">{msg}</span>
        </div>
      </div>
    </>
  );
};
