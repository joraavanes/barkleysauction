import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useRef } from "react";
import styles from "./css/Navigation.module.css";

const Navigation: React.FC = ({}) => {
  const collapseBtnRef = useRef<HTMLButtonElement | null>(null);
  const { data: session } = useSession();
  const { asPath } = useRouter();

  const toggleCollapse = () => {
    if (matchMedia("(max-width: 992px)").matches)
      collapseBtnRef.current?.click();
  };

  const handleLogout = () => {
    signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <div id="navigation" className="container-fluid">
      <div className="row">
        <div className="col">
          <nav
            className={`navbar navbar-expand-lg bg-body-tertiary ${styles.bgPink}`}
          >
            <div className="container-fluid">
              <Link href="/">
                <span className="navbar-brand">Barkley&apos;s</span>
              </Link>
              <button
                ref={collapseBtnRef}
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <Link href="/" className="nav-item">
                    <span
                      className={`nav-link${asPath === "/" ? " active" : ""}`}
                      aria-current="page"
                      onClick={toggleCollapse}
                    >
                      Home
                    </span>
                  </Link>
                  <Link href="/items" className="nav-item">
                    <span
                      className={`nav-link${
                        asPath === "/items" ? " active" : ""
                      }`}
                      onClick={toggleCollapse}
                    >
                      Items
                    </span>
                  </Link>
                  <Link href="/reviews" className="nav-item">
                    <span
                      className={`nav-link${
                        asPath === "/reviews" ? " active" : ""
                      }`}
                      onClick={toggleCollapse}
                    >
                      Reviews
                    </span>
                  </Link>
                  {session ? (
                    <li className="nav-item dropdown">
                      <span
                        className={`nav-link dropdown-toggle${
                          asPath === "/items/my-items" ||
                          asPath === "/items/create"
                            ? " active"
                            : ""
                        }`}
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {`Hi ${session.user?.name} !`}
                      </span>
                      <ul className="dropdown-menu">
                        <Link href="/items/my-items">
                          <span
                            className="dropdown-item"
                            onClick={toggleCollapse}
                          >
                            My Items
                          </span>
                        </Link>
                        <Link href="/items/create">
                          <span
                            className="dropdown-item"
                            onClick={toggleCollapse}
                          >
                            Add an item
                          </span>
                        </Link>
                        <li className="nav-item">
                          <span
                            className="dropdown-item"
                            onClick={handleLogout}
                          >
                            Log out
                          </span>
                        </li>
                      </ul>
                    </li>
                  ) : null}

                  <li className="nav-item dropdown">
                    <span
                      className={`nav-link dropdown-toggle${
                        asPath === "/admin/items" || asPath === "/admin/users"
                          ? " active"
                          : ""
                      }`}
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Admin
                    </span>
                    <ul className="dropdown-menu">
                      <Link href="/admin/users">
                        <span
                          className="dropdown-item"
                          onClick={toggleCollapse}
                        >
                          Users
                        </span>
                      </Link>
                      <Link href="/admin/items">
                        <span
                          className="dropdown-item"
                          onClick={toggleCollapse}
                        >
                          Items
                        </span>
                      </Link>
                    </ul>
                  </li>
                  {!session ? (
                    <>
                      <Link className="nav-item" href="/users/login">
                        <span
                          className={`nav-link${
                            asPath === "/users/login" ? " active" : ""
                          }`}
                          onClick={toggleCollapse}
                        >
                          Login
                        </span>
                      </Link>
                      <Link className="nav-item" href="/users/register">
                        <span
                          className={`nav-link${
                            asPath === "/users/register" ? " active" : ""
                          }`}
                          onClick={toggleCollapse}
                        >
                          Register
                        </span>
                      </Link>
                    </>
                  ) : null}
                </ul>
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
