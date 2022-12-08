import { Route ,Routes,Navigate } from 'react-router-dom';
import './App.css';
import Home from './home/home';
import LoginForm from './login-registration/login';
import Register from './login-registration/register';
import DashBoard from './dashboard-history/dashBoard';

function App() {
  return (
  <>
<Routes>
<Route path="/" element={<Navigate to="/home" />} />
<Route path="/home" element={<Home/>} />
<Route path="/login" element={<LoginForm/>} />
<Route path="/user/register" element={<Register/>} />
<Route path="/dashBoard" element={<DashBoard/>}/>
</Routes>
</>
  );
}

export default App;
