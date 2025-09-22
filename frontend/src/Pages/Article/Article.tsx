import { useEffect, useState } from "react";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Navbar from "../../Components/Navbar/Navbar";
import ContainerContentBox from "../../Components/ContainerContentBox/ContainerContentBox";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ShareBoxToggle from "../../Components/ShareBoxToggle/ShareBoxToggle";
import Topbar from "../../Components/Topbar/Topbar";
import ChatButton from "../../Components/DesignSystem/ChatButton";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import Loading from "../../Components/Loading/Loading";
import type { T_ArticlesData, T_SingleArticleDatas } from "../../Types/type";
import ArticleDetail from "./components/ArticleDetail/ArticleDetail";
import ArticleOfferBox from "./components/ArticleOfferBox/ArticleOfferBox";
import DOMPurify from "dompurify";

function Article() {
  const [articleDatas, setArticleDatas] = useState<T_SingleArticleDatas | null>(
    null
  );

  const [allArticlesDatas, setAllArticlesDatas] = useState<
    T_ArticlesData[] | null
  >(null);

  const { articleName } = useParams();

  const navigate = useNavigate();

  const getAllArticlesHandler = async () => {
    try {
      const articles = await (
        await fetch(`http://localhost:4000/v1/articles`)
      ).json();
      setAllArticlesDatas(articles);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const getArticleHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/v1/articles/${articleName}`
      );
      const datas = await response.json();
      response.ok ? setArticleDatas(datas) : navigate("/");
      console.log(response);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    getArticleHandler();
    getAllArticlesHandler();
  }, [articleName]);

  return (
    <>
      {articleDatas ? (
        <>
          <Topbar />
          <div>
            <Navbar />
            <div className="container_ py-10">
              <div>
                <Breadcrumb
                  routes={[
                    { title: <HomeOutlined />, href: "/", id: 1 },
                    {
                      title: "وبلاگ",
                      href: "/category-articles/articles",
                      id: 2,
                    },
                    {
                      title: articleDatas.title,
                      href: `/article-info/${articleName}`,
                      id: 3,
                    },
                  ]}
                />
              </div>
              <div className="flex lg:flex-row flex-col lg:gap-6 relative">
                <div className="xl:w-9/12 lg:w-8/12 w-full">
                  <ContainerContentBox
                    title={articleDatas.title}
                    color="#0ea5e9"
                  >
                    <div className="border-t-2 border-gray-500/25">
                      <div className="flex gap-6 items-center content-center py-7 text-gray-600 dark:text-gray-500">
                        <ArticleDetail
                          icon={<PersonOutlineOutlinedIcon />}
                          info={articleDatas.creator.name}
                        />
                        <ArticleDetail
                          icon={<CalendarMonthOutlinedIcon />}
                          info={articleDatas.createdAt.slice(0, 10)}
                          font="[irsans]"
                        />
                      </div>
                      <div className="w-full">
                        <img
                          className="w-full object-cover rounded-xl"
                          src={`http://localhost:4000/courses/covers/${articleDatas.cover}`}
                        />
                      </div>
                      <div className="font-[dana-l] py-8 text-gray-800 dark:text-gray-300">
                        <div className="pb-4">{articleDatas.description}</div>
                        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(articleDatas.body)}}></div>
                      </div>
                    </div>
                  </ContainerContentBox>
                  <ContainerContentBox
                    title="پیشنهاد مطالعه"
                    color="#f59e0b"
                    icon={<AutoStoriesIcon fontSize="large" />}
                  >
                    <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
                      {allArticlesDatas
                        ?.filter((article) => article._id !== articleDatas._id)
                        .slice(0, 4)
                        .map((article) => (
                          <ArticleOfferBox {...article} key={article._id} />
                        ))}
                    </div>
                  </ContainerContentBox>
                  {/* <CommentBox label="مقاله" getDataHandler={getArticleHandler} /> */}
                </div>
                <div className="xl:w-3/12 lg:w-4/12 w-full">
                  <div className="sticky top-6">
                    <ShareBoxToggle link={`sabzlearn.ir/article-info/${articleDatas.shortName}`} />
                  </div>
                </div>
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

export default Article;
