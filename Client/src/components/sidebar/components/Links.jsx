/* eslint-disable */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
// chakra imports

export function SidebarLinks(props) {
  // Chakra color mode
  let location = useLocation();

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route.layout === "/user" && !route.hideInSidebar) {
        return (
          <Link key={index} to={"/" + route.path}>
            <div
              className={`relative mb-4 flex ${
                activeRoute(route.path) === true
                  ? "h-11 rounded-l bg-white p-1"
                  : "bg-transparent"
              } hover:cursor-pointer`}
            >
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={index}
              >
                <span
                  className={`${
                    activeRoute(route.path) === true
                      ? "font-bold text-orange-400 dark:text-white"
                      : "font-medium text-orange-400"
                  }`}
                >
                  {route.icon ? route.icon : <DashIcon />}{" "}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(route.path) === true
                      ? "font-bold text-orange-400 dark:text-white"
                      : "font-medium text-white"
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {activeRoute(route.path) ? (
                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-orange-400 dark:bg-orange-400" />
              ) : null}
            </div>
          </Link>
        );
      }
      return null; // Return null for routes that should be hidden
    });
  };

  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
