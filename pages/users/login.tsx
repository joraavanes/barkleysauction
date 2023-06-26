import { randomBytes } from "crypto";
import { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";

const sleep = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

async function loginUser(email: string, password: string) {
  await sleep(3000);
  return Promise.resolve({
    email,
    password,
    token: randomBytes(4).toString("hex"),
  });
}

const UserLoginPage: NextPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = credentials;

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginUser(email, password);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  return (
    <>
      <h2>Login</h2>
      <div>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                id="email"
                value={credentials.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                id="password"
                value={credentials.password}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserLoginPage;
