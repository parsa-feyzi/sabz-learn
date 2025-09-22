import WrapperLoader from "../DesignSystem/WrapperLoader/WrapperLoader";

function Loading() {
  return (
    <div className="fixed w-screen h-screen bg-neut-prim dark:bg-d-neut-prim grid place-content-center">
      <WrapperLoader />
    </div>
  );
}

export default Loading;
