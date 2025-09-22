function CoverPageP({ onClick, z }: { onClick?: () => void, z: string }) {
  return (
    <div onClick={onClick} className={`${z} fixed top-0 left-0 w-screen h-screen bg-black/50`}></div>
    // class => backdrop-blur-[2px]
  )
}

export default CoverPageP
