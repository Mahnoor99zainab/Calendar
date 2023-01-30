import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});


function App() {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState([]);
    const [state, setState] = useState(false);
    useEffect(()=>{
        getEvents();
    }, [state]);
    const getEvents = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/events/");
            const data = await res.json();            
            setAllEvents(data);
        } catch (e) {
            console.log(e);
        }
    }
    const addEvent = async (obj) => {
        try {
            await fetch("http://localhost:8080/api/events/", {
                method : "post",
                body:JSON.stringify(obj),
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            setState(!state);
            alert("New event has been added");
        } catch (e) {
            console.log(e);
            alert("Failed to add new event.");
        }
    }
    function handleAddEvent() {
        addEvent(newEvent);
    }

    return (
        <div className="App">
            <h1>Calendar</h1>
            <h2>Add New Event</h2>
            <div>
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Add Event
                </button>
            </div>
            <Calendar 
                localizer={localizer} 
                events={
                    allEvents.data ? allEvents.data : []
                } 
                startAccessor="start"
                endAccessor="end" 
                style={{ height: 500, margin: "50px" }}
            />
        </div>
    );
}

export default App;