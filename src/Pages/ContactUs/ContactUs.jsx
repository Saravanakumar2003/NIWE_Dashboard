import React from "react"
import { Paper, Typography } from "@mui/material"

const ContactUs = () => {
    return (
        <>
            <Paper elevation={3} sx={{ marginY: 3, padding: 4 }}>
                <Typography variant="h3" align="center">Contact Us</Typography>
                <Typography variant="body1" sx={{paddingY: 4}}>
                At Empowerkids Complaint Register Portal, we're dedicated to providing you with the best support and assistance for all your concerns and queries. Whether you have questions about registering a complaint, need assistance with the platform, or want to share feedback, we're here to help. If you require immediate assistance or have a specific inquiry, our customer support team is ready to assist you. You can reach out to us via email at [empowerkids@gmail.com(Fake)].
                </Typography>
            </Paper>
        </>
    )
}

export default ContactUs