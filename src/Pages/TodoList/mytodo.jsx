import Todoform from './Todoform';
import TodoTable from './TodoTable';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig"
import React, { useEffect } from "react"
import { useState } from "react";

const MyTodo = ({ currUser, notify }) => {
    const navigate = useNavigate()

    const [myinfo, setmyinfo] = useState({})

    useEffect(() => {
        if (myinfo && myinfo.accountType) {
            if (myinfo.accountType === "Employee") {
                navigate("/mytodo")
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
        <Todoform currUser={currUser} notify={notify} />
        <TodoTable User={currUser} notify={notify} />
      </Paper>
    </>
  );
}

export default MyTodo