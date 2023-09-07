import React from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { getTrackData } from '@/hooks/getTrackData';
import { Skeleton } from './ui/skeleton';

export default function SongDisplay() {
  
  const {data, isLoading, refetch, isError, error, isFetching}  = getTrackData()

  // include logic to render messages when there is no song playing

  if (isLoading || isFetching) {
    return (
      <div className='flex flex-col w-full space-y-1'>
        <Skeleton className='w-1/2 h-[12px] rounded-lg'/>
        <Skeleton className='w-full aspect-square rounded-lg'/>
        <Skeleton className='w-3/4 h-[20px] rounded-lg'/>
        <Skeleton className='w-1/2 h-[15px] rounded-lg'/>
    </div>
    )
  }

  if (isError) {
    return <h1>An error occurred</h1>
  }

  return (
    <div className='flex flex-col w-full'>
      <h5 className='text-sm font-light text-foreground/90 italic mb-1'>Currently Viewing</h5>
      <img src={data.item.album.images[0].url} alt="album cover" className='w-full rounded-sm border-foreground border-[1.5px] aspect-square object-cover'/>
      <h3 className='text-2xl font-semibold text-secondary'> {data.item.name}</h3>
      
      <h4 className='text-md font-light text-secondary leading-snug'>
        {data.item.artists.slice(0, 2).map(item => item.name).join(', ')}
      </h4>
    </div>
  )
}
