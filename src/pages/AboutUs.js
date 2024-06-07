import React from 'react';
import { Container, Typography, Grid } from '@mui/material';

const AboutUs = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h1" align="center" gutterBottom>About Us</Typography>
            <Grid container spacing={4} direction="column">
                <Grid item>
                    <Typography variant="h2" gutterBottom>Our Story</Typography>
                    <Typography variant="body1" paragraph>
                        At [Company Name], our journey began with a simple idea: to revolutionize [Industry/Field] through innovation and dedication. 
                        Since our inception in [Year], we have overcome countless challenges and achieved remarkable success.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Our story is one of perseverance, passion, and relentless pursuit of excellence. We have grown from a small startup to a 
                        recognized leader in the industry, thanks to the hard work and dedication of our talented team.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        As we look back on our journey, we are filled with pride for how far we have come. But we also look forward to the future 
                        with excitement and determination to continue pushing boundaries and shaping the future of [Industry/Field].
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h2" gutterBottom>Our Resolutions</Typography>
                    <Typography variant="body1" paragraph>
                        At [Company Name], our resolutions guide our actions and decisions as we strive to make a positive impact on the world. 
                        Our resolutions include:
                    </Typography>
                    <ul>
                        <li>
                            <Typography variant="body1">
                                Prioritize customer satisfaction and exceed expectations in every interaction.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1">
                                Embrace diversity and inclusion to foster a culture of innovation and creativity.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1">
                                Champion sustainability and environmental responsibility in all aspects of our operations.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1">
                                Give back to the community through philanthropic initiatives and volunteer work.
                            </Typography>
                        </li>
                    </ul>
                </Grid>
                <Grid item>
                    <Typography variant="h2" gutterBottom>Our Ambitions</Typography>
                    <Typography variant="body1" paragraph>
                        Our ambitions at [Company Name] are bold and far-reaching. We aspire to:
                    </Typography>
                    <ul>
                        <li>
                            <Typography variant="body1">
                                Lead the industry with groundbreaking innovations and cutting-edge technology.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1">
                                Expand our global footprint and establish ourselves as a market leader worldwide.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1">
                                Cultivate a culture of continuous learning and growth among our team members.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1">
                                Make a meaningful difference in the lives of our customers and the communities we serve.
                            </Typography>
                        </li>
                    </ul>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AboutUs;
