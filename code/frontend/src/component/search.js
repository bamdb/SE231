import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
/*
 信息保存在state中，可以自行添加props或ajax
*/

class Search extends Component {
    constructor(props) {
        super(props);
        this.state={searchtext:""};
       this.handlechange=this.handlechange.bind(this);

    }
    handlechange(e) {
        this.setState({searchtext:e.target.value})
    }
    componentWillMount() {


    }
    componentDidMount() {
    }
  
    render() {


        return(
            <div>
                <Paper>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h4" component="h4" align={"center"}>
                                        搜索栏
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={8}>

                                <FormControl margin="normal" required fullWidth>

                                    <InputLabel htmlFor="id">search</InputLabel>
                                    <Input type="text" id="searchtext" value={this.state.searchtext} onChange={this.handlechange}></Input>
                                </FormControl>

                        </Grid>

                        <Grid item xs={2} alignItems="center">
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button id="searchbutton" variant="contained" color='primary' alignContent='center'>搜索</Button>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container >
                               <Grid item xs={1}>
                                   <Paper>
                                   <MenuList>
                                       <MenuItem>侧栏1</MenuItem>
                                       <MenuItem>侧栏2</MenuItem>
                                       <MenuItem>侧栏3</MenuItem>
                                   </MenuList>
                                   </Paper>
                               </Grid>
                                <Grid item xs={11}>
                                    <Paper>
                                        <Typography>
                                            内容
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }
}
export default Search;
