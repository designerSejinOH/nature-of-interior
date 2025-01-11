import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const Header = () => {
  const router = useRouter()

  return (
    <div className='fixed z-10 top-0 left-0 w-full h-fit flex flex-row justify-between items-start'>
      <div className='flex w-fit h-fit flex-col justify-start items-start pl-4 py-2 cursor-pointer'>
        <div
          onClick={() => router.push('/')}
          className='text-4xl w-fit h-fit text-nowrap flex flex-row gap-1 font-bold md:hover:opacity-60 active:opacity-60 active:scale-95 transition-all duration-200 ease-in-out'
        >
          Breezi 1.0
        </div>
        <div className='w-fit h-fit -mt-1 flex flex-row gap-1 justify-center items-center'>
          <span className='text-lg '>풍수지리 AI와 방 꾸미기를 쉽고 재미있게</span>
        </div>
      </div>
    </div>
  )
}
