import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-neutral-50/90 backdrop-blur-md py-4 transition-all">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center transition-transform active:scale-95"
            >
              <Logo width="70px" />
            </Link>
          </div>

          <ul className="flex items-center gap-2 sm:gap-4 ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-4 py-2 text-sm font-medium text-neutral-700 transition-all duration-200 rounded-full hover:bg-neutral-900 hover:text-white"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}
            {authStatus && (
              <li className="pl-2 border-l border-neutral-200">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
