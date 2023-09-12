import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"
import { getTrackData } from "./getTrackData"
import { useUser } from "@/context"

const changeLikeCount = (like: {newLikeCount: number, userID: string | null, commentID: number, action: string}) => {
  return (axios.post('/api/db/updateCommentLikes', like))
}

export const useChangeLikeCount = () => {
  return useMutation(changeLikeCount)
} 
