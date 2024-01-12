import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Menu(props: {userName: string}) {

  return (
    <div className='flex w-full flex-col items-center h-full md:h-fit md:pb-24'>

      {/* desktop */}
      <div className='hidden md:flex flex-col w-full font-semibold text-4xl text-foreground/80 space-y-8'>
        <Link href="#" className='hover:text-foreground'>Saved Threads</Link>
        {/* <Link href="#" className='hover:text-foreground'>My Boards</Link> */}
        <Link href="#" className='hover:text-foreground'>Comments</Link>
        <Link href="#" className='hover:text-foreground'>Song History</Link>
        <Link href="#" className='hover:text-foreground'>Settings</Link>
      </div>

      <header className="md:hidden absolute top-0 right-0 flex flex-wrap z-50 w-full px-4 bg-transparent text-sm pt-5 md:py-0">
          <div className="flex w-full items-center justify-between">
            <div id="user-avatar" className="flex md:hidden items-center space-x-2">
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
              <p className="text-foreground">{props.userName}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border border-foreground font-medium text-foreground shadow-sm align-middle bg-muted/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 text-sm" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                <svg className="hs-collapse-open:hidden w-4 h-4 text-foreground" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className='mr-3 pr-12 max-w-[200px]'>
                <DropdownMenuItem><Link href="#" className='hover:text-foreground'>Saved Threads</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href="#" className='hover:text-foreground'>Comments</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href="#" className='hover:text-foreground'>Song History</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href="#" className='hover:text-foreground'>Settings</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
      </header>


    </div>

  )
}
