import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const baseURL = "http://localhost:5000/";

const usePost = (urlSegment) => {
  const authContext = useContext(AuthContext);

  const [responseData, setResponseData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const postData = async (data) => {
    try {
      setLoading(true);

      console.log(`post ${baseURL}${urlSegment} ${authContext.token}`);
      const response = await axios.post(
        `${baseURL}${urlSegment}`,
        data,
        authContext.loggedIn
          ? {
              headers: {
                Authorization: `Bearer ${authContext.token}`,
              },
            }
          : null
      );
      console.log(response.data);
      setResponseData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { postData, responseData, loading, error };
};

export default usePost;