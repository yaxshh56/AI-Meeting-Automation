import { useState } from "react";
import axios from "axios";

function Scheduler() {

    const [title, setTitle] = useState("");
    const [meetingCode, setMeetingCode] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [autoAttend, setAutoAttend] = useState(true);

    const createMeeting = async () => {

        try {

            const data = {
                title,
                meetingCode,
                date,
                time,
                autoAttend,
                createdBy: localStorage.getItem("username")
            };

            const response =
                await axios.post(
                    "http://localhost:8000/api/v1/schedules/create",
                    data
                );

            alert("Meeting Scheduled Successfully");

            console.log(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div style={{ padding: "20px" }}>

            <h1>Meeting Scheduler</h1>

            <br />

            <input
                type="text"
                placeholder="Meeting Title"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
            />

            <br /><br />

            <input
                type="text"
                placeholder="Meeting Code"
                value={meetingCode}
                onChange={(e) =>
                    setMeetingCode(e.target.value)
                }
            />

            <br /><br />

            <input
                type="date"
                value={date}
                onChange={(e) =>
                    setDate(e.target.value)
                }
            />

            <br /><br />

            <input
                type="time"
                value={time}
                onChange={(e) =>
                    setTime(e.target.value)
                }
            />

            <br /><br />

            <label>

                Auto Attend

                <input
                    type="checkbox"
                    checked={autoAttend}
                    onChange={() =>
                        setAutoAttend(!autoAttend)
                    }
                />

            </label>

            <br /><br />

            <button
                onClick={createMeeting}
            >
                Schedule Meeting
            </button>

        </div>

    );
}

export default Scheduler;