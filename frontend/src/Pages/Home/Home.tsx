  
import Footer from "../../Components/Footer/Footer";
import Topbar from "../../Components/Topbar/Topbar";
import Aboutus from "./components/Aboutus/Aboutus";
import AboutuseText from "./components/AboutuseText/AboutuseText";
import Header from "./components/Header/Header";
import LatestArticles from "./components/LatestArticles/LatestArticles";
import LastCourses from "./components/LatestCourses/LatestCourses";
import NewCourses from "./components/NewCourses/NewCourses";
import PopularCourses from "./components/PopularCourses/PopularCourses";
import PopularFreeCourses from "./components/PopularFreeCourses/PopularFreeCourses";
import RoadMaps from "./components/RoadMaps/RoadMaps";

function Home() {
  return (
    <>
      <Topbar />
      <div>
        <Header />
        <div className="container_">
          <LastCourses />
          <RoadMaps />
          <PopularCourses />
          <Aboutus />
          <NewCourses />
          <LatestArticles />
          <PopularFreeCourses />
          <AboutuseText />
        </div>
      </div>
      <Footer />
      {/*   */}
    </>
  );
}

export default Home;
