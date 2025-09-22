import { type JSX } from 'react'

function MediaLink({ link, icon }: { link: string, icon: JSX.Element }) {
  return (
    <a className='p-2 sm:size-11 size-9 grid place-content-center rounded-full bg-gray-300 hover:bg-notf text-neut-prim dark:bg-gray-600 dark:hover:bg-notf dark:text-d-neut-prim' href={link}>{icon}</a>
  )
}

export default MediaLink