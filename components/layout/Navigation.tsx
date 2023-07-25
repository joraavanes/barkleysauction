import Link from "next/link";
import { useRef } from "react";
import styles from "./css/Navigation.module.css";

const Navigation: React.FC = ({}) => {
  const collapseBtnRef = useRef<HTMLButtonElement | null>(null);

  const toggleCollapse = () => {
    if (matchMedia("(max-width: 992px)").matches)
      collapseBtnRef.current?.click();
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
                <a className="navbar-brand" href="/">
                  Barkley&apos;s
                </a>
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
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/"
                      onClick={toggleCollapse}
                    >
                      Home
                    </a>
                  </Link>
                  <Link href="/items" className="nav-item">
                    <a
                      className="nav-link"
                      href="/items"
                      onClick={toggleCollapse}
                    >
                      Items
                    </a>
                  </Link>
                  <Link href="/reviews" className="nav-item">
                    <a
                      className="nav-link"
                      href="/reviews"
                      onClick={toggleCollapse}
                    >
                      Reviews
                    </a>
                  </Link>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Profile
                    </a>
                    <ul className="dropdown-menu">
                      <Link href="/items/my-items">
                        <a
                          className="dropdown-item"
                          href="/items/my-items"
                          onClick={toggleCollapse}
                        >
                          My Items
                        </a>
                      </Link>
                      <Link href="/items/create">
                        <a
                          className="dropdown-item"
                          href="/items/create"
                          onClick={toggleCollapse}
                        >
                          Add an item
                        </a>
                      </Link>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Admin
                    </a>
                    <ul className="dropdown-menu">
                      <Link href="/admin/users">
                        <a
                          className="dropdown-item"
                          href="/admin/users"
                          onClick={toggleCollapse}
                        >
                          Users
                        </a>
                      </Link>
                      <Link href="/admin/items">
                        <a
                          className="dropdown-item"
                          href="/admin/items"
                          onClick={toggleCollapse}
                        >
                          Items
                        </a>
                      </Link>
                    </ul>
                  </li>
                  <Link className="nav-item" href="/users/login">
                    <a
                      className="nav-link"
                      href="/users/login"
                      onClick={toggleCollapse}
                    >
                      Login
                    </a>
                  </Link>
                  <Link className="nav-item" href="/users/register">
                    <a
                      className="nav-link"
                      href="/users/register"
                      onClick={toggleCollapse}
                    >
                      register
                    </a>
                  </Link>
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
