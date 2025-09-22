function OutButton({ children, styles, onClick }: { children?: React.ReactNode, styles?: string, onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`${styles} flex gap-1 justify-center text-prim border-2 border-prim p-2 hover:bg-prim/10 btn items-center content-center`}>
        { children }
    </button>
  )
}

export default OutButton