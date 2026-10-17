import { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

function Attendance() {

    const [records, setRecords] = useState([]);
    const [search, setSearch] = useState("");

    const totalDuration = records.reduce(
        (sum, record) => sum + record.durationMinutes,
        0
    );

    const exportCSV = () => {

        const csvRows = [];

        csvRows.push(
            [
                "Username",
                "MeetingCode",
                "JoinTime",
                "LeaveTime",
                "Duration"
            ].join(",")
        );

        records.forEach(record => {

            csvRows.push(
                [
                    record.username,
                    record.meetingCode,
                    record.joinTime,
                    record.leaveTime,
                    record.durationMinutes
                ].join(",")
            );

        });

        const csvString = csvRows.join("\n");

        const blob = new Blob(
            [csvString],
            {
                type: "text/csv;charset=utf-8;"
            }
        );

        saveAs(blob, "attendance.csv");
    };

    useEffect(() => {

        const fetchAttendance = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:8000/api/v1/attendance"
                );

                setRecords(response.data);

            } catch (error) {

                console.log(error);

            }
        };

        fetchAttendance();

    }, []);

    return (

        <div style={{ padding: "20px" }}>

            <h1>Attendance Dashboard</h1>

            <h3>
                Total Duration: {totalDuration} Minutes
            </h3>

            <button
                onClick={exportCSV}
                style={{
                    padding: "10px",
                    marginBottom: "20px",
                    cursor: "pointer"
                }}
            >
                Export CSV
            </button>

            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Search Username"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        padding: "10px",
                        width: "250px"
                    }}
                />
            </div>

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
                        <th>Username</th>
                        <th>Meeting Code</th>
                        <th>Join Time</th>
                        <th>Leave Time</th>
                        <th>Duration</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        records
                            .filter(record =>
                                record.username
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            )
                            .map((record) => (

                                <tr key={record._id}>

                                    <td>{record.username}</td>

                                    <td>{record.meetingCode}</td>

                                    <td>
                                        {new Date(
                                            record.joinTime
                                        ).toLocaleString()}
                                    </td>

                                    <td>
                                        {new Date(
                                            record.leaveTime
                                        ).toLocaleString()}
                                    </td>

                                    <td>
                                        {record.durationMinutes} min
                                    </td>

                                </tr>

                            ))
                    }

                </tbody>

            </table>

        </div>

    );
}

export default Attendance;