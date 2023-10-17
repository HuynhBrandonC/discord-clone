import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <img
        className="absolute top-0 left-0 object-cover h-screen w-screen z-[-1]"
        src="https://images.alphacoders.com/129/1291249.png"
        alt="discord background"
      />
      <nav className="flex justify-between items-center py-3 px-6">
        <div className="flex items-center">
          <svg
            className="homeIcon-r0w4 m-0 p-0 text-white"
            aria-hidden="true"
            role="img"
            width="32"
            height="24"
            viewBox="0 0 28 20"
          >
            <path
              fill="currentColor"
              d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z"
              data-darkreader-inline-fill=""
            ></path>
          </svg>
          <h1 className="text-3xl font-bold text-white ml-3">Discord</h1>
        </div>
        <Link
          to="/login"
          className="text-black text-sm bg-white py-1.5 px-3 rounded-full"
        >
          Login
        </Link>
      </nav>
      <div className=" w-full mt-24 ">
        <div className="text-white max-w-lg mx-auto">
          <h1 className="text-white text-6xl font-bold text-center mb-12">
            IMAGINE A PLACE...
          </h1>
          <p className="text-white text-xl text-center">
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community. Where just you and a handful of friends can
            spend time together. A place that makes it easy to talk every day
            and hang out more often.
          </p>
        </div>
      </div>
    </div>
  );
};
