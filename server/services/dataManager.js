import { model } from "mongoose";
import { computeDistanceBetween, LatLng } from "spherical-geometry-js";
import {
  getNearbyPlaces,
  getPlacePhoto,
  getPlaceDetails,
  getPlaceReviews,
  getPlaceRating,
} from "../services/google/places.js";

import "../models/Store.js";
const Store = model("stores");

import "../models/Search.js";
const Search = model("searches");

import "../models/Favorite.js";
const Favorite = model("favorites");

import "../models/Review.js";
const Review = model("reviews");

import "../models/Rating.js";
const Rating = model("ratings");

import "../models/User.js";
const User = model("users");

const getCachedNearbySearch = async (lat, lng, radius, pageToken) => {
  const result = await Search.findOne({
    location: { lat: lat, lng: lng },
    radius: radius,
    pageToken: pageToken,
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

export async function getNearbyStores(lat, lng, radius, nextPageToken) {
  const cachedSearch = await getCachedNearbySearch(
    lat,
    lng,
    radius,
    nextPageToken
  );

  let rawStores;
  if (cachedSearch) {
    rawStores = JSON.parse(cachedSearch.results);
  } else {
    rawStores = await getNearbyPlaces(lat, lng, radius, nextPageToken);
    console.log(`Stores fetched`);

    if (rawStores?.status?.toUpperCase() === "OK") {
      const newSearch = new Search({
        createdAt: new Date(),
        location: {
          lat: lat,
          lng: lng,
        },
        radius: radius,
        pageToken: nextPageToken,
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
        rating: s.rating ?? 0,
        ratingsCount: s.user_ratings_total ?? 0,
        images: s.photos?.map((p) => p.photo_reference),
        distance: computeDistanceBetween(
          new LatLng(lat, lng),
          new LatLng(s.geometry.location.lat, s.geometry.location.lng)
        ),
      })
  );

  return {
    stores,
    nextPageToken: rawStores?.next_page_token,
  };
}

export async function getStoreDetails(storeId, cached = true, fields = null) {
  let cachedStore;
  if (cached) {
    cachedStore = await getCachedStore(storeId);
  }

  let store;
  if (cachedStore) {
    console.log("Details from cache");
    store = cachedStore;
  } else {
    const response = await getPlaceDetails(storeId, fields);
    console.log(`Details from google`);

    const placeDetails = response.result;

    store = new Store({
      createdAt: new Date(),
      storeId: storeId,
      name: placeDetails.name,
      description: placeDetails?.editorial_summary?.overview,
      phone: placeDetails.formatted_phone_number,
      location: {
        address: placeDetails.vicinity,
        lat: placeDetails.geometry?.location?.lat,
        lng: placeDetails.geometry?.location?.lng,
      },
      delivery: placeDetails.delivery ?? false,
      curbsidePickup: placeDetails.curbside_pickup ?? false,
      rating: placeDetails.rating ?? 0,
      ratingsCount: placeDetails.user_ratings_total ?? 0,
      openingHours: placeDetails.current_opening_hours?.weekday_text,
      openNow: placeDetails.current_opening_hours?.open_now,
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

    if (cached) {
      console.log("Caching Details");
      store.save().catch(function (err) {
        console.log(err);
      });
    }
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

export async function getAverageRating(
  storeId,
  googleRating,
  googleRatingCount
) {
  const coffeeMeRating = await Rating.findOne({ storeId: storeId })
    .exec()
    .catch((err) => {
      console.error(err);
    });

  if (!coffeeMeRating) {
    return { rating: googleRating, ratingCount: googleRatingCount };
  }

  const coffeeMeRatingSum = coffeeMeRating.ratingSum ?? 0;
  const coffeeMeRatingCount = coffeeMeRating.ratingCount ?? 0;

  const finalRatingSum = googleRating * googleRatingCount + coffeeMeRatingSum;
  const finalRatingCount = googleRatingCount + coffeeMeRatingCount;

  const finalRating =
    finalRatingCount > 1
      ? (finalRatingSum / finalRatingCount).toFixed(1)
      : finalRatingSum;

  return { rating: Number(finalRating), ratingCount: Number(finalRatingCount) };
}

export async function getStoreRating(storeId) {
  const cachedStore = await getCachedStore(storeId);

  let googleRating;
  let googleRatingCount;
  if (cachedStore) {
    googleRating = cachedStore.rating;
    googleRatingCount = cachedStore.ratingsCount;
  } else {
    const response = await getPlaceRating(storeId);
    console.log(`Rating fetched`);

    const placeRating = response.result;
    googleRating = placeRating?.rating ?? 0;
    googleRatingCount = placeRating?.user_ratings_total ?? 0;
  }

  return getAverageRating(storeId, googleRating, googleRatingCount);
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
