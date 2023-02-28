import { useContext } from "react";
import { LocationContext } from "../../context/LocationContext";
import { Loading } from "../Loading/Loading";
import LocationSettings from "./LocationSettings";
import "./styles.css";

const LocationModal = (props) => {
  const locationContext = useContext(LocationContext);

  if (locationContext.loading) {
    return <Loading />;
  }

  return (
    <LocationSettings
      settings={locationContext.settings}
      updateLocation={(newLocation) =>
        locationContext.setCurrentLocation(newLocation)
      }
      updateRadius={(newRadius) => locationContext.setCurrentRadius(newRadius)}
      onLocationReset={() => locationContext.resetLocation()}
      handleSwitchModal={props.handleSwitchModal}
    />
  );
};

export default LocationModal;
