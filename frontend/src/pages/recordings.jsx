import {
    useEffect,
    useState
}
from "react";

import axios
from "axios";

function Recordings(){

    const [data,setData] =
    useState([]);

    useEffect(()=>{

        axios.get(
            "http://localhost:8000/api/v1/recordings"
        )
        .then(res=>{
            setData(res.data);
        });

    },[]);

    return(

        <div
        style={{
            padding:"20px"
        }}>

            <h1>
                Meeting Recordings
            </h1>

            <table
            border="1"
            cellPadding="10"
            style={{
                width:"100%"
            }}>

                <thead>

                    <tr>
                        <th>
                            Title
                        </th>

                        <th>
                            Meeting Code
                        </th>

                        <th>
                            Recording
                        </th>
                    </tr>

                </thead>

                <tbody>

                    {
                        data.map(
                        item=>(

                            <tr
                            key={item._id}>

                                <td>
                                    {item.title}
                                </td>

                                <td>
                                    {item.meetingCode}
                                </td>

                                <td>

                                    <a
                                    href={
                                        item.recordingUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    >

                                        View Recording

                                    </a>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}

export default Recordings;