import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, roomsDummyData } from "../assets/assets";
import StarRating from "../components/StarRating";

const RoomDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImg, setMainImg] = useState(null);

  useEffect(() => {
    const room = roomsDummyData.find((room) => room._id === id);
    room && setRoom(room);
    room && setMainImg(room.images[0]);
  }, []);

  return (
    room && (
      <div className="py-28 md:py-36 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* RoomDetail */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}
          </h1>
          <span className="font-inter text-sm">({room.roomType})</span>
          <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% OFF
          </p>
        </div>

        {/* room rating */}
        <div className="flex items-center gap-1 mt-2">
          <StarRating />
          <p className="ml-2">200+ reviews</p>
        </div>

        {/* room address */}
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <img src={assets.locationIcon} alt="locationIcon" />
          <span>{room.hotel.address}</span>
        </div>

        {/* room imgs */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImg}
              alt="room image"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room?.images?.length > 1 &&
              room.images.map((img, i) => (
                <img
                  key={i}
                  onClick={() => setMainImg(img)}
                  src={img}
                  alt={`room img ${i + 1}`}
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                    mainImg === img
                      ? "outline outline-3 outline-orange-500"
                      : ""
                  }`}
                />
              ))}
          </div>
        </div>
      </div>
    )
  );
};

export default RoomDetail;
