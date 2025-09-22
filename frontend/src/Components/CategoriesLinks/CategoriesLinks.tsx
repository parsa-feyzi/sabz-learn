import { useDispatch, useSelector } from "react-redux";
import type { T_CategorySubLink, T_menu } from "../../Types/type";
import CategoryLink from "./CategoryLink";
import { Link } from "react-router";
import { setCategorySubLinks } from "../../Redux/slices/categorySubLinksSlice";
import useGetMenuDatas from "../../Hooks/useGetMenuDatas";

function CategoriesLinks() {
  const menuDatas = useGetMenuDatas()

  const sublinks = useSelector(
    (state: { categorySubLinks: { subLinks: null | T_CategorySubLink[] } }) =>
      state.categorySubLinks.subLinks
  );

  const dispatch = useDispatch();

  return (
    <div
      onMouseLeave={() => dispatch(setCategorySubLinks(null))}
      className="hidden hover:block categories_container cursor-default absolute top-5 pt-5 right-2 z-[1]"
    >
      <div className="overflow-hidden flex max-h-[20rem] rounded-md !duration-75 bg-neut-prim dark:bg-d-neut-prim text-d-neut-seco dark:text-neut-prim">
        <div className="w-44">
          {menuDatas &&
            (menuDatas as T_menu[]).map((link: T_menu) => (
              <CategoryLink {...link} key={link._id} />
            ))}
        </div>
        {sublinks?.length && (
          <div className="categorysublinks_container bg-neut-seco dark:bg-d-neut-ther w-56 p-3 overflow-auto">
            <div className="flex flex-col">
              {sublinks.map((subLink) => (
                <Link
                  to={`/course-info/${subLink.href}`}
                  key={subLink.id}
                  className="categorysublinks_title line-clamp-2 text-sm my-3 hover:text-notf-seco dark:hover:text-notf"
                >
                  {subLink.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoriesLinks;
