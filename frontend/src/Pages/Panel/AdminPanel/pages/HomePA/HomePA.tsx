import { useEffect, useState } from "react";
import type {
  T_ArticlesData,
  T_CoursesData,
  T_PAinfos,
  T_userInfos,
} from "../../../../../Types/type";
import InfoBoxPA from "./components/InfoBoxPA";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import FolderCopyRoundedIcon from "@mui/icons-material/FolderCopyRounded";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import DataCotainerBox from "../../../components/DataCotainerBox/DataCotainerBox";
import WrapperLoader from "../../../../../Components/DesignSystem/WrapperLoader/WrapperLoader";
import { Link } from "react-router";
import CourseBoxP from "../../../components/CourseBoxP/CourseBoxP";
import ArticleBoxP from "../../../components/ArticleBoxP/ArticleBoxP";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import AnalisChart from "./components/AnalisChart";

function HomePA() {
  const [siteStatusInfos, setSiteStatusInfos] = useState<T_PAinfos[] | null>(null);

  const [latestUsers, setLatestUsers] = useState<T_userInfos[] | null>(null);

  const [latestCourses, setLatestCourses] = useState<T_CoursesData[] | null>(null);

  const [latestArticles, setLatestArticles] = useState<T_ArticlesData[] | null>(null);

  const [data] = useState([
    { name: "فروردین", income: 1_815_000_000 },
    { name: "اردیبهشت", income: 2_715_800_000 },
    { name: "خرداد", income: 2_005_000_000 },
    { name: "تیر", income: 415_800_000 },
    { name: "مرداد", income: 915_000_000 },
    { name: "شهریور", income: 425_000_000 },
    { name: "مهر", income: 1_603_000_000 },
    { name: "آبان", income: 2_400_000_000 },
    { name: "آذر", income: 1_445_000_000 },
    { name: "دی", income: 3_027_000_000 },
    { name: "بهمن", income: 2_415_000_000 },
    { name: "اسفند", income: 2_815_000_000 },
  ]);

  const userDatas = JSON.parse(localStorage.getItem("user") as string);

  const getInfosHandler = async () => {
    try {
      const infos = await (
        await fetch(`http://localhost:4000/v1/infos/p-admin`, {
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
          },
        })
      ).json();
      setSiteStatusInfos(infos.infos);
      setLatestUsers(infos.lastUsers);
    } catch (error) { }
  };

  const getAllCourses = async () => {
    try {
      const allCourses = await (
        await fetch(`http://localhost:4000/v1/courses`, {
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
          },
        })
      ).json();
      setLatestCourses(allCourses.slice(0, 4));
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const getAllArticles = async () => {
    try {
      const allArticles = await (
        await fetch(`http://localhost:4000/v1/articles`, {
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
          },
        })
      ).json();
      setLatestArticles(allArticles.slice(0, 4));
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    getInfosHandler();
    getAllCourses();
    getAllArticles();
  }, []);

  return (
    <div>
      <div
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(194px, 1fr))" }}
        className="grid grid-cols-3 gap-6 pb-8 lg:mt-0 mt-4"
      >
        {siteStatusInfos ? (
          <>
            <InfoBoxPA
              title={siteStatusInfos[0].title}
              count={siteStatusInfos[0].count}
              icon={<PeopleAltRoundedIcon fontSize="large" />}
              label="دانشجو"
            />
            <InfoBoxPA
              title={siteStatusInfos[1].title}
              count={siteStatusInfos[1].count}
              icon={<FolderCopyRoundedIcon fontSize="large" />}
              label="دوره"
            />
            <InfoBoxPA
              title={siteStatusInfos[2].title}
              count={siteStatusInfos[2].count}
              icon={<VideoLibraryRoundedIcon fontSize="large" />}
              label="جلسه"
            />
          </>
        ) : (
          <DataCotainerBox>
            <div className="lg:h-16 md:h-[40vh] sm:h-24 h-screen"></div>
          </DataCotainerBox>
        )}
      </div>
      <DataCotainerBox title="مقایسه درآمد ماهانه">
        <div className="rounded-lg md:h-[18vw] h-[30vw]">
          <AnalisChart data={data} />
        </div>
      </DataCotainerBox>
      <DataCotainerBox
        title="آخرین دوره‌ها"
        action={
          <Link to={"courses"} className="btn btn-sm btn-neut">
            <KeyboardBackspaceRoundedIcon fontSize="small" />
          </Link>
        }
      >
        <div
          className="px-2 grid gap-6 pb-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(194px, 1fr))",
          }}
        >
          {latestCourses &&
            latestCourses.map((course) => (
              <CourseBoxP
                cover={course.cover}
                price={course.price}
                name={course.name}
                creator={course.creator}
                href={course.shortName}
                key={course._id}
              />
            ))}
        </div>
      </DataCotainerBox>
      <DataCotainerBox
        title="آخرین مقالات"
        action={
          <Link to={"articles"} className="btn btn-sm btn-neut">
            <KeyboardBackspaceRoundedIcon fontSize="small" />
          </Link>
        }
      >
        <div
          className="px-2 grid gap-6 pb-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(194px, 1fr))",
          }}
        >
          {latestArticles &&
            latestArticles.map((article) => (
              <ArticleBoxP
                cover={article.cover}
                creator={article.creator.name}
                publish={article.publish}
                title={article.title}
                href={article.shortName}
                key={article._id}
              />
            ))}
        </div>
      </DataCotainerBox>
      <DataCotainerBox
        title="جدید ترین کاربرها"
        action={
          <Link to={"users"} className="btn btn-sm btn-neut">
            <KeyboardBackspaceRoundedIcon fontSize="small" />
          </Link>
        }
      >
        <div className="panel_table overflow-x-auto max-h-[70vh] lg:max-w-[calc(100vw-26.5rem)] md:max-w-[calc(100vw-18.5rem)]">
          <div className="min-w-max sm:min-w-[900px]">
            <div className="flex text-sm items-center sm:grid grid-cols-20 sm:grid-cols-12 *:shrink-0"></div>
            <div className="*:odd:bg-d-neut-seco-panel">
              {latestUsers?.length !== 0 ? (
                latestUsers?.map((user, index) => (
                  <div
                    className={`${index % 2
                        ? ""
                        : "rounded-lg bg-neut-seco-panel dark:bg-d-neut-seco-panel"
                      } flex items-center sm:grid sm:grid-cols-12 me-2 py-4 rounded-md *:shrink-0`}
                  >
                    <div className="w-16 sm:w-auto md:text-base text-sm sm:col-span-1 text-center">
                      <span className="font-[irsans] font-bold opacity-50 text-label xs:text-caption">
                        <img
                          className="size-10 m-auto rounded-full bg-prim"
                          src="/img/user.png"
                          alt=""
                        />
                      </span>
                    </div>
                    <div className="w-24 sm:w-auto md:text-base text-sm sm:col-span-2 gap-x-1.5">
                      <span className="text-label xs:text-caption">
                        {user.name}
                      </span>
                    </div>
                    <div className="w-28 sm:w-auto md:text-base text-sm sm:col-span-2 text-center">
                      <span className="text-label xs:text-caption">
                        {user.username}
                      </span>
                    </div>
                    <div className="w-36 sm:w-auto md:text-base text-sm sm:col-span-4 text-center">
                      <span className="text-label xs:text-caption">
                        {user.email}
                      </span>
                    </div>
                    <div className="w-60 font-[irsans] font-bold sm:w-auto md:text-base text-sm sm:col-span-3 text-center">
                      {user.phone}
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-36 pt-6 grid sm:place-content-center sm:ps-0 ps-[40vw]">
                  <WrapperLoader />
                </div>
              )}
            </div>
          </div>
        </div>
      </DataCotainerBox>
    </div>
  );
}

export default HomePA;
