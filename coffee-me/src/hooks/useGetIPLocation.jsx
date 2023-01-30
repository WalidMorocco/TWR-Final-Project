import {useState,useEffect} from 'react'
import axios from 'axios'

const useGetIPLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { ip:"", lat: "", lng: "" },
  });

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setLocation({
      loaded: true,
      coordinates: {
        ip: res.data.IPv4,
        lat: res.data.latitude,
        lng: res.data.longitude,
      },
    });
  }
  
  useEffect( () => {
    getData()
    console.log("Ip:", location.coordinates.ip)
    console.log("Lat:", location.coordinates.lat)
    console.log("Lng:", location.coordinates.lng)
  }, [])
}

export default useGetIPLocation;
