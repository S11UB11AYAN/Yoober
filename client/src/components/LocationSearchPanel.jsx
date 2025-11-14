import React from "react";

const LocationSearchPanel = (props) => {
  const locations = [
    "12B Sarat Bose Road, Ballygunge, Kolkata - 700020",
    "45 Lake View Road, Southern Avenue, Kolkata - 700029",
    "221 Jessore Road, Dum Dum, Kolkata - 700028",
    "9 Park Street, Taltala, Kolkata - 700016",
    "33A Rashbehari Avenue, Gariahat, Kolkata - 700019",
  ];

  return (
    <div>
      {locations.map(function (location, idx) {
        return (
          <div
            key={idx}
            onClick={() => {
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
            }}
            className="my-2 border-white active:border-black border-2 p-3 rounded-xl flex items-center gap-4 justify-start"
          >
            <h2 className="bg-[#eee] flex items-center justify-center h-8 w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{location}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
