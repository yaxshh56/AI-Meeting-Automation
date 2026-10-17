import Recordings
from "./pages/recordings";
import MeetingSummary
from "./pages/meetingSummary";
import AIMeetings from "./pages/aiMeetings";
import UpcomingMeetings from "./pages/upcomingMeetings";
import Scheduler from "./pages/scheduler";
import Attendance from "./pages/attendance";
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/landing';
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeetComponent from './pages/VideoMeet';
import HomeComponent from './pages/home';
import History from './pages/history';

function App() {
  return (
    <div className="App">

      <Router>

        <AuthProvider>


         <Routes>
          

          <Route
    path="/meetings"
    element={<UpcomingMeetings />}
/>
          <Route
    path="/scheduler"
    element={<Scheduler />}
/>

  <Route
    path="/attendance"
    element={<Attendance />}
  />

  <Route
    path="/ai-meetings"
    element={<AIMeetings />}
/>

  <Route
    path="/summaries"
    element={<MeetingSummary />}
/>
  <Route
    path="/recordings"
    element={<Recordings />}
/>

  <Route
    path="/"
    element={<LandingPage />}
  />

  <Route
    path="/auth"
    element={<Authentication />}
  />

  <Route
    path="/home"
    element={<HomeComponent />}
  />

  <Route
    path="/history"
    element={<History />}
  />

  <Route
    path="/:url"
    element={<VideoMeetComponent />}
  />

</Routes>
        </AuthProvider>

      </Router>
    </div>
  );
}

export default App;
