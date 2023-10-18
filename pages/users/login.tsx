import { ChangeEvent, FormEvent, useState } from "react";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

const UserLoginPage: NextPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });

    if (result?.ok && !result.error) {
      window.location.href = "/";
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  return (
    <>
      <Head>
        <title>{`Login | Barkley's Auction`}</title>
      </Head>
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-12 col-sm-10 offset-sm-1">
            <h2>Login</h2>
            <hr />
            <div className="row">
              <div className="col-12 col-md-6 order-md-2">
                <div className="row">
                  <div className="col-10 offset-1 mt-1">
                    <h2 className="text-center">
                      Welcome to Barkley&apos;s Auction
                    </h2>
                    <Image
                      src={"/brand-1.png"}
                      width={1200}
                      height={1200}
                      priority={true}
                      alt="Barkley's Auction"
                    />
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, quas eligendi per ut, in pri
                  epicuri probatus. Te vel vocibus placerat scripserit, sit stet
                  qualisque adversarium in.
                </p>
              </div>

              <div className="col-12 col-md-6 order-md-1 mt-3">
                <p>
                  You can login through the form below. You can also login
                  through your facebook or twitter account.
                </p>
                <div className="row">
                  <div className="col-10 offset-1 mt-5 mb-5">
                    <form onSubmit={handleLoginSubmit}>
                      <p>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Username or Email"
                          value={credentials.email}
                          onChange={handleInputChange}
                        />
                      </p>
                      <p>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Password"
                          value={credentials.password}
                          onChange={handleInputChange}
                        />
                      </p>
                      <p className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary mt-2"
                          style={{ width: "50%" }}
                        >
                          Login
                        </button>
                      </p>
                    </form>
                  </div>
                  <div className="col-10 offset-1 mt-1 mb-5">
                    <h1 className="text-center">Or</h1>
                    <Link href="/users/register" style={{ width: "80%" }}>
                      <a href="" className="btn btn-primary d-block mx-auto">
                        You can also register here :)
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLoginPage;
