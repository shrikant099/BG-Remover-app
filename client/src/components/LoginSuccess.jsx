import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookie from "js-cookie"; // Import js-cookie to handle cookies
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { jwtDecode } from "jwt-decode";

const LoginSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      Cookie.set("token", token, { expires: 7 });

      // Decode the token to get user information and dispatch setUser action to store it in Redux store.
      const decodeToken = jwtDecode(token);
      dispatch(setUser(decodeToken));

      // Redirect to the home page after successful login
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return <p>Redirecting...</p>;
};

export default LoginSuccess;
