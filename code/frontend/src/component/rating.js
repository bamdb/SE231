import React, {Component} from 'react';
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Rating extends Component{
    constructor(props)
    {
        super(props);
        this.state={selectedValue:1}
        this.handleChange=this.handleChange.bind(this);
        this.handleclick=this.handleclick.bind(this);
    }
    handleclick()
    {
        this.props.handlebuttonclick(this.state.selectedValue);
    }
    handleChange(e) {
        this.setState({selectedValue:e.target.value})
        this.props.handlescorechange(e.target.value);
    }
    render(){
        return(
            <Grid container>
                <Grid item xs={1}>
                    <Typography >&nbsp;&nbsp;&nbsp;1</Typography>
                    <Radio
                        checked={this.state.selectedValue == 1}
                        onChange={this.handleChange}
                        value={1}
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 1 }}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Typography >&nbsp;&nbsp;&nbsp;2</Typography>
                    <Radio
                        checked={this.state.selectedValue == 2}
                        onChange={this.handleChange}
                        value={2}
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 2 }}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Typography >&nbsp;&nbsp;&nbsp;3</Typography>
                    <Radio
                        checked={this.state.selectedValue == 3}
                        onChange={this.handleChange}
                        value={3}
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 3 }}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Typography >&nbsp;&nbsp;&nbsp;4</Typography>
                    <Radio
                        checked={this.state.selectedValue == 4}
                        onChange={this.handleChange}
                        value={4}
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 4 }}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Typography >&nbsp;&nbsp;&nbsp;5</Typography>
                    <Radio
                        checked={this.state.selectedValue == 5}
                        onChange={this.handleChange}
                        value={5}
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 5 }}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Typography >&nbsp;&nbsp;&nbsp;6</Typography>
                    <Radio
                    checked={this.state.selectedValue == 6}
                    onChange={this.handleChange}
                    value={6}
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 6 }}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Typography >&nbsp;&nbsp;&nbsp;7</Typography>
                    <Radio
                        checked={this.state.selectedValue ==7}
                        onChange={this.handleChange}
                        value={7}
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 7 }}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Typography >&nbsp;&nbsp;&nbsp;8</Typography>
                    <Radio
                            checked={this.state.selectedValue == 8}
                            onChange={this.handleChange}
                            value={8}
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 8 }}
                        />
                </Grid>
                <Grid item xs={1}>
                    <Typography >&nbsp;&nbsp;&nbsp;9</Typography>
                    <Radio
                        checked={this.state.selectedValue == 9}
                        onChange={this.handleChange}
                        value={9}
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 9 }}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Typography >&nbsp;&nbsp;&nbsp;10</Typography>
                    <Radio
                        checked={this.state.selectedValue == 10}
                        onChange={this.handleChange}
                        value={10}
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 10 }}
                    />
                </Grid>


            </Grid>

        )
    }
}
export default Rating;