import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { UserProfile } from "./HomePage/UserProfile";
import { apiConnector } from "../../axios/instance";
import { categories } from "../../axios/services/apis";
import { LoginBCom } from "./HomePage/LoginBCom";
import { BiChevronDown } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";

const CourseCategories = () => {
  const {
    isPending,
    isError,
    data: subLinks,
    isSuccess,
  } = useQuery({
    queryKey: ["courseCategories"],
    queryFn: async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      return res.data.data?.filter((value) => value.courses.length > 0);
    },
  });

  if (isPending) {
    return <Loader isCategoryLoader />;
  }

  if (isError) {
    return <div className="w-32 h-32 rounded-sm p-1">Error Occured</div>;
  }

  return (
    <div>
      {
        subLinks.map((category, index) => {
          return (
            <Link
              key={index}
              to={`/catalog/courses/${category._id}`}
              className="hover:bg-richblack-50 rounded-sm p-1 text-sm block"
            >
              {category.name}
            </Link>
          );
        })}
    </div>
  );
};

export const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  //   const [subLinks, setSubLinks] = useState([]);
  //  const dispatch = useDispatch();

//   async function getAllCategories() {
//     try {
//       const result = await apiConnector("GET", categories.CATEGORIES_API);
//       console.log(result);
//       const newdata = result.data.data.filter(
//         (value) => value.courses.length > 0
//       );
//       setSubLinks(newdata);
//     } catch (error) {
//       console.log("could not fetch the data form api", error);
//     }
//   }
  //   useEffect(() => {
  //     getAllCategories();
  //   }, []);
  const matchRoute = (currentLocation) => {
    return currentLocation === location.pathname;
  };
  return (
    <div
      className="bg-richblack-800  py-1 border solid transparent;
    border-radius: 10px; border-b-richblack-700 fixed w-full z-20"
    >
      <div className="flex justify-between items-center max-w-maxContent mx-auto w-11/12 ">
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={42} loading="lazy" />
        </Link>
        <nav className="hidden md:block text-xs lg:text-base">
          <ul className="flex items-center gap-4">
            {NavbarLinks.map((item, index) => (
              <li key={index} className="cursor-pointer">
                {" "}
                {item.title === "Catalog" ? (
                  <div className="text-richblack-400 flex items-center group">
                    <div>Catalog</div>
                    <div className="relative ">
                      <BiChevronDown />
                      <div className="invisible absolute group-hover:visible duration-200 right-0 top-5 translate-x-[23px] bg-richblack-5 text-richblack-700 w-max rounded-sm p-2 z-10">
                        <CourseCategories />
                        <div className="absolute w-3 h-3 rounded-sm rotate-45 bg-richblack-5 -top-[6px] right-5 -z-[1]"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to={item?.path}>
                    <p
                      className={`${
                        matchRoute(item?.path)
                          ? "text-yellow-100"
                          : "text-richblack-400"
                      }`}
                    >
                      {item?.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div>
          {token ? (
            <UserProfile Link={Link} />
          ) : (
            <div className="hidden md:block ">
              <LoginBCom link="/login">Log in</LoginBCom>
              <LoginBCom link="/signup">Sign Up</LoginBCom>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
