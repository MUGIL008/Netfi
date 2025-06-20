import React, { useEffect , useNavigate } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router, Routes, and Route

import Login from './Auth/login';
import Signup from './Auth/signup';
import Popularplans from './CustomerSide/PopularPlans';
import Recharge from './CustomerSide/Recharge';
import Addons from './CustomerSide/AddOns';
import Notifications from './CustomerSide/Notifications';
import ReviewPage from './CustomerSide/ReviewPage';
import PrepaidPlans from './AdminSide/PrepaidPlans';
import AddPrepaidPlans from './AdminSide/AddPrepaidPlans';
import EditPrepaidPlan from './AdminSide/EditPrepaidPlans';
import PostpaidPlans from './AdminSide/PostpaidPlans';
import AddPostpaidPlans from './AdminSide/AddPostpaidPlans'
import EditPostpaidPlan from './AdminSide/EditPostpaidPlans';

import AddOns from './AdminSide/AddOns';
import AddAddOns  from './AdminSide/AddAddOns';
import EditAddOns from './AdminSide/EditAddOns';

import AdminRequests from './AdminSide/AdminRequests';


const App = () => { 
  
  const NotFound = () => {
    const navigate = useNavigate(); // Move the useNavigate() hook inside the NotFound component
  
    useEffect(() => {
      // Redirect to Login page when the NotFound component is mounted
      navigate('/Login');
    }, [navigate]);
  
    return null;
  };


  return (
    <Router>
      <div >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Popularplans" element={<Popularplans />} />
          <Route path="/Recharge" element={<Recharge />} />
          <Route path="/AddOns" element={<Addons />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/Review" element={<ReviewPage/>} />

          
          <Route path="/admin" element={<PrepaidPlans />} />
          <Route path="/admin/PrepaidPlans" element={<PrepaidPlans />} />
          <Route path="/admin/AddPrepaidPlans" element={<AddPrepaidPlans />} />
          <Route path='/admin/EditPrepaidPlans' element={<EditPrepaidPlan/>}/>

          
          <Route path="/admin/PostpaidPlans" element={<PostpaidPlans />} />
          <Route path="/admin/AddPostpaidPlans" element={<AddPostpaidPlans />} />
          <Route path='/admin/EditPostpaidPlans' element={<EditPostpaidPlan/>}/>

          
          <Route path="/admin/AddOns" element={<AddOns />} />
          <Route path="/admin/AddAddOns" element={<AddAddOns />} />
          <Route path="/admin/EditAddOns" element={<EditAddOns />} />

          <Route path="/admin/requests" element={<AdminRequests/>} />

          {/* Catch-all route for any other path */} 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;










