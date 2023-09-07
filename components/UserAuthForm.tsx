"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/utils/utils"
import { Icons } from "@/components/ui/icons"
import { buttonVariants } from "./ui/button"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthSection({ className, ...props }: UserAuthFormProps) {

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-foreground">
            Sign in with
          </span>
        </div>
      </div>
      <Link href="/login" className={buttonVariants({ variant: "default" })} type="button" onClick={signInWithSpotify}>
          <Icons.spotify className="mr-2 h-[24px] w-[24px]" />
          Spotify
      </Link>
    </div>
  )
}