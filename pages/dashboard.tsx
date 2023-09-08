
import CommentBoard from "@/components/CommentBoard"
import Layout from "@/components/Layout"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function Dashboard() {

  return (
    <Layout>
      <CommentBoard/>
    </Layout>
  )
}