import Article from "../Pages/Article/Article";
import Cart from "../Pages/Cart/Cart";
import ArticlesCategory from "../Pages/Category/ArticlesCategory";
import CoursesCategory from "../Pages/Category/CoursesCategory";
import CoursesTeachersCategory from "../Pages/Category/CoursesTeachersCategory";
import Contact from "../Pages/Contact/Contact";
import Course from "../Pages/Courses/Course";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import AdminPanel from "../Pages/Panel/AdminPanel/AdminPanel";
import ArticleDraftPA from "../Pages/Panel/AdminPanel/pages/ArticleDraftPA/ArticleDraftPA";
import ArticlesPA from "../Pages/Panel/AdminPanel/pages/ArticlesPA/ArticlesPA";
import CategoriesPA from "../Pages/Panel/AdminPanel/pages/CategoriesPA/CategoriesPA";
import CommentsPA from "../Pages/Panel/AdminPanel/pages/CommentsPA/CommentsPA";
import ContactPA from "../Pages/Panel/AdminPanel/pages/ContactPA/ContactPA";
import CoursesPA from "../Pages/Panel/AdminPanel/pages/CoursesPA/CoursesPA";
import EditCoursesPA from "../Pages/Panel/AdminPanel/pages/CoursesPA/EditCoursesPA";
import DiscountCode from "../Pages/Panel/AdminPanel/pages/DiscountCode/DiscountCodePA";
import HomePA from "../Pages/Panel/AdminPanel/pages/HomePA/HomePA";
import MenuPA from "../Pages/Panel/AdminPanel/pages/MenuPA/MenuPA";
import SessionsPA from "../Pages/Panel/AdminPanel/pages/SessionsPA/SessionsPA";
import TicketsPA from "../Pages/Panel/AdminPanel/pages/TicketsPA/TicketsPA";
import UsersPA from "../Pages/Panel/AdminPanel/pages/UsersPA/UsersPA";
import UserPanel from "../Pages/Panel/UserPanel/UserPanel";
import CoursesPU from "../Pages/Panel/UserPanel/pages/CoursesPU/CoursesPU";
import HomePU from "../Pages/Panel/UserPanel/pages/HomePU/HomePU";
import ChatTicket from "../Pages/Panel/UserPanel/pages/TicketsPU/ChatTicket";
import CreateTicketPU from "../Pages/Panel/UserPanel/pages/TicketsPU/CreateTicketPU";
import TicketsPU from "../Pages/Panel/UserPanel/pages/TicketsPU/TicketsPU";
import TransactionsPU from "../Pages/Panel/UserPanel/pages/TransactionsPU/TransactionsPU";
import Session from "../Pages/Session/Session";
import ForgetPass from "../Pages/Submit/ForgetPass/ForgetPass";
import Login from "../Pages/Submit/Login/Login";
import LoginByMail from "../Pages/Submit/LoginByMail/LoginByMail";
import Register from "../Pages/Submit/Register/Register";
import VerifyCode from "../Pages/Submit/VerifyCode/VerifyCode";
import TermsCondition from "../Pages/TermsCondition/TermsCondition";
import PAdminPrivateRoute from "./PrivateRoutes/PAdminPrivateRoute";
import PUserPrivateRoute from "./PrivateRoutes/PUserPrivateRoute";

const routes = [
    // main routes
    { path: "/", element: <Home /> },
    { path: "/cart", element: <Cart /> },
    { path: "/category-courses/:categoryName", element: <CoursesCategory /> },
    { path: "/category-articles/:categoryName", element: <ArticlesCategory /> },
    { path: "/teacher-courses/:teacherName", element: <CoursesTeachersCategory /> },
    { path: "/course-info/:courseName", element: <Course /> },
    { path: "/article-info/:articleName", element: <Article /> },
    { path: "/contact", element: <Contact /> },
    { path: "/:courseName/:sessionId", element: <Session /> },
    { path: "/terms-condition", element: <TermsCondition /> },
    // submit routes
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/login-by-email", element: <LoginByMail /> },
    { path: "/forget-password", element: <ForgetPass /> },
    { path: "/verify-code", element: <VerifyCode /> },
    // admin panel
    { path: "/panel-admin/*", element: <PAdminPrivateRoute><AdminPanel /></PAdminPrivateRoute>, children: [
        { path: "", element: <HomePA /> },
        { path: "courses", element: <CoursesPA /> },
        { path: "courses/edit/:courseName", element: <EditCoursesPA /> },
        { path: "sessions", element: <SessionsPA /> },
        { path: "articles", element: <ArticlesPA /> },
        { path: "articles/draft/:articleName", element: <ArticleDraftPA/> },
        { path: "users", element: <UsersPA /> },
        { path: "tickets", element: <TicketsPA /> },
        { path: "categories", element: <CategoriesPA /> },
        { path: "contact", element: <ContactPA /> },
        { path: "menu", element: <MenuPA /> },
        { path: "comments", element: <CommentsPA /> },
        { path: "discount-code", element: <DiscountCode /> },
    ] },
    // user panel
    { path: "/my-panel/*", element: <PUserPrivateRoute><UserPanel /></PUserPrivateRoute>, children: [
        { path: "", element: <HomePU /> },
        { path: "courses", element: <CoursesPU /> },
        { path: "transactions", element: <TransactionsPU /> },
        { path: "tickets", element: <TicketsPU /> },
        { path: "tickets/create", element: <CreateTicketPU /> },
        { path: "tickets/chat/:ticketName", element: <ChatTicket /> },
    ] },
    //  not found routes
    { path: "*", element: <NotFound /> },
]

export default routes