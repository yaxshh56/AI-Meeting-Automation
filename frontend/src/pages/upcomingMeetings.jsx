import { useEffect, useState } from "react";
import axios from "axios";

function UpcomingMeetings() {

    const [meetings, setMeetings] = useState([]);

    useEffect(() => {

        const fetchMeetings = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:8000/api/v1/schedules"
                );

                setMeetings(response.data);

            } catch (error) {

                console.log(error);

            }
        };

        fetchMeetings();

    }, []);

    return (

        <div style={{ padding: "20px" }}>

            <h1>Upcoming Meetings</h1>

            <table
                border="1"
                cellPadding="10"
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >

                <thead>

                    <tr>
    <th>Title</th>
    <th>Meeting Code</th>
    <th>Date</th>
    <th>Time</th>
    <th>Auto Attend</th>
    <th>Action</th>
</tr>

                </thead>

                <tbody>

                    {
                        meetings.map((meeting) => (

                            <tr key={meeting._id}>

                                <td>{meeting.title}</td>

                                <td>{meeting.meetingCode}</td>

                                <td>{meeting.date}</td>

                                <td>{meeting.time}</td>

                                <td>
                                    {
                                        meeting.autoAttend
                                            ? "Yes"
                                            : "No"
                                    }
                                </td>
                                <td>
    <button
        onClick={() => {
            window.location.href =
                "/" + meeting.meetingCode;
        }}
    >
        Join
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

export default UpcomingMeetings;