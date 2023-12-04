import React from 'react'
import prisma from '@/prisma/client'
import { authOptions } from '@/app/auth/authOptions'
import { getServerSession } from 'next-auth'
import { PostType } from '@/app/types/PrismaTypes'
import Post from '@/app/_components/Post'
import GoBackButton from '@/app/_components/GoBackButton'

const BookmarksPage = async() => {

    const session = await getServerSession(authOptions)
    const loggedInUserId = session?.user.id

    const bookmarks = await prisma.bookmark.findMany({
        where: {
            userId: loggedInUserId
        },
        include: {
            post: {
                include: {
                    likes: true,
                    comments: true,
                    bookmarks: true
                }
            }
        }
    })

    let tweetsThatIBookmarked: PostType[] = []
    bookmarks.forEach((bookmark) => {
        tweetsThatIBookmarked.push(bookmark.post)
    })


  return (
    <div className=' w-6/12 border-l border-r border-zinc-700 h-full min-h-screen '>
        <div className="p-2 px-4 border-t border-b border-zinc-700 sticky top-0 backdrop-blur">
        <div className="flex space-x-8 items-center">
          {/* Go Back Button Here */}
          <GoBackButton />
          <div>
            <h1 className="font-bold">Bookmarks</h1>
            <h1 className="text-xs font-thin">{tweetsThatIBookmarked.length} posts</h1>
          </div>
        </div>
      </div>
        {
    tweetsThatIBookmarked?.map((post) => {
      const isLiked = post.likes?.some(item => item.hasOwnProperty('userId') && item.userId === session?.user.id);
      const isBookmarked = post.bookmarks?.some(item => item.hasOwnProperty('userId') && item.userId === session?.user.id);
      return (<Post key={post.id} post={post} isLiked={isLiked} isBookmarked={isBookmarked} />)
      
    })
    }
    </div>
  )
}

export default BookmarksPage