import axios from "axios";

const baseURL = `https://maps.googleapis.com/maps/api/place/`;

const getFullURL = (reqType, reqParams) =>
  `${baseURL}${reqType}?key=${process.env.GOOGLE_API_KEY}&${reqParams}`;

const getPlaces = async (reqType, reqParams) => {
  try {
    const url = getFullURL(`${reqType}/json`, reqParams);
    console.log(`Calling ${url}`);
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export async function getNearbyPlaces(lat, lng, radius) {
  return await getPlaces(
    "nearbysearch",
    `location=${lat},${lng}&radius=${radius}&type=cafe`
  );
}
export async function getPlaceDetails(placeId) {
  return await getPlaces("details", `place_id=${placeId}`);
}
export async function getPlacePhoto(photoReference) {
  return getFullURL("photo", `maxwidth=400&photo_reference=${photoReference}`);
}
