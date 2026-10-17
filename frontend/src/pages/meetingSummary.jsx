import {
    useEffect,
    useState
}
from "react";

import axios
from "axios";

function MeetingSummary(){

    const [data,setData] =
    useState([]);

    useEffect(()=>{

        axios.get(
            "http://localhost:8000/api/v1/summaries"
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
                Meeting Summaries
            </h1>

            {
                data.map(item=>(

                    <div
                    key={item._id}
                    style={{
                        border:
                        "1px solid gray",
                        marginBottom:"15px",
                        padding:"15px"
                    }}>

                        <h3>
                            {
                                item.meetingCode
                            }
                        </h3>

                        <p>
                            <b>Notes:</b>
                            {
                                item.notes
                            }
                        </p>

                        <p>
                            <b>Summary:</b>
                            {
                                item.summary
                            }
                        </p>

                    </div>

                ))
            }

        </div>

    );

}

export default MeetingSummary;