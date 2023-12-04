import React from 'react'
import { CommentType } from '../types/PrismaTypes'

const Comment = ({ comment }: { comment: CommentType}) => {
  return (
    <div className='p-4 flex items-center space-x-6 border-b border-zinc-700'>
        <div className="">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-teal-800"></div>
        </div>
        <h1>
            {
                comment.body
            }
        </h1>
    </div>
  )
}

export default Comment