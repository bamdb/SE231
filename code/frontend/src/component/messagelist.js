import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Message from "./message";
class Messagelist extends Component{
    constructor(props)
    {
        super(props);
        this.state={messages:[{message:{senderId:1,receiverId:1,content:"asdadadasd"},user:{username:"shenruien"}}]}
        this.handleaddfriend=this.handleaddfriend.bind(this);
    }
    handleaddfriend()
    {

    }
    componentWillMount() {
        var url="http://202.120.40.8:30741/message/"+this.props.type+"/1";
        axios.get(url).then(
            function(response)
            {
                this.setState({messages:response.data});
            }.bind(this)
        )
    }

    render()
    {
        var messages=this.state.messages;
        var rows=[];
        for(var i=0;i<messages.length;++i)
        {

                if(messages[i].message.content!="加为好友")
                {
                    rows.push(
                        <Grid item xs={12}>
                            <Message message={messages[i]} button={0}></Message>
                        </Grid>
                    )
                }
                else
                {
                    rows.push(
                        <Grid item xs={12}>
                            <Message message={messages[i]} button={1}></Message>
                        </Grid>
                    )
                }




        }
        return(
            <Paper>
                <Grid container spacing={2}>
                    {rows}
                </Grid>
            </Paper>
        )

    }
}
export default Messagelist;