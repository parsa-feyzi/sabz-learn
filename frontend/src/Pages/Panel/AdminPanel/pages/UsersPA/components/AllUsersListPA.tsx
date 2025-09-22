import { useEffect, useState } from "react";
import DataCotainerBox from "../../../../components/DataCotainerBox/DataCotainerBox";
import type { T_comment, T_userInfos } from "../../../../../../Types/type";
import WrapperLoader from "../../../../../../Components/DesignSystem/WrapperLoader/WrapperLoader";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import AllUsersListItem from "./AllUsersListItemPA";
import CoverPageP from "../../../../components/CoverPageP/CoverPageP";
import DeleteAlertPA from "../../../../components/AlertP/DeleteAlertPA";
import SearchByP from "../../../../components/SearchByP/SearchByP";
import NotSearchRes from "../../../../components/NotSearchRes/NotSearchRes";
import AlertP from "../../../../components/AlertP/AlertP";
import Button from "../../../../../../Components/DesignSystem/Button";

function AllUsersList() {
  const [allUsers, setAllUsers] = useState<T_userInfos[] | null>(null);
  const [orderedAllUsers, setOrderedAllUsers] = useState<T_userInfos[] | null>(
    null
  );

  const [allAdmins, setAllAdmins] = useState<T_userInfos[] | null>(null);

  const [allComments, setAllComments] = useState<T_comment[] | null>(null);

  const [isReverse, setIsReverse] = useState(false);

  const [targetUser, setTargetUser] = useState<T_userInfos | null>(null);

  const [isShowAlert, setIsShowAlert] = useState({
    changeRole: false,
    delete: false,
    ban: false,
  });

  const userDatas = JSON.parse(localStorage.getItem("user") as string);

  // Functions
  const closeAlerts = () =>
    setIsShowAlert({ changeRole: false, delete: false, ban: false });

  const getAllUsers = async () => {
    try {
      const allUsers = await (
        await fetch(`http://localhost:4000/v1/users`, {
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
          },
        })
      ).json();

      // Admins
      const onlyAdmins = allUsers.filter(
        (user: T_userInfos) => user.role === "ADMIN"
      );
      setAllAdmins(onlyAdmins.reverse());

      // Users
      const onlyUsers = allUsers.filter(
        (user: T_userInfos) => user.role === "USER"
      );
      setAllUsers(onlyUsers);
      isReverse
        ? setOrderedAllUsers(onlyUsers)
        : setOrderedAllUsers(onlyUsers.reverse());
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const getAllComment = async () => {
    try {
      const allComments = await (
        await fetch(`http://localhost:4000/v1/comments`)
      ).json();
      console.log(allComments);
      setAllComments(allComments);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  // dalete ban user comments
  const deleteBanUserCommentsHandler = (banUserId?: string) => {
    allComments?.forEach(async (comment) => {
      if (comment.creator._id === banUserId) {
        try {
          await fetch(`http://localhost:4000/v1/comments/${comment._id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${userDatas.token}`,
            },
          });
        } catch (error) {
          throw new Error(`${error}`);
        }
      }
    });
  };

  // delete user
  const deleteUserHandler = async () => {
    deleteBanUserCommentsHandler(targetUser?._id);
    try {
      await fetch(`http://localhost:4000/v1/users/${targetUser?._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userDatas.token}`,
        },
      });
      getAllUsers();
      closeAlerts();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const deleteUser = (user: T_userInfos) => {
    setTargetUser(user);
    setIsShowAlert((prev) => ({ ...prev, delete: true }));
  };

  // ban user
  const banUserHandler = async () => {
    try {
      await fetch(`http://localhost:4000/v1/users/ban/${targetUser?._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userDatas.token}`,
        },
      });
      deleteUserHandler();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const banUser = (user: T_userInfos) => {
    setTargetUser(user);
    setIsShowAlert((prev) => ({ ...prev, ban: true }));
  };

  // change role user
  const changeRoleUserHandler = async () => {
    try {
      const res = await (
        await fetch(`http://localhost:4000/v1/users/role`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${userDatas.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: targetUser?._id,
            role: targetUser?.role === "ADMIN" ? "USER" : "ADMIN",
          }),
        })
      ).json();
      console.log(res);
      getAllUsers();
      closeAlerts();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const changeRoleUser = (user: T_userInfos) => {
    setTargetUser(user);
    setIsShowAlert((prev) => ({ ...prev, changeRole: true }));
  };

  useEffect(() => {
    getAllUsers();
    getAllComment();
  }, []);

  return (
    <>
      <div>
        <DataCotainerBox
          title="لیست کاربرها"
          action={
            <div className="flex sm:gap-4 gap-2">
              <SearchByP
                searchFields={[
                  { title: "نام کامل", value: "fullName" },
                  { title: "نام کاربری", value: "userName" },
                  { title: "ایمیل", value: "email" },
                ]}
                list={allUsers}
                setList={setOrderedAllUsers}
                placeholder="کاربرها"
              />
              <div
                onClick={() => {
                  setOrderedAllUsers(
                    [...(orderedAllUsers as T_userInfos[])]?.reverse()
                  );
                  setIsReverse(!isReverse);
                }}
                className="btn btn-sm btn-neut"
              >
                <FilterListRoundedIcon
                  fontSize="small"
                  className={isReverse ? "rotate-180" : ""}
                />
              </div>
            </div>
          }
        >
          <div className="panel_table overflow-x-auto h-[72vh] lg:max-w-[calc(100vw-26.5rem)] md:max-w-[calc(100vw-18.5rem)]">
            {orderedAllUsers && (
              <>
                {orderedAllUsers.length !== 0 ? (
                  <div className="min-w-max sm:min-w-[900px] relative">
                    <div className="admin_Panel_Hs_Table flex text-sm items-center sm:grid grid-cols-20 sm:grid-cols-12 *:shrink-0">
                      <div className="w-16 sm:w-auto sm:col-span-1 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                          شناسه
                        </span>
                      </div>
                      <div className="w-24 sm:w-auto sm:col-span-2 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                          نام کامل
                        </span>
                      </div>
                      <div className="w-28 sm:w-auto sm:col-span-2 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                          نام کاربری
                        </span>
                      </div>
                      <div className="w-36 sm:w-auto sm:col-span-3 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                          ایمیل
                        </span>
                      </div>
                      <div className="w-60 sm:w-auto sm:col-span-4 text-center">
                        <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body"></span>
                      </div>
                    </div>
                    <div className="*:odd:bg-d-neut-seco-panel">
                      {orderedAllUsers?.length !== 0 ? (
                        orderedAllUsers?.map((user, index) => (
                          <AllUsersListItem
                            user={{ ...user }}
                            id={
                              isReverse
                                ? index
                                : orderedAllUsers.length - index - 1
                            }
                            index={index}
                            deleteUser={deleteUser}
                            banUser={banUser}
                            changeRoleUser={changeRoleUser}
                            key={user._id}
                          />
                        ))
                      ) : (
                        <div className="h-36 pt-6 grid sm:place-content-center sm:ps-0 ps-[40vw]">
                          <WrapperLoader />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <NotSearchRes />
                )}
              </>
            )}
          </div>
        </DataCotainerBox>
        <DataCotainerBox title="لیست ادمین‌ها">
          <div className="panel_table overflow-x-auto h-[72vh] lg:max-w-[calc(100vw-26.5rem)] md:max-w-[calc(100vw-18.5rem)]">
            {allAdmins && (
              <>
                <div className="min-w-max sm:min-w-[900px] relative">
                  <div className="admin_Panel_Hs_Table flex text-sm items-center sm:grid grid-cols-20 sm:grid-cols-12 *:shrink-0">
                    <div className="w-16 sm:w-auto sm:col-span-1 text-center">
                      <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                        شناسه
                      </span>
                    </div>
                    <div className="w-24 sm:w-auto sm:col-span-2 text-center">
                      <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                        نام کامل
                      </span>
                    </div>
                    <div className="w-28 sm:w-auto sm:col-span-2 text-center">
                      <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                        نام کاربری
                      </span>
                    </div>
                    <div className="w-36 sm:w-auto sm:col-span-3 text-center">
                      <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body">
                        ایمیل
                      </span>
                    </div>
                    <div className="w-60 sm:w-auto sm:col-span-4 text-center">
                      <span className="text-caption line-clamp-1 font-[dana-xb] xs:text-body"></span>
                    </div>
                  </div>
                  <div className="*:odd:bg-d-neut-seco-panel">
                    {allAdmins?.length !== 0 ? (
                      allAdmins?.map((user, index) => (
                        <AllUsersListItem
                          user={{ ...user }}
                          id={isReverse ? index : allAdmins.length - index - 1}
                          index={index}
                          deleteUser={deleteUser}
                          banUser={banUser}
                          changeRoleUser={changeRoleUser}
                          key={user._id}
                        />
                      ))
                    ) : (
                      <div className="h-36 pt-6 grid sm:place-content-center sm:ps-0 ps-[40vw]">
                        <WrapperLoader />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </DataCotainerBox>
      </div>
      {isShowAlert.delete && (
        <DeleteAlertPA
          deleteHandler={deleteUserHandler}
          closeAlerts={closeAlerts}
          name={targetUser?.username}
        />
      )}
      {isShowAlert.ban && (
        <DeleteAlertPA
          isBan
          deleteHandler={banUserHandler}
          closeAlerts={closeAlerts}
          name={targetUser?.username}
        />
      )}
      {isShowAlert.changeRole && (
        <AlertP
          title={`آیا از تغیر نقش این ${
            targetUser?.role === "ADMIN" ? "ادمین" : "کاربر"
          } به ${
            targetUser?.role === "USER" ? "ادمین" : "کاربر"
          } اطمینان دارید؟`}
        >
          <div className="flex justify-center gap-3 pt-4">
            <Button
              onClick={closeAlerts}
              styles="!bg-neutral-500 dark:!bg-neutral-700 !py-1.5 sm:!w-auto sm:!px-10 !w-full"
            >
              خیر
            </Button>
            <Button
              onClick={changeRoleUserHandler}
              styles="!py-1.5 sm:!w-auto sm:!px-10 !w-full"
            >
              بله
            </Button>
          </div>
        </AlertP>
      )}
      {(isShowAlert.changeRole || isShowAlert.delete || isShowAlert.ban) && (
        <CoverPageP z="z-40" onClick={closeAlerts} />
      )}
    </>
  );
}

export default AllUsersList;
