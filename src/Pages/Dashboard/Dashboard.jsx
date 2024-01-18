/* eslint-disable no-undef */
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig"
import MyProjects from "./MyProjects"
import MyInfo from "../../Components/MyInfo"
import Paper from '@mui/material/Paper';

const Dashboard = ({ currUser, notify }) => {
    const navigate = useNavigate()

    const [myinfo, setmyinfo] = useState({})

    useEffect(() => {
        if (myinfo && myinfo.accountType) {
            if (myinfo.accountType === "Employee") {
                navigate("/Dashboard")
            }
        }
    }, [myinfo, navigate])

    useEffect(() => {
        if (!currUser) {
            navigate("/login")
            return
        }

        const q = query(collection(db, "niwe_users"), where("uid", "==", currUser.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let mytempinfo
            querySnapshot.forEach((doc) => {
                mytempinfo = doc.data()
            });
            setmyinfo(mytempinfo)
        });

        return (() => {
            unsubscribe()
        })
    }, [currUser, navigate])

    return (
        <>
            <MyInfo currUser={currUser} myinfo={myinfo} />
            <Paper elevation={6} sx={{ my: 3, p: 3 }}>
                <MyProjects currUser={currUser} myinfo={myinfo} notify={notify} />
            </Paper>
        </>
    )
}

export default Dashboard