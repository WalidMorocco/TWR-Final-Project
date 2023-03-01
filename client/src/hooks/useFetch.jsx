import axios from "axios";
import { useState, useEffect } from "react";

const baseURL = `http://localhost:5000/`;

const useFetch = (urlSegment) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        console.log(`Calling ${baseURL}${urlSegment}`);
        const response = await axios.get(`${baseURL}${urlSegment}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [urlSegment]);

  return { data, loading, error };
};

export default useFetch;
