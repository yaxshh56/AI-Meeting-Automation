import { useEffect, useState } from "react";
import axios from "axios";

function AIMeetings() {

    const [meetings, setMeetings] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        const fetchMeetings = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:8000/api/v1/schedules/all"
                );

                setMeetings(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchMeetings();

        const interval = setInterval(
            fetchMeetings,
            10000
        );

        return () => clearInterval(interval);

    }, []);

    const totalMeetings = meetings.length;

    const aiMeetings = meetings.filter(
        meeting => meeting.aiJoined
    ).length;

    const hostMeetings = meetings.filter(
        meeting => meeting.hostJoined
    ).length;

    const pendingMeetings = meetings.filter(
        meeting =>
            !meeting.hostJoined &&
            !meeting.aiJoined
    ).length;

    return (

        <div style={{ padding: "20px" }}>

            <h1>AI Meeting Dashboard</h1>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "20px"
                }}
            >

                <div
                    style={{
                        padding: "20px",
                        border: "1px solid gray"
                    }}
                >
                    <h3>Total Meetings</h3>
                    <h2>{totalMeetings}</h2>
                </div>

                <div
                    style={{
                        padding: "20px",
                        border: "1px solid gray"
                    }}
                >
                    <h3>AI Attended</h3>
                    <h2>{aiMeetings}</h2>
                </div>

                <div
                    style={{
                        padding: "20px",
                        border: "1px solid gray"
                    }}
                >
                    <h3>Host Attended</h3>
                    <h2>{hostMeetings}</h2>
                </div>

                <div
                    style={{
                        padding: "20px",
                        border: "1px solid gray"
                    }}
                >
                    <h3>Pending</h3>
                    <h2>{pendingMeetings}</h2>
                </div>

            </div>

            <input
                type="text"
                placeholder="Search Meeting Code"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    padding: "10px",
                    width: "300px",
                    marginBottom: "20px"
                }}
            />

            <table
                border="1"
                cellPadding="10"
                style={{
                    borderCollapse: "collapse",
                    width: "100%"
                }}
            >

                <thead>

                    <tr>
                        <th>Title</th>
                        <th>Meeting Code</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Host Joined</th>
                        <th>AI Joined</th>
                        <th>Status</th>
                        <th>Attendance</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        meetings
                            .filter(meeting =>
                                meeting.meetingCode
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            )
                            .map((meeting) => (

                                <tr key={meeting._id}>

                                    <td>{meeting.title}</td>

                                    <td>{meeting.meetingCode}</td>

                                    <td>{meeting.date}</td>

                                    <td>{meeting.time}</td>

                                    <td>
                                        {
                                            meeting.hostJoined
                                                ? "✅ Yes"
                                                : "❌ No"
                                        }
                                    </td>

                                    <td>
                                        {
                                            meeting.aiJoined
                                                ? "🤖 Yes"
                                                : "No"
                                        }
                                    </td>

                                    <td>
                                        {
                                            meeting.aiJoined
                                                ? "AI Attended"
                                                : meeting.hostJoined
                                                    ? "Host Attended"
                                                    : "Waiting"
                                        }
                                    </td>

                                    <td>

                                        <button
                                            onClick={() => {
                                                window.open(
                                                    "/attendance",
                                                    "_blank"
                                                );
                                            }}
                                        >
                                            View
                                        </button>

                                    </td>

                                </tr>

                            ))
                    }

                </tbody>

            </table>

        </div>

    );

}

export default AIMeetings;