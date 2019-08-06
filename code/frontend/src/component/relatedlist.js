import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Browserlist from "./browserlist";
import Briefitemlist from "./briefitemlist";
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

class Relateditem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid container  >
                <Grid item xs={12}>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography >前作</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Briefitemlist data={this.props.prior}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                </Grid>
                <Grid item xs={12}>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography >续集</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Briefitemlist data={this.props.subsequent}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                </Grid>
                <Grid item xs={12}>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography >相关作品</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Briefitemlist data={this.props.normal}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                </Grid>
            </Grid>
        );
    }
}
 
export default Relateditem;
