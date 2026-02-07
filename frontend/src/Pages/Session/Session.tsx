import { useEffect, useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
  
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import { Link, useNavigate, useParams } from "react-router";
import type {
  T_SessionData,
  T_SingleCourseData,
  T_TargetSessionData,
} from "../../Types/type";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
// import "plyr-react/dist/plyr.css";
import ContainerContentBox from "../../Components/ContainerContentBox/ContainerContentBox";
import Loading from "../../Components/Loading/Loading";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import CourseBoxInfo from "../Courses/components/DetailsBoxes/DetailsBox";
import InfoIcon from "../../Components/Icons/InfoIcon";
import VideoIcon from "../../Components/Icons/VideoIcon";
import ClockIcon from "../../Components/Icons/ClockIcon";
import TeacherProfile from "../../Components/TeacherProfileBox/TeacherProfileBox";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import type { I_AuthInfos } from "../../Types/interface";
import { useSelector } from "react-redux";
import OutButton from "../../Components/DesignSystem/OutButton";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import { courseTimeProcessing } from "../../Founctions/CourseTimeProcessing";

function Session() {
  const [sessionDatas, setSessionDatas] = useState<T_TargetSessionData | null>(
    null
  );

  const [sessionsDatas, setSessionsDatas] = useState<T_SessionData[] | null>(
    null
  );

  const [courseDatas, setCourseDatas] = useState<T_SingleCourseData | null>(
    null
  );

  const [questionVal, setQuestionVal] = useState("");

  const authInfos = useSelector(
    (state: { authInfos: { values: I_AuthInfos } }) => state.authInfos.values
  );

  const navigate = useNavigate();

  const { courseName, sessionId } = useParams();

  const userToken = JSON.parse(localStorage.getItem("user") as string)
    ? JSON.parse(localStorage.getItem("user") as string).token
    : null;

  // Functions
  const getSessionHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/v1/courses/${courseName}/${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const sessionData = await response.json();
      console.log(sessionData);
      response.ok ? setSessionDatas(sessionData.session) : navigate("/");
      setSessionsDatas(sessionData.sessions);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const getCourseHandler = async () => {
    try {
      const course = await (
        await fetch(`http://localhost:4000/v1/courses/${courseName}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
      ).json();
      setCourseDatas(course);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const sendCommentHandler = () => {
    if (questionVal) {
      setQuestionVal("");
    }
  };

  const videoSrc = {
    type: "video",
    poster: `http://localhost:4000/courses/covers/${courseDatas?.cover}`,
    sources: [
      {
        src: `http://localhost:4000/courses/covers/${sessionDatas?.video}`,
        type: "video/mp4",
        size: 1080,
      },
    ],
  };

  useEffect(() => {
    getCourseHandler();
    getSessionHandler();
  }, [sessionId]);

  return (
    <>
      {courseDatas ? (
        <>
          <Topbar />
          <div>
            <Navbar />
            <div className="container_ py-10 duration-200">
              <Breadcrumb
                routes={[
                  { title: <HomeOutlined />, href: "/", id: 1 },
                  {
                    title: "دوره ها",
                    href: "/category-courses/courses",
                    id: 2,
                  },
                  {
                    title: courseDatas?.categoryID?.title,
                    href: `/category-courses/${courseDatas?.categoryID?.name}`,
                    id: 3,
                  },
                  {
                    title: courseDatas?.name,
                    href: `/course-info/${courseName}`,
                    id: 4,
                  },
                ]}
              />
              <div className="mb-2 mt-10 w-full aspect-video max-h-screen">
                <Plyr
                  options={{
                    controls: [
                      "play-large",
                      "play",
                      "rewind",
                      "fast-forward",
                      "progress",
                      "current-time",
                      "mute",
                      "volume",
                      "poster",
                      "settings",
                      "pip",
                      "fullscreen",
                    ],
                    previewThumbnails: { enabled: false, src: "" },
                  }}
                  source={videoSrc as any}
                />
              </div>
              <div className="flex gap-6 lg:flex-row flex-col">
                <div className="lg:w-8/12">
                  <ContainerContentBox
                    title={courseDatas?.name}
                    color="#0ea5e9"
                  >
                    <>
                      <div className="pb-5 mb-5 lbb flex gap-2 items-center">
                        <div className="font-[irsans] text-sm text-notf py-1 px-2 bg-notf/10 rounded-sm">
                          {(sessionsDatas?.findIndex(
                            (session) => session._id === sessionId
                          ) as number) + 1}
                        </div>
                        <div>{sessionDatas?.title}</div>
                      </div>
                      <div className="flex sm:flex-row flex-col gap-3 justify-between">
                        <div>
                          <a
                            href="#quistion_&_answer"
                            className="btn-session !text-d-neut-seco dark:!text-neut-seco active:!scale-100"
                          >
                            سوال دارم!
                          </a>
                        </div>
                        <div className="flex sm:flex-row flex-col gap-3">
                          <a
                            href="#"
                            className="btn-session !bg-amber-500 hover:!bg-amber-600"
                          >
                            دانلود پیوست
                          </a>
                          <a
                            href="#"
                            className="btn-session !bg-green-600 hover:!bg-green-700"
                          >
                            دانلود ویدیو
                          </a>
                        </div>
                      </div>
                    </>
                  </ContainerContentBox>
                  <div id="quistion_&_answer">
                    <ContainerContentBox
                      title="پرسش و پاسخ"
                      color="#dc2626"
                      icon={<TextsmsRoundedIcon fontSize="large" />}
                    >
                      <div>
                        <div className="mb-8 pb-8 lbb">
                          <h5 className="font-[dana-b] text-[15px] mb-3">
                            چگونه سوال خود را مطرح کنم تا به بهترین پاسخ ممکن
                            برسم؟
                          </h5>
                          <div className="text-sm leading-6 dark:text-gray-400">
                            برای اینکه مهارت حل مسئله و دیباگ کردن‌تون رو بالا
                            ببرید، قبل از اینکه سوالی بپرسید، با دقت و تمرکز سعی
                            کنید مشکل رو خودتون حل کنید. اگه به جواب نرسیدید،
                            می‌تونید از گوگل کمک بگیرید. اگه با خطایی مواجه شدید
                            یا نیاز به نمونه‌ای داشتید، با استفاده از کلمات
                            کلیدی مختلف توی گوگل سرچ کنید و از سایت‌هایی مثل
                            Stack Overflow کمک بگیرید. (جواب 99٪ سوالات با این
                            روش زیر 5 دقیقه پیدا میشه)
                            <br />
                            از پرسیدن سوالات کلی مثل «من مثل شما انجام دادم ولی
                            کار نکرد» یا «کد من مشکل داره و اجرا نمیشه» که
                            جزئیات ندارن، خودداری کنید. وقتی سوال می‌پرسید،
                            لطفاً اون رو با مستندات و به صورت شفاف و واضح بیان
                            کنید تا قابل تحلیل و بررسی باشه. سعی کنید سوالاتتون
                            مفهومی و دقیق باشه تا مکالمه‌ای که دارید خلاصه و
                            مفید باشه. همچنین قبل از اینکه سوال ارسال کنید، یه
                            بار خودتون اون رو بخونید و مطمئن بشید که سوالتون
                            خوانا و واضحه.
                          </div>
                          <h5 className="font-[dana-b] text-[15px] mb-3 mt-6">
                            چه انتظاراتی از پشتیبانان باید داشته باشم؟
                          </h5>
                          <div className="text-sm leading-6 dark:text-gray-400">
                            از مدرسین و پشتیبانان انتظارات منطقی و مرتبط با
                            خدمات دریافتی خود داشته باشید. حل مشکلات خارج از
                            مباحث و پروژه های دوره در حیطه وظایف
                            پشتیبانان/مدرسین نیست. اگر نیاز به مشاوره دارید
                            میتوانید از طریق تیکت ها به واحد مشاوره پیام دهید
                          </div>
                        </div>
                        <div className="mb-8 pb-8 lbb">
                          <h5 className="font-[dana-b] text-[15px] mb-3">
                            راهنمای سیستم پاسخگویی هوش مصنوعی 🤖
                          </h5>
                          <div className="text-sm leading-6 dark:text-gray-400">
                            این سیستم از هوش مصنوعی برای پاسخ‌دهی سریع و مرتبط
                            به سؤالات شما استفاده می‌کند. زمانی که سؤالی ارسال
                            می‌کنید، هوش مصنوعی بر اساس موضوع دوره‌ای که در آن
                            هستید و عنوان جلسه‌ فعلی به سوالات شما پاسخ میدهد.
                          </div>
                          <div className="text-sm leading-6 dark:text-gray-400">
                            هوش مصنوعی فقط به سؤالات مرتبط با محتوای همین جلسه
                            پاسخ می‌دهد. اگر سؤال شما مستقیماً به این جلسه یا
                            دوره مربوط نباشد، پاسخ داده نمی‌شود.
                          </div>
                          <h5 className="font-[dana-b] text-[15px] mb-3 mt-6">
                            اگر بخواهم مدرس یا پشتیبان پاسخ دهد، چه کنم؟
                          </h5>
                          <div className="text-sm leading-6 dark:text-gray-400">
                            اگر نیاز به بررسی فایل، کد یا توضیح بیشتر از مدرس
                            دارید، می‌توانید از هوش مصنوعی درخواست کنید که سؤال
                            شما را به پشتیبان ارجاع دهد.
                          </div>
                        </div>
                        <div>
                          <div>
                            <div className="flex items-center content-center gap-3">
                              <div className="sm:p-1.5 p-1 border border-neut-seco dark:border-d-neut-ther rounded-full">
                                <div className="sm:size-12 size-11 bg-neut-seco dark:bg-d-neut-ther grid place-content-center rounded-full">
                                  <div className="opacity-30">
                                    <PersonRoundedIcon />
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2 justify-around">
                                <div className="text-lg">
                                  {authInfos.userInfos?.username}
                                </div>
                                <div className="text-sm dark:text-gray-400 text-gray-600">
                                  پرسش جدید
                                </div>
                              </div>
                            </div>
                            <a
                              href="#quistion_&_answer"
                              className="flex py-3 gap-1 text-xs items-end text-orange-600 dark:text-orange-500"
                            >
                              <div className="sm:block hidden">
                                <WarningAmberRoundedIcon fontSize="small" />
                              </div>
                              <div className="font-[dana-xl]">
                                لطفا قبل از ثبت پرسش بخش قوانین ایجاد سوال را
                                مطالعه کنید.
                              </div>
                            </a>
                          </div>
                          <div className="sm:mb-4 mb-3">
                            <textarea
                              onChange={(e) => setQuestionVal(e.target.value)}
                              value={questionVal}
                              className="md:p-5 p-4 max-h-[150vh] rounded-lg outline-none border-none placeholder:text-d-neut-seco/25 dark:placeholder:text-neut-prim/25 text-sm bg-neut-seco dark:bg-d-neut-ther w-full"
                              rows={6}
                              placeholder="سوال خود را بپرسید..."
                            ></textarea>
                          </div>
                          <div className="flex justify-end sm:mb-5 mb-4 items-center content-center gap-3">
                            <div onClick={sendCommentHandler}>
                              <OutButton styles="sm:!w-36 sm:!py-3 text-sm font-[dana-xl]">
                                ارسال
                              </OutButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ContainerContentBox>
                  </div>
                </div>
                <div className="lg:w-4/12">
                  <div className="bg-neut-prim dark:bg-d-neut-prim rounded-lg p-4 sm:p-5 sm:!pe-1.5 !pe-1 w-full lg:mt-6">
                    <div className="text-lg font-[dana-xl] mb-4 pb-4 lbb flex gap-1">
                      <SchoolRoundedIcon className="opacity-60" />
                      جلسات دوره
                    </div>
                    <div className="sessions_box overflow-y-auto max-h-screen rounded-md overflow-hidden">
                      {sessionsDatas?.map((session, index) => (
                        <div
                          className="relative px-3 bg-neut-seco dark:bg-d-neut-ther me-1.5"
                          key={session._id}
                        >
                          <div
                            className={`${
                              index + 1 === sessionsDatas.length ? "" : "lbb"
                            } py-5`}
                          >
                            {session.free ||
                            courseDatas.isUserRegisteredToThisCourse ? (
                              <Link
                                to={`/${courseName}/${session._id}`}
                                className="text-[15px] font-[dana-xl] line-clamp-2 pb-2"
                              >
                                {session.title}
                              </Link>
                            ) : (
                              <div className="text-[15px] font-[dana-xl] line-clamp-2 pb-2">
                                {session.title}
                              </div>
                            )}
                            <div className="flex gap-4 justify-between content-center items-center">
                              <div className="size-5 border border-prim rounded-full"></div>
                              {session.free ||
                              courseDatas.isUserRegisteredToThisCourse ? (
                                <div className="px-2 py-1 font-[irsans] text-sm rounded-full text-prim border border-prim">
                                  {session.time.includes(":")
                                    ? session.time
                                    : `${session.time}:00`}
                                </div>
                              ) : (
                                <div className="flex justify-end">
                                  <div className="border rounded-full border-red-600/70 text-red-600/70 dark:border-red-500/80 dark:text-red-500/80 size-9 grid place-content-center">
                                    <LockOutlineIcon fontSize="small" />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          {session._id === sessionId && (
                            <span className="absolute top-1/2 -translate-y-1/2 -right-3 w-4 rounded-sm h-4/6 bg-prim"></span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid pt-6 grid-cols-3 gap-3">
                    <CourseBoxInfo
                      isSessionPage
                      title="وضعیت دوره"
                      info={courseDatas.status ? "تکمیل شده" : "درحال برگزاری"}
                    >
                      <InfoIcon size="small" />
                    </CourseBoxInfo>
                    <CourseBoxInfo
                      isSessionPage
                      title="زمان دوره"
                      info={`${courseTimeProcessing(
                        courseDatas.sessions
                      )} ساعت`}
                    >
                      <ClockIcon size="small" />
                    </CourseBoxInfo>
                    <CourseBoxInfo
                      isSessionPage
                      title="جلسات دوره"
                      info={courseDatas.sessions.length}
                    >
                      <VideoIcon size="small" />
                    </CourseBoxInfo>
                  </div>
                  <div className="pt-6">
                    <TeacherProfile
                      name={courseDatas.creator.name}
                      image={courseDatas.creator.profile}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
           
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Session;
