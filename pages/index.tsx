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
    <div className="bg-background">
      <header>
				<UserButton afterSignOutUrl="/"/>
			</header>

      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-muted/50">
        
        {/* Left side */}
        <div className="relative hidden h-full flex-col bg-[url(/bg.svg)] p-10 text-foreground border-foreground dark:border-r lg:flex">
          <div className="absolute inset-0" />
            <img src="/for-the-record.svg" className="w-[400px]" alt="for the record logo" />
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