import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Browserlist from "./browserlist";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

class Relateditem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={useStyles.root}>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={useStyles.heading}>前作</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                            <Browserlist/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={useStyles.heading}>续集</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Browserlist/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel disabled>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography className={useStyles.heading}>相关作品</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Browserlist/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default Relateditem;
