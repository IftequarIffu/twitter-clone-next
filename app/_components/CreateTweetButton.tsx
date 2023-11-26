import React from 'react'

const CreateTweetButton = ({createTweet}: {createTweet: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void}) => {
  return (
    <div className="flex justify-end px-4 pt-2 pb-6 border-b border-zinc-700">
        <div className="bg-primary px-4 p-2 rounded-3xl hover:bg-opacity-70 hover:cursor-pointer">
          <button onClick={(e) => createTweet(e)}>Tweet</button>
        </div>
      </div>
  )
}

export default CreateTweetButton