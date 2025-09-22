import { Link } from "react-router";
import type { T_Breadcrumb } from "../../Types/type";

function Breadcrumb({ routes }: { routes: T_Breadcrumb[] }) {
  return (
      <div className="breadcrumb_container flex items-center overflow-y-hidden overflow-x-auto content-center bg-neut-prim mb-4 dark:bg-d-neut-prim rounded-md">
        {routes.map((route) => (
          <div className="relative py-3" key={route.id}>
            <Link style={{whiteSpace: 'nowrap'}} className={`px-4 pe-8 hover:text-prim ${route.id >= routes.length ? "font-[dana-xl]" : ""}`} to={route.href}>
              {route.title}
            </Link>
            {route.id >= routes.length || (
              <>
                <span className="absolute -top-3 rounded-e bg-neut-seco dark:bg-d-neut-seco w-1.5 h-10 rotate-[33deg] rounded-sm translate-x-4"></span>
                <span className="absolute -bottom-3 rounded-s bg-neut-seco dark:bg-d-neut-seco w-1.5 h-10 -rotate-[33deg] rounded-sm translate-x-4"></span>
              </>
            )}
          </div>
        ))}
      </div>
  );
}

export default Breadcrumb;
