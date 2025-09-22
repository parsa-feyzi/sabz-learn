import type { JSX } from "react/jsx-dev-runtime"

type T_AlertP = { title?: string, children?: JSX.Element; styles?: string }

function AlertP({ title, children, styles }: T_AlertP) {
  return (
    <div className={`${styles} alertP min-w-72 fixed bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 bg-neut-prim-panel dark:bg-d-neut-prim-panel rounded-lg md:py-7 py-5 md:px-10 px-5 z-50`}>
        {title && <div className="pb-5 md:text-lg sm:text-base font-[dana-xl]">{title}</div>}
        <div>
            {children}
        </div>
    </div>
  )
}

export default AlertP