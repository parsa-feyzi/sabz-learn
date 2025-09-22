import type { JSX } from "react/jsx-dev-runtime"

type T_AboutusBox = { title: string, desc: string, children: JSX.Element }

function AboutusBox({ title, desc, children }: T_AboutusBox) {
  return (
    <div className="flex lg:flex-row flex-col lg:items-stretch items-center lg:gap-0 md:gap-y-9 gap-y-5 bg-neut-prim dark:bg-d-neut-prim lg:py-5 lg:px-6 py-4 px-5 rounded-xl">
        {children}
        <div>
            <div className="lg:text-xl text-lg font-[dana-b] pb-3 lg:text-right text-center">{title}</div>
            <div className="lg:text-base text-sm text-gray-600 dark:text-gray-400 leading-7 lg:text-right text-center">{desc}</div>
        </div>
    </div>
  )
}

export default AboutusBox