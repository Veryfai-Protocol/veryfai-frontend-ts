import React from 'react';

type HeaderText = {
    topText: string;
    mainText: string;
    subText: string;
}

export const HeaderText = ({topText, mainText, subText} : HeaderText) => {
  return (
    <div className='text-center flex flex-col items-center justify-center space-y-6 md:space-y-8'>
      <div className='flex'>
        <svg
          width="11"
          height="27"
          viewBox="0 0 11 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.5 4.32L0.5 0H10.5L6.5 4.32V22.68L10.5 27H0.5L4.5 22.68V4.32Z"
            fill="#1E8AF2"
          />
        </svg>
        <div className="bg-gradient-to-r from-[#1E8AF20D] flex items-center justify-center to-[#1E8AF21A]">
          <p className="uppercase text-[0.625rem] md:text-base text-blue-600 font-medium">{topText}</p>
        </div>
        <svg
          width="11"
          height="27"
          viewBox="0 0 11 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.5 4.32L0.5 0H10.5L6.5 4.32V22.68L10.5 27H0.5L4.5 22.68V4.32Z"
            fill="#1E8AF2"
          />
        </svg>
      </div>
      <h2 className="text-[1.75rem] md:text-4xl leading-[39.2px] md:leading-[67.2px] capitalize lg:text-5xl font-bold text-gray-900">
        {mainText}
      </h2>
      <p className="text-gray-600 text-[1rem] md:text-base lg:text-lg max-w-2xl mx-auto px-4">
        {subText}
      </p>
    </div>
  );
};
