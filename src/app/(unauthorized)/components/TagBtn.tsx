import React from 'react'

type ImageString = {
    imgStr: string;
}

export const TagBtn = ({imgStr} : ImageString) => {
  return (
    <div>
        <img src={imgStr} alt="" className=" w-24 sm:w-32 md:w-40 lg:w-[323px]" />
    </div>
  )
}
