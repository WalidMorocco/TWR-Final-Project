import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import reportWebVitals from "./reportWebVitals";
import AboutUs from "./pages/AboutUs/AboutUs";
import StoreDetails from "./pages/StoreDetailsPage";
import { LocationProvider } from "./context/LocationContext";
import { AuthProvider } from "./context/AuthContext";

// Create root element
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <AuthProvider>
    <LocationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/StoreDetails/:storeId" element={<StoreDetails />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocationProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
