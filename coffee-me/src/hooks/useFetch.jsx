import axios from "axios";
import { useState, useEffect } from "react";

const baseURL = `http://localhost:5000/`;

const useFetch = (reqType, reqParams) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        console.log(`Calling ${reqType}`);
        const response = await axios.get(`${baseURL}${reqType}`, reqParams);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [reqType]);

  console.log(data);
  return { data, loading, error };
};

export default usePlaces;
