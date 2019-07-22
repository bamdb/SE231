import React,{Component} from "react";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import * as axios from "axios";

class Addrelation extends Component
{
    constructor(props)
    {
        super(props);
        this.state={id:1,type:0}
        this.handleidchange=this.handleidchange.bind(this);
        this.handletyepchange=this.handletyepchange.bind(this);
        this.handlesubmit=this.handlesubmit.bind(this);
    }
    handlesubmit()
    {
        axios.post("http://202.120.40.8/item/add/relation?access_token="+localStorage.getItem("access_token")).then(
            function(res)
            {
                alert("success");
            }
        )
    }
    handleidchange(e)
    {
        this.setState({id:e.target.value})
    }
    handletyepchange(e)
    {
        this.setState({type:e.target.value})
    }

    render()
    {
        return(
            <Grid container>
                <Grid item xs={12}>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="id">relateditemid</InputLabel>
                    <Input type="text"  value={this.state.id} onChange={this.handleidchange}></Input>
                </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="id">type</InputLabel>
                        <Input type="text"  value={this.state.type} onChange={this.handletypechange}></Input>
                    </FormControl>
                    <Button onClick={this.handlesubmit}>
                        submit
                    </Button>
                </Grid>
            </Grid>
        )
    }
}
export default  Addrelation;