function CoverPage({ closeHandler }: {closeHandler: (() => void) | React.Dispatch<React.SetStateAction<any>>}) {
  return (
    <div onClick={closeHandler} className="fixed w-screen h-screen bg-black bg-opacity-50 backdrop-blur top-0 left-0 z-[4]"></div>
  )
}

export default CoverPage