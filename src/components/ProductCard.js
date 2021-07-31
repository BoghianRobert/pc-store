import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';



import { connect } from 'react-redux'

import { updateCart }  from '../actions/cartActions'
import Axios from "axios";
import {url} from "../utils/api";
import {images} from "../images/images";
import {gettotalTaxa, totalPrice} from "../utils/getTotalPrice";

const ProductCard = ({dispatch, name, price, description, image, userId, product}) => {

    const classes = useStyles();

    const addToCart = (item) => {
        let index = 0
        if(userId) {
            Axios.post(url.cart, {userId: userId})
                .then((res) => {
                    if(res.data.length > 0)
                        index = res.data.findIndex((t) => (t.id === item.id))
                    else {
                        index = -1
                    }
                    if( index === -1) {

                        Axios.post(url.addToCart, {userId: userId, deviceId: item.id})
                            .then(res => {
                                if (res.status === 200) {
                                    console.log(res.data)
                                }
                            })
                            .catch(err => console.error(err))
                        window.location.href = '/'


                    } else {
                        alert('Produsul selectat este deja in cos!')
                    }
                })
                .catch((err) => {
                    alert(err)
                    console.log(err)
                })

        } else {
            window.location.href = '/sign-in'
        }


    }


    return(
        <Card
            className={classes.root}
            style={{ margin: '15px', position: 'relative', flexGrow: 1, textAlign: 'center', backgroundColor: '#fff' }}
        >
            <CardHeader
            />
            <CardContent>
                <img src={image} alt="prod"/>
                <Typography variant="body2" color="textSecondary" component="p" style={{ height: '60px', overflow: 'hidden' }}>
                    {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ height: '60px', overflow: 'hidden' }}>
                    {description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ height: '60px', overflow: 'hidden' }}>
                    {price} RON
                </Typography>
                <Button
                    className={classes.margin}
                    size={"small"}
                    onClick={e => {
                        e.stopPropagation()
                        addToCart(product)
                    }}
                >
                    Adauga in cos
                </Button>
            </CardContent>
        </Card>
    )
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '357px',
        margin: '0 4px'
    },
    media: {
        width: '100%',
        height: '200px',
        padding: '0 15px'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    margin: {
        border: '0.1px solid #3f51b5',
        color: '#3f51b5',
    },
}));

export default connect(null)(ProductCard)