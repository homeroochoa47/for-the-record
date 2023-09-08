import { UserButton } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Menu from "./Menu";
import SongDisplay from "./SongDisplay";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode; // Use ReactNode as the type for children
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
    <div id='layout' className='relative bg-[#131013] w-full h-screen flex flex-col md:flex-row md:overflow-hidden'>
      {/* right side desktop */}
      <div id="menu" className="flex flex-col w-full md:w-[25%] p-3 sm:p-4 md:p-6 lg:p-8 bg-[#131013] border-b-4 md:border-none border-foreground/80 pb-6">
        <div id="user-avatar" className="hidden md:flex items-center space-x-2">
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                // rootBox: "w-full",
                card: "bg-muted text-foreground",
                userButtonPopoverActionButtonText: "text-foreground",
                userButtonPopoverActionButtonIcon__manageAccount: "text-foreground",
                userButtonPopoverFooter: "text-foreground",
                userButtonPopoverActionButtonIcon__signOut: "text-foreground"
              },
            }}
          />
          <p className="text-foreground">{data?.spotifyUserID}</p>
        </div>
        <SongDisplay/>
        <Menu userName={data?.spotifyUserID}/>
      </div>

      {/* left side desktop, bottom on mobile */}
      <div className="md:m-4 md:rounded-lg p-3 sm:p-4 md:p-12 xl:m-8 bg-[#131013] md:bg-[#191719] w-full">
        {children}
      </div>
    </div>
  )
}

export default Layout
