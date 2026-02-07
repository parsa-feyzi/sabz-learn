import { Link } from "react-router";
import Logo2 from "../../../../Components/Icons/Logo2";


type T_SubmitTemplate = {
  children: React.JSX.Element;
  title: React.ReactNode;
  question: React.ReactNode;
  link?: string;
  linkTitle?: string;
  isContactForm? : boolean
};

function SubmitTemplate({ children, title, question, link, linkTitle, isContactForm }: T_SubmitTemplate) {
  return (
    <div className="grid place-content-center min-h-screen overflow-auto pb-12 pt-8 w-full px-2 bg-neut-seco text-d-neut-seco dark:text-neut-prim dark:bg-d-neut-seco">
      <div className={`${isContactForm ? "max-w-[450px]" : "max-w-[330px]"} w-[95vw] flex flex-col sm:gap-y-8 gap-y-6  items-center`}>
        <Link to={'/'}>
          <Logo2 styles="w-56 sm:w-64" />
        </Link>
        <div className="w-full rounded-xl bg-neut-prim dark:bg-d-neut-prim  p-6">
          <div>
            <div className="text-xl font-[dana-b] text-center pb-5">
              {title}
            </div>
            <div className="flex gap-1 justify-center text-sm">
              <div>{question}</div>
              <div>
                <Link
                  to={(link as string)}
                  className="text-prim hover:underline font-[dana-b] hover:decoration-prim"
                >
                  {linkTitle}
                </Link>
              </div>
            </div>
          </div>
          <div>{children}</div>
        </div>
        {isContactForm || <div className="text-center leading-7">
          با عضویت در سایت، تمامی قوانین و شرایط استفاده از خدمات{" "}
          <Link
            to={"/"}
            className="text-prim hover:underline hover:decoration-prim"
          >
            بــی‌لـرن
          </Link>
          {" "}را پذیرفته اید.
        </div>}
      </div>
    </div>
  );
}

export default SubmitTemplate;
