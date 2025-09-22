import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { Link } from "react-router";

function HeaderSectionLink({ link, label }: { link: string, label: string }) {
  return (
    <Link to={link} className="flex gap-1 justify-end sm:w-auto w-full text-sm text-gray-600 dark:text-gray-400 hover:text-prim dark:hover:text-prim">
      <div className="pt-0.5">{label}</div>
      <div className="-rotate-45"><ArrowUpwardRoundedIcon fontSize="small" /></div>
    </Link>
  );
}

export default HeaderSectionLink;
