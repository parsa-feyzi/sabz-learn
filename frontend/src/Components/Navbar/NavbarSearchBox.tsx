import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Link } from "react-router";
import type { T_searchValueSlice } from "../../Types/type";
import { useDispatch, useSelector } from "react-redux";
import { globalSearchHandler } from "../../Redux/slices/globalSearchSlice";
import { useNavigate } from "react-router";
import { showSearchModalTagle } from "../../Redux/slices/isShowSearchModalSlice";

function NavbarSearchBox({ display = "flex", isModal }: { display?: string; isModal?: boolean }) {
  const searchValue = useSelector(
    (state: T_searchValueSlice) => state.globalSearch.infos.value
  );

  const isShowSearchModal = useSelector(
    (state: { isShowSearchModal: { isShow: boolean } }) =>
      state.isShowSearchModal.isShow
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const goToSearchResulve = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/category-courses/courses");
    isShowSearchModal && dispatch(showSearchModalTagle());
  };


  return (
    <form
      onSubmit={(e) => goToSearchResulve(e)}
      className={`${display} ${
        isModal ? "absolute top-14 left-1/2 -translate-x-1/2" : ""
      } h-[3.25rem] bg-neut-seco items-center content-center px-4 dark:bg-d-neut-ther rounded-full overflow-hidden`}
    >
      <input
        onChange={(e) => dispatch(globalSearchHandler(e))}
        value={searchValue}
        placeholder="چیو میخای یاد بگیری؟"
        className="bg-inherit font-[dana-xl] 2xl:w-60 xl:w-52 w-auto border-none outline-none text-sm h-full"
        type="text"
      />
      <Link
        onClick={() => isShowSearchModal && dispatch(showSearchModalTagle())}
        to="/category-courses/courses"
      >
        <SearchRoundedIcon />
      </Link>
    </form>
  );
}

export default NavbarSearchBox;
