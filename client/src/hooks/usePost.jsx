import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const baseURL = process.env.REACT_APP_BASE_URL;

const usePost = (urlSegment) => {
  const authContext = useContext(AuthContext);

  const [responseData, setResponseData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const postData = async (data) => {
    try {
      setLoading(true);

      console.log(`Post ${baseURL}${urlSegment}`);
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
