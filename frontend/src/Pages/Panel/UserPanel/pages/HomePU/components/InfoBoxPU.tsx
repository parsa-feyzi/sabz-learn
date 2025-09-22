type T_InfoBoxPU = { title: string, label: string, count: number, img: string }

function InfoBoxPU({ title, label, count, img }: T_InfoBoxPU) {
  return (
    <div className="flex gap-4 sm:justify-center sm:ps-0 ps-2">
        <div><img className="size-11 md:size-12" src={img} /></div>
        <div className="flex flex-col justify-between">
            <div className="flex items-end gap-1">
                <div className="font-[irsans] font-bold">{count}</div>
                <div className="font-[dana-b]">{label}</div>
            </div>
            <div className="font-[dana-xl] text-sm text-gray-800 dark:text-gray-400">{title}</div>
        </div>
    </div>
  )
}

export default InfoBoxPU