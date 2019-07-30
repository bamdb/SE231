import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index'
import '../css/login.css';
import Login from "../component/login"
import QRcode from "../component/qrcode"

const useStyles = makeStyles({
    root: {
        height: '100vh',
        backgroundImage: 'url(/img/3.jpg)',
    },
})

class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state={
            useQR:false,
        }
        this.handleSearch=this.handleSearch.bind(this);
    }

    setQR(e){
        this.setState({useQR:e})
    }

    handleSearch(value){

    }

    render(){
        const body = this.state.useQR ? <QRcode/> : <Login setQR={result=>this.setQR(result)}/>;
        return(
                <Grid container className={useStyles.root} justify={"center"} alignContent={"center"}>
                    <Grid item xs={8}>
                        <br/><br/><br/>
                        {body}
                    </Grid>
                </Grid>
        )
    }
}

export  default LoginPage;