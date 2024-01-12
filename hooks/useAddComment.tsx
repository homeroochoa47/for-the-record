import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const postCommentToDB = (comment: {commentText: string, spotifyUserID: string, spotifySongID: string}) => {
  return (axios.post('/api/db/addComment', comment))
}

export const useAddComment = () => {
  return useMutation(
    postCommentToDB
  )
} 
