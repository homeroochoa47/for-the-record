import React from 'react'
import axios, { AxiosError } from 'axios';
import { getTrackComments, getTrackData } from '@/hooks/getTrackData';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';

export default function SongDisplay() {
  
  const {data: trackData, refetch, isFetching, isLoading, isError, error}  = getTrackData()
  

  const {data: comments, isLoading: loadingComments, refetch: commentRefetch, isStale} = getTrackComments(trackData)

  const handleButtonClick = async () => {
    refetch();
    commentRefetch()
  }

  // include logic to render messages when there is no song playing

  if (isLoading || isFetching) {
    return (
      <div className='flex flex-col w-full space-y-1 mt-14 md:mt-10 md:mb-28'>
        <h5 className='text-sm font-light text-foreground/90 italic mb-1'>Currently Viewing</h5>
        <Skeleton className='w-full aspect-square rounded-md'/>
        <Skeleton className='w-3/4 h-[24px] rounded-md'/>
        <Skeleton className='w-1/2 h-[16px] rounded-md'/>
      </div>
    )
  }

  if (isError && (error as AxiosError).response?.status === 404) {
    return (
      <div className='flex flex-col w-full space-y-1 mt-14 md:mt-10 md:mb-28'>
        <Skeleton className='w-full aspect-square rounded-md'/>
        <h3 className='text-xl sm:text-2xl font-semibold text-secondary'><em>No song playing</em> ☹️</h3>
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full mt-14 md:mt-10'>
      <h5 className='text-sm font-light text-foreground/90 italic mb-1'>Currently Viewing</h5>
      <img src={trackData.item.album.images[0].url} alt="album cover" className='w-full rounded-sm border-foreground border-[1.5px] aspect-square object-cover'/>
      <h3 className='text-xl sm:text-2xl font-semibold text-secondary'> {trackData.item.name}</h3>
      
      <h4 className='text-sm sm:text-md font-light text-secondary leading-snug'>
        {trackData.item.artists.slice(0, 2).map(item => item.name).join(', ')}
      </h4>

      <Button onClick={() => handleButtonClick()} size="custom" variant="gold" className='w-full py-2.5 md:py-2 mt-4 md:mt-8 md:mb-10 text-sm md:text-md xl:text-lg font-medium md:font-normal flex items-center'>
          Refresh Song
          <svg xmlns="http://www.w3.org/2000/svg" className='h-[19px] ml-2 mt-[1px]' fill="currentColor" viewBox="0 0 256 256"><path d="M197.67,186.37a8,8,0,0,1,0,11.29C196.58,198.73,170.82,224,128,224c-37.39,0-64.53-22.4-80-39.85V208a8,8,0,0,1-16,0V160a8,8,0,0,1,8-8H88a8,8,0,0,1,0,16H55.44C67.76,183.35,93,208,128,208c36,0,58.14-21.46,58.36-21.68A8,8,0,0,1,197.67,186.37ZM216,40a8,8,0,0,0-8,8V71.85C192.53,54.4,165.39,32,128,32,85.18,32,59.42,57.27,58.34,58.34a8,8,0,0,0,11.3,11.34C69.86,69.46,92,48,128,48c35,0,60.24,24.65,72.56,40H168a8,8,0,0,0,0,16h48a8,8,0,0,0,8-8V48A8,8,0,0,0,216,40Z"></path></svg>
        </Button>
    </div>
  )
}
