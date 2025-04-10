import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO(Complete): make a POST request to the login route
  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });
    if (!response.ok) throw new Error("Login Failed");
    const data = await response.json();
    console.log("client-data", data);
    return data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export { login };
