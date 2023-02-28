import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import HomePage from "./pages/HomePage";
import reportWebVitals from "./reportWebVitals";
import AboutUs from "./pages/AboutUs/AboutUs";
import SignUp from "./pages/SignUpPage";
import SignIn from "./pages/SignInPage";
import ProfileSettings from "./pages/ProfileSettingsPage";
import StoreDetails from "./pages/StoreDetailsPage";
import { LocationProvider } from "./context/LocationContext";

// Create root element
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <LocationProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/ProfileSettings" element={<ProfileSettings />} />
          <Route path="/StoreDetails/:storeId" element={<StoreDetails />} />
          <Route path="*" element={<p>Route not found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </LocationProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
