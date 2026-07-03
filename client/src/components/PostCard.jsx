import React from "react";
import { Link } from "react-router-dom";

function PostCard({ _id, title, image }) {
  return (
    <Link to={`/post/${_id}`} className="block group">
      <div className="w-full bg-white border border-neutral-100 rounded-2xl p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md">
        <div className="w-full overflow-hidden rounded-xl bg-neutral-100 aspect-video mb-4">
          <img
            src={image}
            alt={title}
            className="object-cover h-full w-full transition-transform duration-500 ease-out group-hover:scale-105"
            onError={(e) => {
              e.target.src =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png";
            }}
          />
        </div>

        <h2 className="text-lg font-bold tracking-tight text-neutral-900 group-hover:text-neutral-700 transition-colors duration-200 line-clamp-2 min-h-14 flex items-start">
          {title}
        </h2>

        <div className="mt-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider group-hover:text-neutral-900 transition-colors duration-200">
          Read Article &rarr;
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
