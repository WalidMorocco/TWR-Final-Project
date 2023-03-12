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

export async function getNearbyPlaces(lat, lng, radius, nextPageToken) {
  return await getPlaces(
    "nearbysearch",
    nextPageToken
      ? `pagetoken=${nextPageToken}`
      : `location=${lat},${lng}&radius=${radius}&type=cafe`
  );
}

export async function getPlaceDetails(placeId, fields) {
  return await getPlaces(
    "details",
    `place_id=${placeId}&fields=` +
      (fields ??
        "name%2C" +
          "editorial_summary/overview%2C" +
          "formatted_phone_number%2C" +
          "vicinity%2C" +
          "geometry/location%2C" +
          "delivery%2C" +
          "curbside_pickup%2C" +
          "rating%2C" +
          "user_ratings_total%2C" +
          "current_opening_hours/weekday_text%2C" +
          "photos%2C" +
          "reviews")
  );
}

export async function getPlaceReviews(placeId) {
  return await getPlaces("details", `place_id=${placeId}&fields=reviews`);
}

export async function getPlaceRating(placeId) {
  return await getPlaces(
    "details",
    `place_id=${placeId}&fields=rating%2Cuser_ratings_total`
  );
}

export function getPlacePhoto(photoReference) {
  return getFullURL("photo", `maxwidth=400&photo_reference=${photoReference}`);
}
