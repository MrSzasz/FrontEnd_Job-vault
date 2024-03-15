'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const UsersWarning = (): React.ReactElement => {
  const { data: session, status } = useSession()

  console.log({ status })

  return (
    <Popover>
      <PopoverTrigger className="relative mb-4">
        {session === undefined ||
          (session === null && (
            <span className="absolute right-0 top-0 z-10 h-3 w-3 animate-pulse rounded-full bg-red-500"></span>
          ))}
        <Avatar>
          <AvatarImage
            className="bg-white"
            src={
              session !== undefined &&
              session !== null &&
              session.user?.image !== null
                ? session.user?.image
                : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
            }
          />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        {session !== undefined && session !== null ? (
          <div className="flex items-center justify-around gap-2">
            <div className="flex flex-grow-0 items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={
                    session.user?.image !== undefined &&
                    session.user?.image !== null
                      ? session.user?.image
                      : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                  }
                />
                <AvatarFallback>
                  {session?.user?.name !== undefined &&
                  session?.user?.name !== null
                    ? session?.user?.name[0]
                    : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="w-36 truncate text-sm font-medium">
                  {session !== undefined && session !== null
                    ? session.user?.name
                    : 'Loading...'}
                </p>
                <small className="w-36 truncate text-sm text-muted-foreground">
                  {session !== undefined && session !== null
                    ? session.user?.email
                    : 'Loading...'}
                </small>
              </div>
            </div>
            <button
              onClick={() => {
                void signOut()
              }}
              className="grow text-sm font-medium text-red-500"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div>
            <p>
              You are not signed in, your jobs will not be saved on the server,
              please
            </p>
            <button
              onClick={() => {
                void signIn('github')
              }}
              className="font-medium text-blue-500"
            >
              Sign in
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default UsersWarning
