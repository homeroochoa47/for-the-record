import { UserButton } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Menu from "./Menu";

const Layout = ({ children }) => {

  const {data, isLoading, isError, error}  = useQuery({
    queryKey: ['profileData'],
    queryFn: async () => {
      const response = await axios.get('/api/spotify/getSpotifyProfile');
      const { spotifyUserID, display_name } = response.data;
      const data = { spotifyUserID, display_name };
      return data
    },
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {(error as Error).message}</span>
  }

  return (
    <div id='layout' className='relative bg-[#131013] w-full h-screen flex overflow-clip'>
      {/* right side desktop */}
      <div id="menu" className="flex flex-col w-[25%] p-8">
        <div id="user-avatar" className="flex items-center space-x-2">
          <UserButton afterSignOutUrl="/"/>
          <p className="text-foreground">{data?.spotifyUserID}</p>
        </div>

        <Menu/>
      </div>

      {/* left side desktop */}
      <div className="m-4 rounded-lg p-12 bg-[#191719] w-full">
        {children}
      </div>
    </div>
  )
}

export default Layout
