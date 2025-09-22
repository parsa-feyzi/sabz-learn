import { useParams } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import CategoryContent from "./components/CategoryContent";
import { useEffect, useState } from "react";
import ChatButton from "../../Components/DesignSystem/ChatButton";
import Footer from "../../Components/Footer/Footer";
import Topbar from "../../Components/Topbar/Topbar";
import type { T_ArticlesData, T_InputEvent } from "../../Types/type";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import SortbyBox from "./components/SortbyBox";
import CoverPage from "../../Components/CoverPage/CoverPage";
import SortbyFullBox from "./components/SortbyFullBox";
import CategoryMainItems from "./components/CategoryMainItems";
import CategorySearchBox from "./components/CategorySearchBox";
import Loading from "../../Components/Loading/Loading";

function ArticlesCategory() {
  const [categoryList] = useState([
    { id: 1, title: "عادی", key: "NORMAL" },
    { id: 2, title: "جدید ترین", key: "LATEST" },
    { id: 3, title: "قدیمی ترین", key: "OLDEST" },
  ]);

  const [categoryStatus, setCategoryStatus] = useState("NORMAL");

  const [articlesDatas, setArticlesDatas] = useState<T_ArticlesData[] | null>();

  const [orderedArticlesDatas, setOrderedArticlesDatas] = useState<
    T_ArticlesData[] | null
  >();

  const [searchValue, setSearchValue] = useState("");

  const [isShowSortbyBox, setIsShowSortbyBox] = useState(false);

  const { categoryName } = useParams();

  const [flage, setFlage] = useState(false);

  const getCoursesHandler = async () => {
    const articlesApi =
      categoryName === "articles"
        ? categoryName
        : `articles/category/${categoryName}`;

    try {
      const articles = await (
        await fetch(`http://localhost:4000/v1/${articlesApi}`)
      ).json();
      setCategoryStatus("NORMAL");
      setSearchValue("");
      setArticlesDatas(
        articles?.filter((article: T_ArticlesData) => article.publish)
      );
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    getCoursesHandler();
  }, [categoryName]);

  useEffect(() => {
    let article: T_ArticlesData[];

    if (articlesDatas) {
      switch (categoryStatus) {
        case "OLDEST": {
          article = articlesDatas.sort(
            (a, b) =>
              parseInt(a.createdAt.slice(0, 10).replaceAll("-", "")) -
              parseInt(b.createdAt.slice(0, 10).replaceAll("-", ""))
          );
          setSearchValue("");
          break;
        }
        case "LATEST": {
          article = articlesDatas.sort(
            (a, b) =>
              parseInt(b.createdAt.slice(0, 10).replaceAll("-", "")) -
              parseInt(a.createdAt.slice(0, 10).replaceAll("-", ""))
          );
          setSearchValue("");
          break;
        }
        default: {
          article = articlesDatas.sort(
            (a, b) =>
              parseInt(b.createdAt.slice(0, 10).replaceAll("-", "")) -
              parseInt(a.createdAt.slice(0, 10).replaceAll("-", ""))
          );
        }
      }

      setOrderedArticlesDatas(article);
      setFlage(!flage);
    }
  }, [categoryStatus, articlesDatas]);

  const searchHandler = (e: T_InputEvent) => {
    setCategoryStatus("NORMAL");
    setSearchValue(e.target.value);
    if (articlesDatas) {
      const searchResulve = articlesDatas?.filter((article) =>
        article.title?.includes(e.target.value.trim())
      );
      setOrderedArticlesDatas(searchResulve);
    }
  };

  return (
    <>
      {articlesDatas ? (
        <>
          <Topbar />
          <div>
            <Navbar />
            <div className="container_">
              <CategoryContent
                titlePage="وبلاگ"
                labelPage="مقاله"
                itemsCount={orderedArticlesDatas?.length}
              >
                <>
                  <div className="flex relative lg:flex-row flex-col lg:gap-8 py-4">
                    <div className="xl:w-3/12 lg:w-4/12 w-full">
                      <CategorySearchBox
                        value={searchValue}
                        searchHandler={searchHandler}
                        lable="مقالات"
                      />
                      <div className="sm:hidden flex gap-4">
                        <div
                          onClick={() => setIsShowSortbyBox(true)}
                          className="flex gap-1 p-3 justify-center items-center content-center w-full bg-neut-prim dark:bg-d-neut-prim rounded-lg cursor-pointer"
                        >
                          <div>
                            <SwapVertRoundedIcon />
                          </div>
                          <div className="text-sm font-[dana-xl]">
                            {categoryList.map((category) => {
                              if (category.key === categoryStatus) {
                                return category.title;
                              }
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="xl:w-9/12 lg:w-8/12 w-full">
                      <div className="mb-6">
                        <SortbyFullBox
                          categoryList={categoryList}
                          categoryStatus={categoryStatus}
                          setCategoryStatus={setCategoryStatus}
                        />
                      </div>
                      <CategoryMainItems
                        items={orderedArticlesDatas as T_ArticlesData[]}
                      />
                    </div>
                  </div>
                  {isShowSortbyBox && (
                    <CoverPage closeHandler={() => setIsShowSortbyBox(false)} />
                  )}
                  <SortbyBox
                    categoryList={categoryList}
                    isShow={isShowSortbyBox}
                    setIsShow={setIsShowSortbyBox}
                    categoryStatus={categoryStatus}
                    setCategoryStatus={setCategoryStatus}
                  />
                </>
              </CategoryContent>
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

export default ArticlesCategory;
