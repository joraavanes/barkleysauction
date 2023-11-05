import { GetServerSideProps, NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import { getSession } from "next-auth/react";
import useMutate from "@/hooks/useMutate";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Status } from "@/shared/types";

type RegisterData = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};

const UserRegisterPage: NextPage = () => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const { mutate, state } = useMutate("/api/users/signup", {
    method: "POST",
    timeout: 5000,
    ContentType: "application/json",
  });

  const handleRegisterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(registerData);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  return (
    <>
      <Head>
        <title>{`Register | Barkley's Auction`}</title>
      </Head>
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-12 col-sm-10 offset-sm-1">
            <h2>Register</h2>
            <hr />
            <div className="row">
              <div className="col-12 col-md-6 order-md-2">
                <div className="row">
                  <div className="col-10 offset-1">
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
                  You can register through the form below. You can also login
                  through your facebook or twitter account.
                </p>
                <form onSubmit={handleRegisterSubmit}>
                  <p>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Username or Email"
                      value={registerData.email}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={registerData.password}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <input
                      type="text"
                      name="firstname"
                      className="form-control"
                      placeholder="Firstname"
                      value={registerData.firstname}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <input
                      type="text"
                      name="lastname"
                      className="form-control"
                      placeholder="Lastname"
                      value={registerData.lastname}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: "50%" }}
                      disabled={state.status === Status.loading}
                    >
                      {state.status === Status.loading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          aria-hidden="true"
                        ></span>
                      ) : null}
                      {` `}
                      Register
                    </button>
                  </p>
                </form>
                {state.isError && state.errorMessage ? (
                  <p className="primary-pink text-center">
                    {state.errorMessage}
                  </p>
                ) : state.isSuccess ? (
                  <p className="text-center text-success">
                    You&apos;ve successfully registered at Barley&apos;s. Please{" "}
                    <Link href="/users/login">
                      <a className="text-decoration-dashed">login now!</a>
                    </Link>
                  </p>
                ) : null}
                <h1 className="text-center">Or</h1>

                <Link href="/users/login" style={{ width: "80%" }} passHref>
                  <a href="" className="btn btn-primary d-block mx-auto">
                    You can also log in here :)
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default UserRegisterPage;
