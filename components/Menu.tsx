import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import SongDisplay from './SongDisplay'
import { getTrackComments, getTrackData } from '@/hooks/getTrackData'
import { useQueryClient } from '@tanstack/react-query'

export default function Menu() {
  
  const {data: trackData, refetch, isFetching}  = getTrackData()

  const {data: comments, isLoading: loadingComments, refetch: commentRefetch, isStale} = getTrackComments(trackData)

  const handleButtonClick = async () => {
    refetch();
    commentRefetch()
  }

  return (
    <div className='flex w-full flex-col items-center h-full mt-10 pb-24'>
      <SongDisplay/>
      <Button onClick={() => handleButtonClick()} variant="gold" className='w-full my-8'>
        Refresh Song
      </Button>

      <div className='flex flex-col w-full font-semibold text-4xl text-foreground/80 space-y-8 mt-auto'>
        <Link href="#" className='hover:text-foreground'>Search</Link>
        <Link href="#" className='hover:text-foreground'>My Boards</Link>
        <Link href="#" className='hover:text-foreground'>Comments</Link>
        <Link href="#" className='hover:text-foreground'>Song History</Link>
        <Link href="#" className='hover:text-foreground'>Settings</Link>
      </div>
    </div>
  )
}
