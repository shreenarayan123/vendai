'use client'
import useSideBar from '@/context/use-sidebar'
import React from 'react'
import MaxMenu from './maximized-menu'
import MiniMenu from './minimized-menu'

type Props = {
  domains:
  | {
      id: string
      name: string
      icon: string
    }[]
  | null
  | undefined
}

const SideBar = ({domains}: Props) => {

    const { expand ,onExpand, onSignOut, page } = useSideBar()
  return (
    <div>
      {expand ? (
        <MaxMenu
        domains={domains}
        onExpand={onExpand}
        onSignOut={onSignOut}
        current={page!}
        />)
        :(
          <MiniMenu
          domains={domains}
          onShrink={onExpand}
          onSignOut={onSignOut}
          current={page!}
          />
        )
      }
    </div>
  )
}

export default SideBar