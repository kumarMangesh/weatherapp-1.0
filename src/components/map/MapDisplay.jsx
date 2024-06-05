import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./map.css";
import L from "leaflet";

const MapDisplay = ({ mapCoordinates, locationName, cb }) => {
  useEffect(() => {
    const map = L.map("map").setView(
      [mapCoordinates.lat, mapCoordinates.lon],
      13
    );

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add a marker
    const marker = L.marker([mapCoordinates.lat, mapCoordinates.lon]).addTo(
      map
    );

    // Add a popup to the marker
    marker.bindPopup(locationName).openPopup();

    map.on("click", function (e) {
      if (e.originalEvent.shiftKey) {
        const { lat, lng } = e.latlng;
        cb(lat, lng);
      }
    });

    // Clean up on unmount
    return () => {
      map.remove();
    };
  }, [mapCoordinates, locationName]);

  return (
    <>
      <div id="map"></div>
    </>
  );
};

export default MapDisplay;

MapDisplay.propTypes = {
  mapCoordinates: PropTypes.object,
  locationName: PropTypes.string,
  cb: PropTypes.func,
};
