import type { ReactNode, JSX } from "react"

function CartContainerBox({ title, icon, children }: { title: string, icon: JSX.Element, children: ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden bg-neut-prim dark:bg-d-neut-prim md:mb-8 mb-6">
        <div className="bg-prim dark:bg-prim/60 text-neut-prim flex gap-2 text-xl items-center content-center px-6 py-4">
            <div>{icon}</div>
            <div className="font-[dana-b] translate-y-0.5">{title}</div>
        </div>
        <div className="p-6">{children}</div>
    </div>
  )
}

export default CartContainerBox