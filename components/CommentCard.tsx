import React from 'react'

interface CommentCardProps {
  data: {
    commentText: string
    likes: number
    youtubeDisplayName: string
    youtubeUserProfileURL: string
  }
}

export default function CommentCard({data}: CommentCardProps) {
  const {commentText, likes, youtubeDisplayName, youtubeUserProfileURL} = data

  return (
    <div className='flex flex-col justify-between bg-gradient-to-r from-[#191D1F] via-[#191D1F] to-[#122329] rounded-lg px-5 py-3 space-y-2'>
        <div id='user-and-likes' className='flex w-full text-secondary'>
          {/* retrieve profile data from user and save to database, referencing here */}
          <img loading='lazy' className='w-6 h-6 rounded-full mr-2' src={youtubeUserProfileURL} alt="" /> 
          <h5 className='text-md font-medium'>{youtubeDisplayName}</h5>
        </div>
        
        <p id='comment' dangerouslySetInnerHTML={{ __html: commentText }} className='text-foreground/90'></p>

        <div className='inline-flex text-md mr-auto space-x-1 text-secondary'>
          <svg xmlns="http://www.w3.org/2000/svg" className='h-full w-[22px] md:w-auto' fill="currentColor" viewBox="0 0 256 256"><path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z"></path>
          </svg>
          <p className='text-md'>{likes}</p>
        </div>
    </div>
  )
}
