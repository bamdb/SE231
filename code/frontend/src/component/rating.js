import React, {Component} from 'react';
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";

class Rating extends Component{
    constructor(props)
    {
        super(props);
        this.state={selectedValue:''}
        this.handleChange=this.handleChange.bind(this);

    }
    handleChange(e) {
        this.setState({selectedValue:e.target.value})
    }
    render(){
        return(
            <Grid container>
                <Radio
                    checked={this.state.selectedValue === 'a'}
                    onChange={this.handleChange}
                    value="a"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'A' }}
                />
                <Radio
                    checked={this.state.selectedValue === 'b'}
                    onChange={this.handleChange}
                    value="b"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'B' }}
                />
                <Radio
                    checked={this.state.selectedValue === 'C'}
                    onChange={this.handleChange}
                    value="c"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'c' }}
                />
            </Grid>

        )
    }
}
export default Rating;