import React from "react";
import RoomButton from "./RoomButton";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { query, collection, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '@/firebase-configSchmatt';


const Rooms = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      roomName: "",
    },
  });

  const [nameOfRoom, setNameOfRoom] = useState("")

  const onSubmit = async (data, e) => {
    console.log("Room created! Name:", data.roomName);
    
    e.preventDefault();
    await addDoc(collection(db, "rooms"), {
      displayName: data.roomName,
      timestamp: serverTimestamp(),
    });
    // setNameOfRoom(data.roomName)
  };

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'rooms'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let rooms = [];
      querySnapshot.forEach((doc, data) => {
        rooms.push({ ...doc.data(), id: doc.id});
      });
      setRooms(rooms);
      console.log(nameOfRoom);
    });
    return () => unsubscribe();
  }, []);
  
  return (
    <div className=" w-1/5 h-full border-border-color border-r-2 ">
      {/* room/new person tab */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" bg-common py-4 px-2 rounded-lg border-border-color border-[1px]"
      >
        <input
          className="bg-common"
          type="text"
          placeholder="New room..."
          {...register("roomName", { required: "Provide room name" })}
        />
        <button className=" bg-button-active w-1/3 rounded-md " type="submit">
          Create
        </button>
      </form>
      {/* removed until private rooms are made. */}
      {/* <form className=" bg-common py-4 px-2 rounded-lg border-border-color border-[1px] mt-1 mb-5">
        <input className="bg-common" type="text" placeholder="New person..." />
        <button className=" bg-button-active w-1/3 rounded-md " type="submit">
          Add
        </button>
      </form> */}
      {rooms.map((room) => (
        <RoomButton roomName={room.displayName} />
      ))}
    </div>
  );
};

export default Rooms;
