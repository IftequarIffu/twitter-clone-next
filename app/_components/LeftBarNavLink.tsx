import React from 'react'
import Link from 'next/link'
import { IconType } from 'react-icons'

const LeftBarNavLink = ({title, Icon, linkTo}: {title: string, Icon: IconType, linkTo?: string}) => {
  return (
    <Link
        href={!linkTo ? (title.toLocaleLowerCase() === "home" ? "/" : `/${title.toLocaleLowerCase()}`) : (linkTo)}
        key={title}
        className="hover:bg-zinc-700 py-2 px-3 rounded-3xl"
        prefetch
    >
        <div className="flex items-center space-x-3">
        <div>
            <Icon size={25} />
        </div>
        <div className="font-light text-lg">{title}</div>
        </div>
    </Link>
  )
}

export default LeftBarNavLink