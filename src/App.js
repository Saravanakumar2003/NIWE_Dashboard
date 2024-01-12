import React, { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { auth } from "./Firebase/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase/firebaseConfig"

// toast message
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';

// pages
import NavigationBar from "./Components/NavigationBar"
import FooterBar from "./Components/FooterBar"
import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login"
import Signup from "./Pages/Signup/Signup"
import Profile from "./Pages/Profile/Profile"
import StudentDashboard from "./Pages/Dashboard/StudentDashboard"
import AddProject from "./Pages/AddProject/AddProject"
import ContactUs from "./Pages/ContactUs/ContactUs"


const App = () => {
  // USE STATE
  const [currUser, setCurrUser] = useState(null);

  // toast message
  const notify = (msg, type) => toast(msg, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: type,
    theme: "colored"
  });

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setCurrUser(user)

    } else {
      setCurrUser(null)
    }
  });

  const [allComplaints, setAllComplaints] = React.useState([])

  React.useEffect(() => { // update complaint status
    if (allComplaints.length > 0) { // if allComplaints is not empty
      allComplaints.forEach(async (comp) => { // for each complaint
        if (new Date() - new Date(comp.issuedDate) > 604800000) { // if complaint is older than 7 days
          const compRef = doc(db, "niwe_complaint", comp.key); // get reference to complaint
          if (comp.issuedTo === "Team") { // if complaint is issued to Empowerkids Team
            await updateDoc(compRef, { // update complaint status
              issuedTo: "Legal Expert" // change issuedTo to Legal Expert
            });
          }
          if (comp.issuedTo === "Expert") { // if complaint is issued to Legal Expert
            await updateDoc(compRef, { // update complaint status
              issuedTo: "Official" // change issuedTo to Government Official
            });
          }
        }
      })
    }
  }, [allComplaints])

  React.useEffect(() => { // get all complaints

    const getData = async () => { 
      const querySnapshot = await getDocs(collection(db, "niwe_complaint")); 

      const tempComp = [] // temporary array to store all complaints
      querySnapshot.forEach((doc) => { // for each complaint
        const data = { ...doc.data(), key: doc.id, issuedDate: doc.data().issuedDate.toDate() } // get data and add key and issuedDate
        tempComp.push(data) // add to temporary array
      });
      setAllComplaints(tempComp) // set allComplaints
    }

    getData() // call getData function

  }, [])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >

        <NavigationBar currUser={currUser} />
        <Container maxWidth="xl">

          <Routes>
            <Route path="/" element={<Home currUser={currUser} notify={notify} />} />
            <Route path="/contactus" element={<ContactUs currUser={currUser} notify={notify} />} />
            <Route path="/login" element={<Login currUser={currUser} notify={notify} />} />
            <Route path="/signup" element={<Signup currUser={currUser} notify={notify} />} />
            <Route path="/profile" element={<Profile currUser={currUser} notify={notify} />} />
            <Route path="/studentDashboard" element={<StudentDashboard currUser={currUser} notify={notify} />} />
            <Route path="/addProject" element={<AddProject currUser={currUser} notify={notify} />} />
            </Routes>

        </Container>
        <FooterBar />

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Box>
    </>
  );
}

export default App;
