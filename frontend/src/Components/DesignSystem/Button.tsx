type T_Button = { children?: React.ReactNode, styles?: string, onClick?: () => void, disable?: boolean }

function Button({ children, styles, onClick, disable }: T_Button) {
  return (
    <button disabled={disable} onClick={onClick} className={`${styles} ${disable ? "!opacity-50 active:!scale-100 !cursor-default" : ""} flex gap-1.5 justify-center btn py-2 items-center content-center outline-none text-neut-prim bg-prim hover:bg-prim/80`}>
        {children}
    </button>
  )
}

export default Button