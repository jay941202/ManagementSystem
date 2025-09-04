import React, { useState, useEffect } from "react";
import API from "../../API/api";

export default function Tv() {
  const [ticketInput, setTicketInput] = useState("");
  const [guestInput, setGuestInput] = useState("");
  const [cards, setCards] = useState([]);
  const fetchCard = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/tv/getList", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCards(res.data);
    } catch (error) {
      console.error("Failed to Fetch Cards", error);
    }
  };

  useEffect(() => {
    fetchCard();
  }, []);
  console.log(cards);
  const handleAddCard = async () => {
    try {
      if (!ticketInput || !guestInput) return;
      const token = localStorage.getItem("token");
      const payload = { ticketNumber: ticketInput, name: guestInput };
      const res = await API.post("/tv/addList", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCards((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Failed to add ticket", error);
    }
    setTicketInput("");
    setGuestInput("");
  };

  const onclickHandler = async (_id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete("/tv/deleteTicket", {
        headers: { Authorization: `Bearer ${token}` },
        data: { _id },
      });
      setCards((prev) => prev.filter((card) => card._id !== _id));
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  return (
    <div className="p-6 h-screen bg-gray-50 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Ticket #"
          value={ticketInput}
          onChange={(e) => setTicketInput(e.target.value)}
          className="border px-4 py-2 rounded-md text-lg w-32"
        />
        <input
          type="text"
          placeholder="Guest Name"
          value={guestInput}
          onChange={(e) => setGuestInput(e.target.value)}
          className="border px-4 py-2 rounded-md text-lg flex-1"
        />
        <button
          onClick={handleAddCard}
          className="bg-twohas text-white px-6 py-2 rounded-md hover:bg-twohas/80 transition text-lg"
        >
          Add
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div
              key={card._id || idx}
              onClick={() => onclickHandler(card._id)}
              className="bg-twohas text-white rounded-2xl shadow-xl p-6 flex flex-col justify-between hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="text-lg font-semibold">Ticket #</div>
              <div className="text-2xl font-bold mb-4">
                K{card.ticketNumber}
              </div>
              <div className="text-lg font-semibold">Guest Name</div>
              <div className="text-xl">{card.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
