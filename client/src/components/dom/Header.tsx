import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const Header = () => {
  const router = useRouter()

  return (
    <div className=' w-full h-fit  flex flex-col justify-center items-center'>
      <div
        onClick={() => router.refresh()}
        className='text-2xl w-full h-fit text-nowrap px-2 pt-1 flex flex-row md:hover:opacity-60 active:opacity-60 active:scale-95 transition-all duration-200 ease-in-out'
      >
        Breezi 1.0
      </div>
      <div className='w-full h-fit flex flex-row gap-1 px-2 pb-2 justify-start items-center'>
        <span className='text-xs '>풍수지리 AI와 방 꾸미기를 쉽고 재미있게</span>
      </div>
    </div>
  )
}
