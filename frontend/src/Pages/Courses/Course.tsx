// Page
import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import type {
  T_AlertIsShow,
  T_SingleCourseData,
  T_setAlertShow,
} from "../../Types/type";
import Navbar from "../../Components/Navbar/Navbar";
import { numberSeparator } from "../../Founctions/NumberSeparator";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import Button from "../../Components/DesignSystem/Button";
import ChatButton from "../../Components/DesignSystem/ChatButton";
import Footer from "../../Components/Footer/Footer";
import Topbar from "../../Components/Topbar/Topbar";
import DetailsBoxes from "./components/DetailsBoxes/DetailsBoxes";
import RightSide from "./components/RightSide/RightSide";
import LeftSide from "./components/LeftSide/LeftSide";
import { useNavigate } from "react-router";
import Loading from "../../Components/Loading/Loading";
import Plyr from "plyr-react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../Redux/slices/cartItemsSlice";
import useAlertShow from "../../Hooks/useAlertShow";
import Alert from "../../Components/Alert/Alert";
import { courseTimeProcessing } from "../../Founctions/CourseTimeProcessing";

function Course() {
  const [courseDatas, setCourseDatas] = useState<T_SingleCourseData | null>(
    null
  );

  const [iniPrice, setIniPrice] = useState<number>(
    (courseDatas as T_SingleCourseData)?.price
  );

  const cartItems = useSelector(
    (state: {
      cartItems: { value: { cartItems: null | T_SingleCourseData[] } };
    }) => state.cartItems.value.cartItems
  );

  const [successAlertIsShow, setSuccessAlertIsShow] = useAlertShow();
  const [warningAlertIsShow, setWarningAlertIsShow] = useAlertShow();

  const { courseName } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getCourseHandler = async () => {
    const userToken = JSON.parse(localStorage.getItem("user") as string)
      ? JSON.parse(localStorage.getItem("user") as string).token
      : null;
    try {
      const response = await fetch(
        `http://localhost:4000/v1/courses/${courseName}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const datas = await response.json();
      response.ok ? setCourseDatas(datas) : navigate("/");
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const addToCartHandler = () => {
    {
      dispatch(addCartItem(courseDatas as T_SingleCourseData));
    }
    if (
      !cartItems?.find(
        (course: T_SingleCourseData) => course._id === courseDatas?._id
      )
    ) {
      (setSuccessAlertIsShow as T_setAlertShow)(courseDatas?.name);
    } else {
      (setWarningAlertIsShow as T_setAlertShow)(courseDatas?.name);
    }
  };

  const videoSrc = {
    type: "video",
    poster: `http://localhost:4000/courses/covers/${courseDatas?.cover}`,
    sources: [
      {
        src: `http://localhost:4000/courses/covers/${courseDatas?.sessions[0]?.video}`,
        type: "video/mp4",
        size: 1080,
      },
    ],
  };

  useEffect(() => {
    getCourseHandler();
  }, [courseName]);

  useEffect(() => {
    setIniPrice((courseDatas as T_SingleCourseData)?.price);
    if ((courseDatas as T_SingleCourseData)?.discount) {
      const discountPrice: number =
        ((courseDatas as T_SingleCourseData)?.discount *
          (courseDatas as T_SingleCourseData)?.price) /
        100;
      setIniPrice((prevPrice) =>
        prevPrice === (courseDatas as T_SingleCourseData)?.price
          ? prevPrice - discountPrice
          : prevPrice
      );
    }
  }, [courseDatas]);

  return (
    <>
      {(successAlertIsShow as T_AlertIsShow).isShow && (
        <Alert
          message={`دوره ${
            (successAlertIsShow as T_AlertIsShow).userFullName
          } با موفقیت به سبد خرید شما اضافه شد`}
          alertThem="bg-prim"
        />
      )}
      {(warningAlertIsShow as T_AlertIsShow).isShow && (
        <Alert
          message={`دوره ${
            (warningAlertIsShow as T_AlertIsShow).userFullName
          } در سبد خرید شما وجود دارد`}
          alertThem="bg-warn"
        />
      )}
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
              <div className="lg:grid lg:grid-cols-2 lg:bg-inherit lg:dark:bg-inherit bg-neut-prim dark:bg-d-neut-prim rounded-xl lg:p-0 sm:p-6 p-4 flex flex-col-reverse gap-6 lg:mb-20 mb-6 mt-10">
                <div className="flex flex-col justify-between h-full lg:py-2 py-0">
                  <div>
                    <div className="pb-6 text-2xl font-[dana-b]">
                      {(courseDatas as T_SingleCourseData)?.name}
                    </div>
                    <div className="line-clamp-3 text-lg leading-8 text-gray-700 dark:text-gray-300 pe-4 sm:text-right text">
                      {(courseDatas as T_SingleCourseData)?.description}
                    </div>
                  </div>
                  <div className="flex sm:flex-row flex-col-reverse sm:gap-0 gap-4 justify-between items-center lg:pt-0 pt-6 lg:px-0 sm:px-8 px-0">
                    <div className="sm:w-fit w-full">
                      {courseDatas?.isUserRegisteredToThisCourse ? (
                        <div className="text-lg flex sm:justify-start justify-center sm:mt-0 my-1 items-center content-center gap-2">
                          <div>
                            <PersonOutlineRoundedIcon fontSize="large" />
                          </div>
                          <div className="translate-y-0.5">
                            شما دانشجوی دوره هستید
                          </div>
                        </div>
                      ) : (
                        <Button
                          onClick={addToCartHandler}
                          styles="!py-3 !flex !sm:w-fit !w-full"
                        >
                          <div>
                            <SchoolOutlinedIcon />
                          </div>
                          <div className="text-base translate-y-0.5">
                            افزودن به سبد خرید
                          </div>
                        </Button>
                      )}
                    </div>
                    <div className="sm:w-fit w-full sm:px-0 px-6">
                      {courseDatas?.isUserRegisteredToThisCourse ? (
                        <Link
                          to={
                            courseDatas.sessions[0]
                              ? `/${courseDatas.shortName}/${courseDatas.sessions[0]._id}`
                              : `/course-info/${courseDatas.shortName}`
                          }
                        >
                          <Button styles="!py-3 !flex !md:w-fit !w-full sm:!px-12">
                            <div>
                              <ImportContactsOutlinedIcon />
                            </div>
                            <div className="text-base translate-y-0.5">
                              مشاهده دوره
                            </div>
                          </Button>
                        </Link>
                      ) : (
                        <div className="flex gap-2 p-0 sm:justify-start justify-center items-center">
                          {iniPrice ? (
                            <div className="flex gap-2 items-center content-center">
                              {(courseDatas as T_SingleCourseData)?.discount !=
                                0 && (
                                <div className="font-[irsans] text-xl text-gray-600 dark:text-gray-400 line-through">
                                  {courseDatas &&
                                    numberSeparator(
                                      (courseDatas as T_SingleCourseData)?.price
                                    )}
                                </div>
                              )}
                              <div className="flex items-end content-end gap-1">
                                <div className="font-[irsans] text-3xl font-bold">
                                  {numberSeparator(iniPrice)}
                                </div>
                                <div>تومان</div>
                              </div>
                            </div>
                          ) : (
                            <div className="md:text-3xl text-2xl font-[dana-b] text-prim">
                              رایگان!
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="w-full aspect-video max-h-screen">
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
                </div>
              </div>
              <div className="flex gap-6 lg:flex-row flex-col">
                <div className="lg:w-8/12">
                  <DetailsBoxes
                    status={(courseDatas as T_SingleCourseData)?.isComplete}
                    support={(courseDatas as T_SingleCourseData)?.support}
                    updated={(courseDatas as T_SingleCourseData)?.updatedAt}
                    time={courseTimeProcessing((courseDatas as T_SingleCourseData)?.sessions)}
                  />
                  <RightSide
                    id={(courseDatas as T_SingleCourseData)?._id}
                    cover={`http://localhost:4000/courses/covers/${courseDatas.cover}`}
                    description={
                      (courseDatas as T_SingleCourseData)?.description
                    }
                    sessions={(courseDatas as T_SingleCourseData)?.sessions}
                    comments={(courseDatas as T_SingleCourseData)?.comments}
                    isUserRegisteredToThisCourse={
                      courseDatas?.isUserRegisteredToThisCourse as boolean
                    }
                    courseShortName={
                      (courseDatas as T_SingleCourseData)?.shortName
                    }
                    getDataHandler={getCourseHandler}
                  />
                </div>
                <LeftSide
                  students={
                    (courseDatas as T_SingleCourseData)?.courseStudentsCount
                  }
                  score={"5.0"}
                  completionValue={50}
                  teacher={(courseDatas as T_SingleCourseData)?.creator?.name}
                  profilTicher={
                    (courseDatas as T_SingleCourseData)?.creator?.profile
                  }
                />
              </div>
            </div>
          </div>
          <Footer />
          <ChatButton />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Course;
