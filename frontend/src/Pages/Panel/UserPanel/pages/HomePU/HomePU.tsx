import { useEffect, useState } from "react";
import DataCotainerBox from "../../../components/DataCotainerBox/DataCotainerBox";
import type { T_Ticket, T_Transaction } from "../../../../../Types/type";
import InfoBoxPU from "./components/InfoBoxPU";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import { Link } from "react-router";
import CourseBoxP from "../../../components/CourseBoxP/CourseBoxP";
import Ticket from "../TicketsPU/components/Tcket";
import Button from "../../../../../Components/DesignSystem/Button";
import EmptyPU from "../../../components/EmptyPU/EmptyPU";

function HomePU() {
  const [myCourses, setMyCourses] = useState<T_Transaction[] | null>(null);
  const [latestTickets, setLatestTickets] = useState<T_Ticket[] | null>(null);

  const [allTicketsLength, setAllTicketsLength] = useState<number | null>(null);
  const [allCoursesLength, setAllCoursesLength] = useState<number | null>(null);

  const userDatas = JSON.parse(localStorage.getItem("user") as string);

  const getAllMyCourses = async () => {
    try {
      const allMyCourses = await (
        await fetch(`http://localhost:4000/v1/users/courses`, {
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
          },
        })
      ).json();
      setMyCourses(allMyCourses.reverse().slice(0, 4));
      setAllCoursesLength(allMyCourses.length);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const getAllTickets = async () => {
    try {
      const tickets = await (
        await fetch(`http://localhost:4000/v1/tickets/user`, {
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
          },
        })
      ).json();
      setLatestTickets(tickets.slice(0, 3));
      setAllTicketsLength(tickets.length);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    getAllMyCourses();
    getAllTickets();
  }, []);

  return (
    <>
      {(allCoursesLength !== 0 || allTicketsLength !== 0) ? (
        <div>
          <DataCotainerBox>
            <div
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(144px, 1fr))",
              }}
              className="grid grid-cols-4 items-center gap-8 py-2"
            >
              <InfoBoxPU
                title="دوره های من"
                label="دوره"
                count={allCoursesLength ? allCoursesLength : 0}
                img={`/img/courses-empty.png`}
              />
              <InfoBoxPU
                title="پرسش پاسخ"
                label="پرسش"
                count={0}
                img={`/img/questions-empty.png`}
              />
              <InfoBoxPU
                title="تیکت ها"
                label="تیکت"
                count={allTicketsLength ? allTicketsLength : 0}
                img={`/img/tickets-empty.png`}
              />
              <InfoBoxPU
                title="کیف پول"
                label="تومان"
                count={0}
                img={`/img/transactions-empty.png`}
              />
            </div>
          </DataCotainerBox>
          {myCourses?.length !== 0 && (
            <DataCotainerBox
              title="آخرین دوره‌های خریداری شده"
              action={
                <Link to={"courses"} className="btn btn-sm btn-neut">
                  <WestRoundedIcon fontSize="small" />
                </Link>
              }
            >
              <>
                {myCourses && (
                  <div
                    className={`${
                      myCourses.length >= 4
                        ? "panel_item_box_container"
                        : "lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
                    } px-2 grid gap-x-6 gap-y-8 pb-6`}
                  >
                    {myCourses.map(
                      (course) =>
                        course.course && (
                          <CourseBoxP
                            cover={course.course.cover}
                            price={course.price}
                            name={course.course.name}
                            creator={course.course.creator}
                            href={course.course.shortName}
                            key={course._id}
                            videoLink={course.course._id}
                            isUserPanel
                          />
                        )
                    )}
                  </div>
                )}
              </>
            </DataCotainerBox>
          )}
          {latestTickets?.length !== 0 && (
            <DataCotainerBox
              title={"آخرین تیکت ها"}
              action={
                <Link to={"tickets"} className="btn btn-sm btn-neut">
                  <WestRoundedIcon fontSize="small" />
                </Link>
              }
            >
              <div>
                {latestTickets &&
                  latestTickets.map((ticket) => <Ticket ticket={ticket} />)}
              </div>
            </DataCotainerBox>
          )}
        </div>
      ) : (
        <DataCotainerBox>
          <div className="flex sm:items-center h-[81vh]">
            <EmptyPU
              img="home-empty.png"
              title="فعلا اینجا خبری نیست!"
              text={
                <>
                  همین حالا می‌تونی اولین قدمت رو برداری
                  <br /> اگه مطمئن نیستی از کجا شروع کنی، روی لینک زیر کلیک کن
                </>
              }
            >
              <Link to={"/category-courses/courses"}>
                <Button styles="text-xs font-[dana-xl] !px-8 !py-3">
                  شروع یادگیری با دوره ها
                </Button>
              </Link>
            </EmptyPU>
          </div>
        </DataCotainerBox>
      )}
    </>
  );
}

export default HomePU;
