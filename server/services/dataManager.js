import { model } from "mongoose";
import { computeDistanceBetween, LatLng } from "spherical-geometry-js";
import {
  getNearbyPlaces,
  getPlacePhoto,
  getPlaceDetails,
  getPlaceReviews,
} from "../services/google/places.js";

import "../models/Store.js";
const Store = model("stores");

import "../models/Search.js";
const Search = model("searches");

import "../models/Favorite.js";
const Favorite = model("favorites");

import "../models/Review.js";
const Review = model("reviews");

import "../models/User.js";
const User = model("users");

const getCachedNearbySearch = async (lat, lng, radius) => {
  const result = await Search.findOne({
    location: { lat: lat, lng: lng },
    radius: radius,
  })
    .exec()
    .catch((err) => {
      console.error(err);
    });

  const search = result ? JSON.parse(JSON.stringify(result)) : null;
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

const getFavoriteStore = async (storeId, userId) => {
  const result = await Favorite.findOne({ storeId: storeId, users: userId })
    .exec()
    .catch((err) => {
      console.error(err);
    });

  const store = JSON.parse(JSON.stringify(result));
  return store;
};

export async function getNearbyStores(lat, lng, radius) {
  const cachedSearch = await getCachedNearbySearch(lat, lng, radius);

  let rawStores;
  if (cachedSearch) {
    rawStores = JSON.parse(cachedSearch.results);
  } else {
    rawStores = await getNearbyPlaces(lat, lng, radius);
    console.log(`Stores fetched`);

    if (rawStores?.status?.toUpperCase() === "OK") {
      const newSearch = new Search({
        createdAt: new Date(),
        location: {
          lat: lat,
          lng: lng,
        },
        radius: radius,
        results: JSON.stringify(rawStores),
      });

      newSearch.save();
    }
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

  return stores.filter((s) => s.distance <= radius);
}

export async function getStoreDetails(storeId) {
  const cachedStore = await getCachedStore(storeId);

  let store;
  if (cachedStore) {
    store = cachedStore;
  } else {
    const response = await getPlaceDetails(storeId);
    console.log(`Details fetched`);

    const placeDetails = response.result;

    store = new Store({
      storeId: storeId,
      name: placeDetails.name,
      description: placeDetails?.editorial_summary?.overview,
      phone: placeDetails.formatted_phone_number,
      location: {
        address: placeDetails.vicinity,
        lat: placeDetails.geometry.location.lat,
        lng: placeDetails.geometry.location.lng,
      },
      delivery: placeDetails.delivery ?? false,
      curbsidePickup: placeDetails.curbside_pickup ?? false,
      rating: placeDetails.rating,
      openingHours: placeDetails.current_opening_hours?.weekday_text,
      images: placeDetails.photos?.map((p) => p.photo_reference),
      reviews: placeDetails.reviews?.map((r) => ({
        user: {
          username: r.author_name,
          picture: r.profile_photo_url,
        },
        rating: r.rating,
        text: r.text,
        timestamp: r.time,
      })),
    });

    store.save().catch(function (err) {
      console.log(err);
    });
  }

  return store;
}

export async function getStoreReviews(storeId) {
  const cachedStore = await getCachedStore(storeId);

  let reviews = [];
  if (cachedStore?.reviews) {
    reviews = cachedStore.reviews;
  } else {
    const response = await getPlaceReviews(storeId);
    console.log(`Reviews fetched`);

    const placeReviews = response.result;

    if (placeReviews?.reviews) {
      reviews = placeReviews.reviews.map((r) => ({
        user: {
          username: r.author_name,
          picture: r.profile_photo_url,
        },
        rating: r.rating,
        text: r.text,
        timestamp: r.time,
      }));
    }
  }

  const coffeeMeReviews = await Review.find({ storeId })
    .populate("user", "username picture -_id")
    .exec()
    .catch((err) => {
      console.error(err);
    });

  reviews.push(...coffeeMeReviews);

  return reviews.sort((r1, r2) => (r1.timestamp > r2.timestamp ? -1 : 1));
}

export function getStorePhoto(photoReference) {
  return getPlacePhoto(photoReference);
}

export async function getUserFavorites(userId, location) {
  const results = await Favorite.find({ users: userId })
    .exec()
    .catch((err) => {
      console.error(err);
    });

  const favorites = results?.map(
    (s) =>
      new Store({
        storeId: s.storeId,
        name: s.name,
        location: s.location,
        images: [s.image],
        distance: computeDistanceBetween(
          new LatLng(location.lat, location.lng),
          new LatLng(s.location.lat, s.location.lng)
        ),
      })
  );

  return favorites;
}
