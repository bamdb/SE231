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
            uuid:undefined
        }
        this.handleSearch=this.handleSearch.bind(this);
    }

    setQR(state,e){
        this.setState({useQR:state,uuid:e})
    }

    handleSearch(value){

    }

    render(){
        const body = this.state.useQR ? <QRcode uuid={this.state.uuid}/> : <Login setQR={(state,result)=>this.setQR(state,result)}/>;
        return(
                <Grid container className={useStyles.root} justify={"center"} >
                    <Grid item xs={8}>
                        <br/><br/><br/>
                        {body}
                    </Grid>
                </Grid>
        )
    }
}

export  default LoginPage;