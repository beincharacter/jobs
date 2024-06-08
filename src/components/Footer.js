import React from 'react';
import { Container, Grid, Typography, Link, IconButton, Box } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

export const Footer = () => {
    let ORG_NAME = process.env.REACT_APP_ORG_NAME;

    return (
        <Box sx={{ backgroundColor: 'primary.dark', color: 'white', py: 6, width: '100%' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>About Us</Typography>
                        <Typography variant="body2">
                            Learn more about our mission, vision, and the journey we've been on to get where we are today.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>Navigation</Typography>
                        <Box>
                            <Link href="#" color="inherit" variant="body2">Home</Link>
                        </Box>
                        <Box>
                            <Link href="#" color="inherit" variant="body2">Jobs</Link>
                        </Box>
                        <Box>
                            <Link href="#" color="inherit" variant="body2">About</Link>
                        </Box>
                        <Box>
                            <Link href="#" color="inherit" variant="body2">Contact</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>Resources</Typography>
                        <Box>
                            <Link href="#" color="inherit" variant="body2">Blog</Link>
                        </Box>
                        <Box>
                            <Link href="#" color="inherit" variant="body2">FAQs</Link>
                        </Box>
                        <Box>
                            <Link href="#" color="inherit" variant="body2">Support</Link>
                        </Box>
                        <Box>
                            <Link href="#" color="inherit" variant="body2">Privacy Policy</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>Follow Us</Typography>
                        <Box>
                            <IconButton href="https://www.facebook.com" target="_blank" color="inherit" className='hover'>
                                <Facebook />
                            </IconButton>
                            <IconButton href="https://www.twitter.com" target="_blank" color="inherit" className='hover'>
                                <Twitter />
                            </IconButton>
                            <IconButton href="https://www.instagram.com" target="_blank" color="inherit" className='hover'>
                                <Instagram />
                            </IconButton>
                            <IconButton href="https://www.linkedin.com" target="_blank" color="inherit" className='hover'>
                                <LinkedIn />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={4} textAlign="center">
                    <Typography variant="body2">&copy; {new Date().getFullYear()} {ORG_NAME}. All rights reserved.</Typography>
                </Box>
            </Container>
        </Box>
    );
};
