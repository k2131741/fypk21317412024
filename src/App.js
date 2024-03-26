import logo from './logo.svg';
import './App.css';
import SignIn from './component/auth/SignIn';
import SignUp from './component/auth/SignUp';
import AuthDetails from './component/AuthDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import CreateTask from './component/tasks/createtask';
import Createtaskpage from './pages/createtaskpage';
import Userprofile from './pages/userprofile';
import PasswordReset from './pages/passwordReset';
import ViewTask from './pages/viewtask';
import ViewAllTask from './pages/viewalltask';
import Teamviewpage from './pages/teamviewpage';
import Manageteamtasklist from './pages/manageteamtasklist';
import CreateTaskTeam from './component/tasks/createtaskteam';
import Teamtaskcreation from './pages/teamtaskcreation';
import ViewTaskTeam from './pages/viewtaskteam';
function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage/>} />
          <Route path = "/register" element={<Register/>} />
          <Route path = "/dashboard" element={<Dashboard/>} />
          <Route path = "/taskcreate" element={<Createtaskpage/>} />
          <Route path = "/profile" element={<Userprofile/>} />
          <Route path = "/reset" element={<PasswordReset/>} />
          <Route path = "/viewtask" element={<ViewTask/>} />
          <Route path = "/all" element={<ViewAllTask/>} />
          <Route path = "/teams" element={<Teamviewpage/>} />
          <Route path = "/teamtasks" element={<Manageteamtasklist/>} />
          <Route path = "/teamtaskcreate" element={<Teamtaskcreation/>} />
          <Route path = "/teamtaskview" element={<ViewTaskTeam/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
