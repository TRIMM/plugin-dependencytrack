import React from 'react';
import {  Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BackstageTheme } from '@backstage/theme';
import { Link } from '@backstage/core-components';


const useStyles = makeStyles<BackstageTheme>(theme => ({
    root: {
      minWidth: 260,
      position: 'relative',
      '&::before': {
        left: -16,
        position: 'absolute',
        width: '4px',
        height: '100%',
        content: '""',
        backgroundColor: theme.palette.status.error,
        borderRadius: 2,
      },
    },
    text: {
      marginBottom: 0,
    },
  }));


export const KeyCell = ({ keyvaluePair }: { keyvaluePair: {key: string, value: number}}) =>{
    const classes = useStyles();        
    return (
        <div className={classes.root}>
            <Typography
                variant="body1"
                display="block"
                gutterBottom
                className={classes.text}>
                    {keyvaluePair.key}
            </Typography>
        </div>
    );
};
export const ValueCell = ({ keyvaluePair }: { keyvaluePair: {key: string, value: number}}) =>{
    const classes = useStyles();    
    return (
        <div>
            <Typography
                variant="body1"
                display="block"
                gutterBottom
                className={classes.text}>
                    {keyvaluePair.value}
            </Typography>
        </div>
    );
};

export const StringCell = ({ text }: { text: string}) =>{
    const classes = useStyles();    
    return (
        <div>
            <Typography
                variant="body1"
                display="block"
                gutterBottom
                className={classes.text}>
                    {text}
            </Typography>
        </div>
    );
};

export const LinkCell = ({ text, url }: { text: string, url: string}) =>{
    const classes = useStyles();
    return (
        <div>
            <Link to={url}>
                <Typography
                    variant="body1"
                    display="block"
                    gutterBottom
                    className={classes.text}>
                        {text}
                </Typography>
            </Link>
        </div>
    )
}