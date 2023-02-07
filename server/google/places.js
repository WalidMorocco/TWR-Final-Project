const axios = require("axios");

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

module.exports = {
  getNearbyPlaces: async (lat, lon, radius) => {
    return await getPlaces(
      "nearbysearch",
      `location=${lat},${lon}&radius=${radius}&type=cafe`
    );
  },

  getPlaceDetails: async (placeId) => {
    return await getPlaces("details", `place_id=${placeId}`);
  },

  getPlacePhoto: (photoReference) =>
    getFullURL("photo", `maxwidth=400&photo_reference=${photoReference}`),
};
