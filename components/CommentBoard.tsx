import React from 'react'
import { Button } from './ui/button'
import CommentCard from './CommentCard'
import { getTrackData, getTrackComments } from '@/hooks/getTrackData'
import { Skeleton } from './ui/skeleton'
import SpotifyTrackInfo from '@/types'

const arr = [1,2,3,4,5, 6]

export default function CommentBoard() {
  const {data: trackData, isLoading, isError, error, isSuccess, isFetching}  = getTrackData()

  const {data: comments, isLoading: loadingComments, isFetching: fetchingComments} = getTrackComments(trackData)
  // include logic to render messages when there is no song playing

  if (isLoading || loadingComments || isFetching || fetchingComments) {
    return (
      <div className='flex flex-col h-full mt-4 relative'>
        <div className='flex w-full items-center'>
          <h1 className='font-medium text-5xl italic text-foreground/90'>What others are saying</h1>
        </div>
        <div className='grid grid-cols-1 pr-6 gap-y-7 mt-5 overflow-y-auto'>
          {arr.map((index) => (
            <Skeleton key={index} className='flex w-full h-[100px] rounded-lg'/>  
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    console.log(error)
    return <h1>An error occurred</h1>
  }

  return (
    <div className='flex flex-col h-full mt-4 relative'>
      <div className='flex w-full justify-between items-center'>
        <h1 className='font-medium text-5xl italic text-foreground/90'>What others are saying</h1>
        <Button variant="gold" className='w-60 text-lg font-normal'>
          Add a comment +
        </Button>
      </div>

      <div className='h-auto grid grid-cols-1 pr-6 gap-y-7 mt-5 overflow-y-auto'>
        {comments.slice(0,20).map((item: SpotifyTrackInfo, index: number) => (
          <CommentCard key={index} data={item}/>
        ))}
      </div>
    </div>
  )
}
