import type { JSX } from "react";

// setState types
export type T_setBoolean = React.Dispatch<React.SetStateAction<boolean>>;

export type T_setString = React.Dispatch<React.SetStateAction<string>>;

export type T_setVerifyCode = React.Dispatch<
  React.SetStateAction<{
    code1: string;
    code2: string;
    code3: string;
    code4: string;
    code5: string;
  }>
>;

// events
export type T_InputEvent = React.ChangeEvent<HTMLInputElement>;

// types
export type T_size = "small" | "large" | "base";

export type T_Theme = "light" | "dark"

export type T_themSlice = { them: { them: T_Theme } };

export type T_isShowChatModalSlice = { isShowChatModal: { isShow: boolean } };

export type T_isShowSidebarSlice = { isShowSidebar: { isShow: boolean } };

export type T_ThemSwitcher = {
  lightStyle: JSX.Element;
  darkStyle: JSX.Element;
};

type T_categoryID = {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  name: string;
};
// __*__start SingleCourseData__*__ //
// ____start creator____ //
export type T_creator = {
  createdAt: string;
  email: string;
  name: string;
  phone: string;
  profile?: string;
  role: "ADMIN" | "USER";
  updatedAt: string;
  username: string;
  __v: number;
  _id: string;
};
// ____end creator____ //

// ____start comment____ //
export type T_answerContent = {
  answer: number;
  body: string;
  course: string;
  createdAt: string;
  creator: T_creator;
  isAnswer: 0 | 1;
  mainCommendID: string;
  score: number;
  updatedAt: string;
  __v: number;
  _id: string;
};

export type T_comment = {
  answer: 0 | 1;
  answerContent: T_answerContent;
  course: string;
  body: string;
  createdAt: string;
  creator: T_creator;
  isAnswer: 0 | 1;
  score: number;
  updatedAt: string;
  __v: number;
  _id: string;
};
// ____end comment____ //

// ____start sessions____ //
export type T_sessions = {
  course: string;
  createdAt: string;
  free: 0 | 1;
  time: string;
  title: string;
  video: string;
  updatedAt: string;
  __v: number;
  _id: string;
};
// ____end sessions____ //

export type T_SingleCourseData = {
  _id: string;
  name: string;
  description: string;
  cover: string;
  support: string;
  shortName: string;
  price: number;
  isComplete: 0 | 1;
  status: string;
  discount: number;
  categoryID: T_categoryID;
  creator: T_creator;
  createdAt: string;
  updatedAt: string;
  __v: number;
  courseStudentsCount: number;
  sessions: T_sessions[] | [];
  comments: T_comment[] | [];
  isUserRegisteredToThisCourse: boolean;
};
// __*__end SingleCourseData__*__ //

// __*__start SingleArticleData__*__ //
export type T_SingleArticleDatas = {
  _id: string;
  title: string;
  description: string;
  body: string;
  cover: string;
  shortName: string;
  categoryID: T_categoryID;
  creator: T_creator;
  publish: 0 | 1;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
// __*__end SingleArticleData__*__ //

//__*__start CoursesData__*__//
export type T_CoursesData = {
  _id: string;
  name: string;
  description?: string;
  cover: string;
  support: string;
  shortName: string;
  price: number;
  isComplete: 0 | 1;
  status: "start" | "presell";
  discount: number;
  categoryID: T_categoryID;
  creator: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  registers: number;
  courseAverageScore: number;
};
//__*__end CoursesData__*__//

//__*__start ArticlesData__*__//
export type T_ArticlesData = {
  body: string;
  categoryID: string;
  cover: string;
  createdAt: string;
  creator: T_creator;
  description: string;
  publish: 0 | 1;
  shortName: string;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
};
//__*__end ArticlesData__*__//

//__*__start CategoriesData__*__//
export type T_CategoriesData = {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  name: string;
};
//__*__end CategoriesData__*__//

//__*__start SessionData*__//
export type T_SessionData = {
  course: null | {
    name: string;
    _id: string;
  };
  createdAt: string;
  free: number;
  time: string;
  title: string;
  updatedAt: string;
  video: string;
  __v: number;
  _id: string;
};
//__*__end SessionData*__//

//__*__start TargetSessionData*__//
export type T_TargetSessionData = {
  course: string;
  createdAt: string;
  free: 0 | 1;
  time: string;
  title: string;
  updatedAt: string;
  video: string;
  __v: number;
  _id: string;
};
//__*__end TargetSessionData*__//

//__*__start SingleSessionData*__//
export type T_SingleSessionData = {
  sessions: T_SessionData[];
  session: T_TargetSessionData;
};
//__*__end SingleSessionData*__//

//__*__start Menu*__//
export type T_submenu = {
  createdAt: string;
  href: string;
  parent: string;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

export type T_menu = {
  createdAt: string;
  href: string;
  submenus: T_submenu[] | [];
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
};
//__*__end Menu*__//

//__*__start Code*__//
export type T_code = {
  code: string;
  course: string;
  createdAt: string;
  creator: string;
  max: number;
  percent: string;
  updatedAt: string;
  uses: number;
  __v: number;
  _id: string;
};
//__*__end Code*__//

//__*__start Transaction*__//
export type T_Transaction = {
  _id: string;
  course: null | {
    _id: string;
    name: string;
    description: string;
    cover: string;
    support: string;
    shortName: string;
    price: number;
    isComplete: 0 | 1;
    status: string;
    discount: number;
    categoryID: string;
    creator: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  user: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
//__*__end Transaction*__//

//__*__start DepartmentsList*__//
export type T_DepartmentList = {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
//__*__end DepartmentsList*__//

//__*__start Ticket*__//
export type T_Ticket = {
  _id: string;
  departmentID: string;
  departmentSubID: string;
  priority: 1 | 2 | 3;
  title: string;
  body: string;
  user: string;
  answer: 0 | 1;
  course?: string;
  isAnswer: 0 | 1;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
//__*__end Ticket*__//

//__*__start switchThem*__//
export type T_SwitchThem = {
  theme?: T_Theme;
  toggleTheme?: () => void;
  isDark?: boolean;
}
//__*__end switchThem*__//


export type T_PAinfos = { count: number; title: string };

export type T_CourseBoxInfo = {
  children: JSX.Element;
  title: string | number;
  info: string | number;
  seco?: boolean;
  isSessionPage?: boolean;
};

export type T_Breadcrumb = { title: React.ReactNode; href: string; id: number };

export type T_FormValues = {
  name?: string;
  username?: string;
  tel?: string;
  email?: string;
  password?: string;
  message?: string;
};

export type T_FormInput = React.ComponentProps<"input"> & {
  value?: string | File | null;
  setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  isSubmited: boolean;
  placeholder?: string;
  icon: React.JSX.Element;
  isContactInput?: boolean;
  isAdminRegister?: boolean;
  fileName?: string;
};

export type T_setFormValues = React.Dispatch<
  React.SetStateAction<T_FormValues>
>;

export type T_AlertIsShow = {
  userFullName: string;
  isShow: boolean;
};

export type T_setAlertShow = (userFullName?: string) => void;

export type T_userInfos = {
  createdAt: string;
  email: string;
  name: string;
  role: "ADMIN" | "USER";
  updatedAt: string;
  username: string;
  __v: number;
  _id: string;
  courses?: T_CoursesData[];
  notifications?: T_Notif[];
  phone?: "09918765421";
  profile?: "/images/saeedi.png";
};

export type T_RoadMapsBox = {
  bg: string;
  icon: JSX.Element;
  title: string;
  coursesNumber?: number;
  href: string;
};

export type T_CategorySubLink = { title: string; href: string; id: number };

export type T_categoryList = { id: number; title: string; key: string };

export type T_searchResulve = {
  allResultCourses: T_CoursesData[];
  allResultArticles: T_ArticlesData[];
};

export type T_searchValueSlice = { globalSearch: { infos: { value: string } } };

export type T_searchResulveSlice = {
  globalSearch: {
    infos: {
      resulve: null | T_searchResulve;
    };
  };
};

export type T_ContactDatas = {
  answer: 0 | 1;
  body: string;
  createdAt: string;
  email: string;
  name: string;
  phone: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

export type T_Notif = {
  msg: string;
  _id: string;
};

export type T_IconProp = { size?: T_size };

export type T_SidebarP_Links = {
  title: string;
  href?: string;
  icon?: JSX.Element;
};
