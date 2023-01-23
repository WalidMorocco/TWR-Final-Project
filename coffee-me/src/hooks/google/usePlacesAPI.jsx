import axios from "axios";
import { useState, useEffect } from "react";

const apiKey = `AIzaSyA31rb_whwOi1F5Kl-GKUzg1ChdOX-UZAk`;
const baseURL = `https://maps.googleapis.com/maps/api/place/`;

const usePlaces = (reqType, reqParams) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        console.log(`${baseURL}${reqType}/json?key=${apiKey}&${reqParams}`);
        const response = await axios.get(
          `${baseURL}${reqType}/json?key=${apiKey}&${reqParams}`
        );
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
