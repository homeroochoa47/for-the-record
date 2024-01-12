import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import CommentCard from './CommentCard'
import { getTrackData, getTrackComments } from '@/hooks/getTrackData'
import { Skeleton } from './ui/skeleton'
import { AxiosError } from 'axios'
import { commentCardData } from '@/types'
import { Input } from './ui/input'
import { useUser } from '@/context'
import { useAddComment } from '@/hooks/useAddComment'

const arr = [1,2,3,4,5,6]

export default function CommentBoard() {
  const {userData} = useUser()

  // This funtion posts the comment to the api/db/ route
  const { mutate } = useAddComment()

  // Using react query to fetch data for the track
  const {data: trackData, isLoading: isQueryLoading, isError, error, isFetching} = getTrackData()

  // Fetching Track comments
  const {data: comments, isLoading: loadingComments, isFetching: fetchingComments} = getTrackComments(trackData)

  // states for commenting flow
  const [hasUserCommented, setHasUserCommented] = useState(false)
  const [isCommentInProgress, setIsCommentInProgress] = useState(false)

  //helper for state change
  const changeIsCommentInProgress = () => {
    setIsCommentInProgress(!isCommentInProgress)
  }

  // on user submit
  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const commentForm = e.target as HTMLFormElement;
    const formData = new FormData(commentForm);
    // Access form data by input name attribute
    const commentText = formData.get("comment") as string;
    const spotifyUserID = userData!.spotifyUserID
    const spotifySongID = trackData.spotifyID
    const fullCommentData = {
      commentText, 
      spotifyUserID, 
      spotifySongID,
      likes: 0,
      isYoutubeComment: false,
      youtubeDisplayName: null,
      youtubeUserProfileURL: null
    }

    mutate(
      fullCommentData,
      {
        onSuccess: () => {
          setHasUserCommented(true)
          setIsCommentInProgress(false)
          fullCommentData.youtubeUserProfileURL = userData!.profileImageURL
          comments.unshift(fullCommentData)
        }
      }
    )

    // after a successful request from the mutate query, update the getTrackComments cache to include the new comment in the comments array
    console.log('submitted', { commentText });
  }
  
  
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

  if (isQueryLoading || loadingComments || isFetching || fetchingComments) {
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
        {!isCommentInProgress && !hasUserCommented &&
          <Button onClick={changeIsCommentInProgress} size="custom" variant="gold" className='fixed md:static bottom-4 right-4 py-3 md:py-2.5 px-4 lg:py-2 lg:w-60 text-sm md:text-md  xl:text-lg font-medium md:font-normal drop-shadow-lg'>
            Add a comment +
          </Button>
          }
      </div>

      <div id='comment-list' className='grid grid-cols-1 md:pr-6 gap-y-4 md:gap-y-7 mt-5 overflow-y-scroll'>
        {isCommentInProgress && 
          <form id="comment-form" onSubmit={handleCommentSubmit} className='flex flex-col w-full space-y-2'>
            <div className='flex w-full items-center'>
              <img className='w-8 h-8 rounded-full object-cover' src={userData?.profileImageURL} alt="" />
              <Input name="comment" required placeholder='Add a comment'/>
            </div>

            <div className='flex space-x-2 md: ml-auto'>
              <Button onClick={() => setIsCommentInProgress(false)} size="custom" variant="outline" className='fixed md:static bottom-4 right-4 px-4 py-1.5 lg:w-40 text-sm md:text-md font-medium md:font-normal drop-shadow-lg rounded-2xl'>
                Cancel
              </Button>
              <Button type="submit" size="custom" variant="gold" className='fixed md:static bottom-4 right-4 px-4 py-1.5 lg:w-40 text-sm md:text-md font-medium md:font-normal drop-shadow-lg'>
                Submit
              </Button>
            </div>
          </form>
        }
        {comments.slice(0,20).map((item: commentCardData, index: number) => (
          trackData && <CommentCard key={index} data={item} profileImage={userData?.profileImageURL}/>
        ))}
      </div>
    </div>
  )
}
