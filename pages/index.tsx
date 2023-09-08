import { Metadata } from "next"
import Link from "next/link"
import { SignInButton, UserButton } from "@clerk/nextjs"
import { SignIn } from "@clerk/clerk-react"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function Home() {
  return (
    <div className="">
      <header>
				<UserButton afterSignOutUrl="/"/>
			</header>

      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-background">
        {/* Left side */}
        <div className="relative hidden h-full flex-col bg-[url(/bg.svg)] p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            For the Record
          </div>
        </div>

        {/* Right side */}
        <div id="sign-in-wrapper" className="mx-auto flex h-full w-full flex-col justify-center space-y-6 sm:w-fit">
          <SignIn 
            redirectUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-muted rounded-md w-full",
                headerTitle: "text-foreground",
                headerSubtitle: "text-foreground",
                socialButtonsBlockButton: "border-primary border bg-background/50 hover:bg-muted/90",
                socialButtonsBlockButtonText: "text-primary",
                footerActionText: "text-primary",
                footerActionLink: "text-foreground underline"
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}