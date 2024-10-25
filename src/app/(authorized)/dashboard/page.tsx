'use client';

import { SampleLLM } from './_components/SampleLLM';

export default function DashBoard() {
  return (
    <div className="grid w-full">
      <div className="flex flex-col w-3/5 bg-gray-gray3 justify-self-center p-6">
        DashBoard
        <SampleLLM />
      </div>
    </div>
  );
}
