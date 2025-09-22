import type { T_CourseBoxInfo } from "../../../../Types/type"

function CourseBoxInfo({ children, title, info, seco, isSessionPage }: T_CourseBoxInfo) {
  return (
    <div className={`flex ${isSessionPage ? "flex-col px-1 gap-3" : "lg:flex-row flex-col xl:px-5 lg:px-3 px-4 gap-4"} py-4 lg:justify-start justify-center items-center rounded-lg ${seco ? 'bg-neut-seco/80 dark:bg-d-neut-ther/70' : 'bg- dark:bg-d-neut-prim bg-neut-prim'}`}>
      <div>
        {children}
      </div>
      <div className={`${isSessionPage ? "justify-center" : "lg:justify-start justify-center"} flex flex-col gap-1`}>
        <div className={`${seco ? "font-[irsans] font-bold" : "font-[dana-b]" } ${isSessionPage ? "text-sm" : "text-base"} line-clamp-1 lg:text-right text-center`}>{title}</div>
        <div className={`${isSessionPage ? "text-xs font-bold text-center" : "text-sm lg:text-right text-center"} line-clamp-1 font-['irsans'] text-gray-600 dark:text-gray-400`}>{info ? info : 'ندارد'}</div>
      </div>
    </div>
  )
}

export default CourseBoxInfo