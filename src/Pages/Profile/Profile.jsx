import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig"
import { doc, updateDoc } from "firebase/firestore";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import SaveIcon from '@mui/icons-material/Save';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from "@mui/material"


const Profile = ({ currUser, notify }) => {
    const theme = createTheme();
    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [userData, setUserData] = useState({
        accountType: "",
        email: "",
        stateName: "",
        name: "",
        phoneNo: "",
        uid: "",
    })

    useEffect(() => {
        setError("")
    }, [])

    useEffect(() => {
        if (!currUser) {
            navigate("/login")
            return
        }

        const q = query(collection(db, "niwe_users"), where("uid", "==", currUser.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let mytempinfo
            querySnapshot.forEach((doc) => {
                mytempinfo = { ...doc.data(), key: doc.id }
            });
            setUserData(mytempinfo)
        });

        return (() => {
            unsubscribe()
        })
    }, [currUser, navigate])


    const updateProfileFunction = async () => {
        try {
            const userRef = doc(db, "niwe_users", userData.key);

            await updateDoc(userRef, {
                name: userData.name,
                phoneNo: userData.phoneNo,
                stateName: userData.stateName,
            });

            notify("Profile Updated !", "success")
        } catch (error) {
            setError(error.code.substring(error.code.indexOf('/') + 1).replaceAll("-", " "))
            console.log(error)
        }
    }


    const handleChange = (event) => {
        const { name, value } = event.target
        setUserData({
            ...userData,
            [name]: value,
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        setError("")
        if (!userData.name ||
            !userData.phoneNo ||
            !userData.stateName)
            {
            setError("Please provide value in each field.");
            return;
        }
        if (userData.phoneNo.length !== 10) {
            setError("Enter 10 digit Phone No.");
            return;
        }

        updateProfileFunction()
    };


    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Paper elevation={6} sx={{
                        my: 3,
                        p: 3,
                        marginTop: 8,
                        marginBottom: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 3,
                    }}>
                        <Avatar alt={currUser ? currUser.displayName : ""} src={currUser ? currUser.photoURL : ""} sx={{ width: "100px", height: "100px", margin: 3, marginTop: -8 }} />

                        <Typography component="h1" variant="h5">
                            Update Profile
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} onChange={handleChange} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name=""
                                        value={userData.uid}
                                        label="Uer UID"
                                        type="text"
                                        id="uid"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name=""
                                        value={userData.accountType}
                                        label="Account Type"
                                        type="text"
                                        id="accounttype"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name=""
                                        type="text"
                                        disabled
                                        value={userData.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="name"
                                        value={userData.name}
                                        required
                                        fullWidth
                                        type="text"
                                        id="name"
                                        label="Full Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="phoneNo"
                                        label="Phone No"
                                        name="phoneNo"
                                        type="number"
                                        value={userData.phoneNo}
                                        autoComplete="tel-national"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">+91-</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="stateName">State</InputLabel>
                                            <Select
                                                labelId="state Name Select"
                                                id="stateName"
                                                value={userData.stateName}
                                                label="state Name"
                                                onChange={(e) => setUserData({ ...userData, stateName: e.target.value })}
                                            >
                                                <MenuItem value={"Andhra Pradesh"}>Andhra Pradesh</MenuItem>
                                                <MenuItem value={"Arunachal Pradesh"}>Arunachal Pradesh</MenuItem>
                                                <MenuItem value={"Assam"}>Assam</MenuItem>
                                                <MenuItem value={"Bihar"}>Bihar</MenuItem>
                                                <MenuItem value={"Chattisgarh"}>Chattisgarh</MenuItem>
                                                <MenuItem value={"Goa"}>Goa</MenuItem>
                                                <MenuItem value={"Gujarat"}>Gujarat</MenuItem>
                                                <MenuItem value={"Haryana"}>Haryana</MenuItem>
                                                <MenuItem value={"Himachal Pradesh"}>Himachal Pradesh</MenuItem>
                                                <MenuItem value={"Jharkhand"}>Jharkhand</MenuItem>
                                                <MenuItem value={"Karnataka"}>Karnataka</MenuItem>
                                                <MenuItem value={"Kerala"}>Kerala</MenuItem>
                                                <MenuItem value={"Madhya Pradesh"}>Madhya Pradesh</MenuItem>
                                                <MenuItem value={"Maharashtra"}>Maharashtra</MenuItem>
                                                <MenuItem value={"Manipur"}>Manipur</MenuItem>
                                                <MenuItem value={"Meghalaya"}>Meghalaya</MenuItem>
                                                <MenuItem value={"Mizoram"}>Mizoram</MenuItem>
                                                <MenuItem value={"Nagaland"}>Nagaland</MenuItem>
                                                <MenuItem value={"Odisha"}Odisha></MenuItem>
                                                <MenuItem value={"Punjab"}>Punjab</MenuItem>
                                                <MenuItem value={"Rajasthan"}>Rajasthan</MenuItem>
                                                <MenuItem value={"Sikkim"}>Sikkim</MenuItem>
                                                <MenuItem value={"Tamil Nadu"}>Tamil Nadu</MenuItem>
                                                <MenuItem value={"Telangana"}>Telangana</MenuItem>
                                                <MenuItem value={"Tripura"}>Tripura</MenuItem>
                                                <MenuItem value={"Uttar Pradesh"}>Uttar Pradesh</MenuItem>
                                                <MenuItem value={"Uttarakhand"}>Uttarakhand</MenuItem>
                                                <MenuItem value={"West Bengal"}>West Bengal</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                {error ?
                                    <>
                                        <Grid item xs={12}>
                                            <Alert severity="error">{error}</Alert>
                                        </Grid>
                                    </>
                                    : <></>}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                <SaveIcon sx={{ marginRight: 1 }} />
                                Save Changes
                            </Button>
                        </Box>
                    </Paper>

                </Container>
            </ThemeProvider>
        </>
    )
}

export default Profile 