import { Outlet } from "react-router-dom";
import UserSideNav from "../../components/UserSideNav";

export default function UserLayout() {
  return (
    <div className="bg-neutral-100 py-16 text-xl text-gray-600">
      <div className="px-36 w-full">
        <div className=" grid-cols-12 gap-6 md:grid-cols-12 flex">
          {/* <div className="md:col-span-1 lg:col-span-1 flex-[0.5]">
            <UserSideNav />
          </div> */}
          <div className="md:col-span-10 lg:col-span-11 flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
