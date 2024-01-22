import React from "react";
import { Paper, Typography } from "@mui/material";

const ContactUs = () => {
    return (
        <>
            <Paper elevation={3} sx={{ marginY: 3, padding: 4 }}>
                <Typography variant="h3" align="center">Contact Developer</Typography>

                <Typography align="center" variant="body1" sx={{ marginTop: 2 }}>
                    For any inquiries or assistance, feel free to reach out to the developer:
                </Typography>

                <Typography align="center" variant="body1" sx={{ marginTop: 2 }}>
                    <strong>Email:</strong> saravanaramaswamy2003@gmail.com
                </Typography>
                <Typography align="center" variant="body1">
                    <strong>Phone:</strong> +91 8838416187
                </Typography>
                <Typography align="center" variant="body1">
                    <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/saravanaramaswamy2003">Saravanaramaswamy2003</a>
                </Typography>
                <Typography align="center" variant="body1" sx={{ marginBottom: 2 }}>
                    <strong>GitHub:</strong> <a href="https://github.com/Saravanakumar2003">Saravanakumar2003</a>
                </Typography>

                <div style={{ position: 'relative', height: 1000, paddingBottom: '50%' }}>
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSeMuH-puUYDge6SNIB_2N3pi4Y24DKaZmii0ySokmZAF8XMgQ/viewform?embedded=true"
                        title="Contact Form"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                        allowFullScreen
                    >
                        Loading…
                    </iframe>
                </div>
            </Paper>
        </>
    );
}

export default ContactUs;
