import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { getDetailUser } from "../../../../store/action";
import { AddModal } from "../modal/AddModal";
import { Iprops } from "../../../../Interface";
import SearchComponent from "../search";

// Header nhận props title từ các PAGES
const AdminHeader = (props: Iprops) => {
  const userDetail = useSelector(
    (state: any) => state?.userReducer?.userDetail
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getDetailUser());
  }, []);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = (open: boolean) => {
    setOpen(open);
  };

  return (
    <div>
      <AddModal title={props.title} open={open} handleClose={handleClose} />
      <form className="flex items-center pb-5">
        <div className="p-4 uppercase font-semibold text-xl">{props.title}</div>
        <label htmlFor="voice-search" className="sr-only">
          Search
        </label>
        <div className="relative w-[70%]">
          <SearchComponent slug={props.slug} />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <svg
              className="w-4 h-4 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>

        {props.title !== "USERS" && (
          <Button className="m-2" onClick={handleOpen}>
            THÊM
          </Button>
        )}
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <NavLink to={"/profile"}>Setting</NavLink>
        </button>
        {/* B1 KHI CLICK vào nút THÊM ở Header thì chỉ thay đổi trạng thái của open */}
        <div className="Account">
          <>
            <button
              id="dropdownUserAvatarButton"
              data-dropdown-toggle="dropdownAvatar"
              className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              type="button"
            >
              <NavLink to={"/profile"}>
                <img
                  style={{
                    objectFit: "cover",
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                  }}
                  src={`${userDetail?.avatar}`}
                  alt=""
                />
              </NavLink>
            </button>
          </>
        </div>
      </form>
    </div>
  );
};

export default AdminHeader;
