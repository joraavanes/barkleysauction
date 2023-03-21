import { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";

type UserInfo = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};

const UserRegisterPage: NextPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const handleRegisterSubmit = (e: FormEvent<HTMLFormElement>) =>
    e.preventDefault();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  return (
    <div>
      <h1>Register</h1>
      <div>
        <form onSubmit={handleRegisterSubmit}>
          <div>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={userInfo.email}
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
                autoComplete="off"
                value={userInfo.password}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="firstname">
              Firstname
              <input
                type="text"
                name="firstname"
                id="firstname"
                autoComplete="off"
                value={userInfo.firstname}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="lastname">
              Lastname
              <input
                type="text"
                name="lastname"
                id="lastname"
                autoComplete="off"
                value={userInfo.lastname}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegisterPage;
