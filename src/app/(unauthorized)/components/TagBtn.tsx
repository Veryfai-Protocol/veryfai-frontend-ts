import Image from 'next/image';
import React from 'react';

type ImageString = {
  imgStr: string;
};

export const TagBtn = ({ imgStr }: ImageString) => {
  return (
    <div>
      <Image
        src={imgStr}
        alt=""
        className=" w-24 sm:w-32 md:w-40 lg:w-[323px]"
        width={200}
        height={200}
      />
    </div>
  );
};
