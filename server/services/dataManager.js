import { model } from "mongoose";
import { computeDistanceBetween, LatLng } from "spherical-geometry-js";
import {
  getNearbyPlaces,
  getPlacePhoto,
  getPlaceDetails,
} from "../services/google/places.js";

import "../models/Store.js";
const Store = model("stores");

import "../models/Search.js";
const Search = model("searches");

const getCachedNearbySearch = async (lat, lng) => {
  const result = await Search.findOne({
    location: { lat: lat, lng: lng },
  })
    .exec()
    .catch((err) => {
      console.error(err);
    });

  const search = JSON.parse(JSON.stringify(result));
  return search;
};

const getCachedStore = async (storeId) => {
  const result = await Store.findOne({ storeId: storeId })
    .exec()
    .catch((err) => {
      console.error(err);
    });

  const store = JSON.parse(JSON.stringify(result));
  return store;
};

export async function getNearbyStores(lat, lng, radius) {
  const cachedSearch = await getCachedNearbySearch(lat, lng);

  let rawStores;
  if (cachedSearch) {
    rawStores = JSON.parse(cachedSearch.results);
  } else {
    rawStores = await getNearbyPlaces(lat, lng, radius);
    console.log(`Stores fetched: ${rawStores}`);

    const newSearch = new Search({
      location: {
        lat: lat,
        lng: lng,
      },
      results: JSON.stringify(rawStores),
    });

    newSearch.save();
  }

  const stores = rawStores?.results?.map(
    (s) =>
      new Store({
        storeId: s.place_id,
        name: s.name,
        location: {
          address: s.vicinity,
          lat: s.geometry.location.lat,
          lng: s.geometry.location.lng,
        },
        rating: s.rating,
        images: s.photos?.map((p) => p.photo_reference),
        distance: computeDistanceBetween(
          new LatLng(lat, lng),
          new LatLng(s.geometry.location.lat, s.geometry.location.lng)
        ),
      })
  );

  return stores;
}

export async function getStoreDetails(storeId) {
  const cachedStore = await getCachedStore(storeId);

  let store;
  if (cachedStore) {
    store = cachedStore;
  } else {
    const response = await getPlaceDetails(storeId);
    console.log(`Details fetched: ${response}`);

    const placeDetails = response.result;

    store = new Store({
      storeId: placeDetails.place_id,
      name: placeDetails.name,
      description: placeDetails?.editorial_summary?.overview,
      phone: placeDetails.formatted_phone_number,
      location: {
        address: placeDetails.vicinity,
        lat: placeDetails.geometry.location.lat,
        lng: placeDetails.geometry.location.lng,
      },
      delivery: placeDetails.delivery ?? false,
      driveThru: placeDetails.curbside_pickup ?? false,
      rating: placeDetails.rating,
      openingHours: placeDetails.current_opening_hours?.weekday_text,
      images: placeDetails.photos?.map((p) => p.photo_reference),
    });

    store.save().catch(function (err) {
      console.log(err);
    });
  }

  return store;
}
