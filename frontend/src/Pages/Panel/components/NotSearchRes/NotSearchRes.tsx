import NotFoundContentIcon from "../../../../Components/Icons/NotFoundContentIcon";

function NotSearchRes() {
  return (
    <div className="opacity-60 w-full h-full py-4 pb-8 grid place-content-center">
      <div className="flex justify-center sm:mb-11 mb-8">
        <NotFoundContentIcon />
      </div>
      <div className="md:text-xl text-lg font-[dana-b] text-center">
        متاسفانه نتیجه‌ای مطابق با جستجوی شما پیدا نشد
      </div>
    </div>
  );
}

export default NotSearchRes;
