import React from 'react'
import { Button } from './ui/button'
import CommentCard from './CommentCard'
import { getTrackData, getTrackComments } from '@/hooks/getTrackData'
import { Skeleton } from './ui/skeleton'
import { AxiosError } from 'axios'
import { commentCardData } from '@/types'

const arr = [1,2,3,4,5,6]

export default function CommentBoard() {
  const {data: trackData, isLoading, isError, error, isFetching}  = getTrackData() 
  
  const {data: comments, isLoading: loadingComments, isFetching: fetchingComments} = getTrackComments(trackData)

  if (isError && (error as AxiosError).response?.status === 404) {
    return (
      <div>
        <h1 className='font-medium text-3xl md:text-4xl xl:text-5xl italic text-foreground/90'>
          Looks like there's nothing playing
        </h1>
        <p className='text-xl sm:text-2xl font-semibold text-secondary mt-3'> Looks like there's no song playing. Head to spotify and play a song to read some comments!</p>
      </div>
    )
  }

  if (isLoading || loadingComments || isFetching || fetchingComments) {
    return (
      <div className='flex flex-col h-full mt-4 relative'>
        <div className='flex w-full items-center'>
          <h1 className='font-medium text-5xl italic text-foreground/90'>What others are saying</h1>
        </div>
        <div className='grid grid-cols-1 md:pr-6 gap-y-7 mt-5 overflow-y-auto'>
          {arr.map((index) => (
            <Skeleton key={index} className='flex w-full h-[100px] rounded-lg'/>  
          ))}
        </div>
      </div>
    )
  }

  return (
    <div id="board-container" className='md:h-full flex flex-col mt-4 relative'>
      <div className='flex flex-col md:flex-row w-full justify-between md:items-center space-y-4 md:space-y-0'>
        <h1 className='font-medium text-3xl md:text-4xl xl:text-5xl italic text-foreground/90'>What others are saying</h1>
        <Button size="custom" variant="gold" className='fixed md:static bottom-4 right-4 py-3 md:py-2.5 px-4 lg:py-2 lg:w-60 text-sm md:text-md  xl:text-lg font-medium md:font-normal drop-shadow-lg'>
          Add a comment +
        </Button>
      </div>

      <div id='comment-list' className='grid grid-cols-1 md:pr-6 gap-y-4 md:gap-y-7 mt-5 overflow-y-scroll'>
        {comments.slice(0,20).map((item: commentCardData, index: number) => (
          <CommentCard key={index} data={item}/>
        ))}
      </div>
    </div>
  )
}
