/* eslint-disable no-undef */
import NewEmployeeForm from "./NewEmployeeForm"
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig"
import React, { useEffect } from "react"
import { useState } from "react";
import MyEmployee from "./MyEmployees";


const AddEmployee = ({ currUser, notify }) => {
    const navigate = useNavigate()

    const [myinfo, setmyinfo] = useState({})

    useEffect(() => {
        if (myinfo && myinfo.accountType) {
            if (myinfo.accountType === "Employee") {
                navigate("/addEmployee")
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
            <Paper elevation={6} sx={{ my: 3, p: 3 }}>
                <NewEmployeeForm currUser={currUser} myinfo={myinfo} notify={notify} />
                <MyEmployee currUser={currUser} myinfo={myinfo} notify={notify} />
            </Paper>
        </>
    )
}

export default AddEmployee

//Path: src/Pages/Employee/MyEmployees.jsx