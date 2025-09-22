import type { T_RoadMapsBox } from "../../../../Types/type";
import { Link } from "react-router";

function RoadMapsBox({ bg, icon, title, coursesNumber, href }: T_RoadMapsBox) {
  return (
    <Link to={href} className={`bg-gradient-to-r ${bg} flex flex-col py-5 text-neut-prim sm:gap-5 gap-4 rounded-2xl sm:hover:opacity-60 items-center`}>
      <div>{icon}</div>
      <div className="flex flex-col sm:gap-2 gap-0">
        <div className="text-center sm:text-lg text-base sm:font-[dana-b]">{title}</div>
        <div className="text-center sm:text-base text-sm sm:font-[dana-b]"><span className="font-[irsans] font-bold">{coursesNumber}</span> دوره</div>
      </div>
    </Link>
  );
}

export default RoadMapsBox;
