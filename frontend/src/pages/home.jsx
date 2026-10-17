import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <>
            <div className="navBar" style={{ justifyContent: "flex-end" }}>
               <div
    style={{
        display: "flex",
        alignItems: "center",
        gap: "12px"
    }}
>

    <IconButton onClick={() => navigate("/history")}>
        <RestoreIcon />
    </IconButton>

    <p>History</p>

    <Button
        variant="outlined"
        onClick={() => navigate("/attendance")}
    >
        ATTENDANCE
    </Button>

    <Button
        variant="outlined"
        onClick={() => navigate("/scheduler")}
    >
        SCHEDULER
    </Button>

    <Button
        variant="outlined"
        onClick={() => navigate("/meetings")}
    >
        MEETINGS
    </Button>

    <Button
        variant="outlined"
        onClick={() => navigate("/ai-meetings")}
    >
        AI DASHBOARD
    </Button>

    <Button
        onClick={()=>{
            navigate("/summaries");
        }}
>
        SUMMARY
    </Button>  

    <Button
onClick={()=>{
navigate("/recordings");
}}
>
RECORDINGS
</Button> 

    <Button
        onClick={() => {
            localStorage.removeItem("token");
            navigate("/auth");
        }}
    >
        LOGOUT
    </Button>

</div>
            </div>

            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h2>Providing Quality Video Call Just Like Quality Education</h2>

                        <div style={{ display: 'flex', gap: "10px" }}>
                            <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
                            <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>
                        </div>
                    </div>
                </div>
                <div className='rightPanel'>
                    <img srcSet='/logo3.png' alt="" />
                </div>
               </div>
        </>
    )
}


export default withAuth(HomeComponent)