import React from 'react';
import { Fade, Typography, Grid, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import feature from './feature.jpg';
import { ImageContainer } from './about-us.styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '100px',
        marginTop: '3rem',
        display: "flex",
        justifyContent: "center"
    },
    paper: {
        margin: theme.spacing(2, 6),
    },
    featureTitle: {
        fontSize: '2.5rem !Important',
        fontWeight: 'bolder',
        color: '#222060',
        marginBottom: '1rem',
        fontFamily: 'inherit',
        textAlign: 'center',
        "@media (max-width: 800px)": {
            fontSize: '1.9rem !Important'
        }
    },
    featureText: {
        lineHeight: 2,
        padding: '10px',
        fontFamily: 'inherit',
        textAlign: 'left',
        "@media (max-width: 800px)": {
            fontSize: '0.8rem'
        }
    }
}))

const AboutUsPage = () => {
    const classes = useStyles();
    return (
        <section style={{ marginTop: '400px' }}>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>
                <Box>
                    <Grid container component="main" className={classes.root}>
                        <Box
                            sx={{ margin: '20px', width: '500px' }}
                        >
                            <Grid
                                item
                                component={Paper}
                                elevation={3}
                                square
                                sx={{ margin: '20px', padding: '20px', width: '500px', display: "flex", flexDirection: "column" }}
                            >
                                <Typography className={classes.featureTitle}>FEATURES</Typography>
                                <Typography className={classes.featureText}>▹ USER AUTHENTICATION USING GOOGLE, GITHUB, TWITTER</Typography>
                                <Typography className={classes.featureText}>▹ PERSONALIZED USER PROFILE</Typography>
                                <Typography className={classes.featureText}>▹ POSTS / COMMENTS / LIKES / DISLIKES</Typography>
                                <Typography className={classes.featureText}>▹ SHARE POSTS AND TWEETS</Typography>
                                <Typography className={classes.featureText}>▹ SEND MESSAGES</Typography>
                                <Typography className={classes.featureText}>▹ FOLLOW USERS</Typography>
                                <Typography className={classes.featureText}>▹ CREATE PERSONALIZED CRYPTOCURRENCY PORTFOLIO</Typography>
                                <Typography className={classes.featureText}>▹ REAL-TIME CRYPTO PRICING, TWEETS ABOUT CRYPTO HOLDING AND OTHER CRYPTO INFO</Typography>
                            </Grid>
                        </Box>
                    </Grid>
                </Box>
                <ImageContainer>
                    <img src={feature} style={{ width: '500px', height: '500px' }} alt='feature-image' />
                </ImageContainer>
            </Box>
        </section>
    )
}

export default AboutUsPage;