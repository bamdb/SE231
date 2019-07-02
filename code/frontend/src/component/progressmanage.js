import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Scheduletable from'scheduletable'
import '../css/progressmanage.css';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container'

/*
 信息保存在state中，可以自行添加props或ajax
*/

class Progressmanage extends Component {
    constructor(props) {
        super(props);
        this.state={label:0};
    }
    componentWillMount() {


    }
    componentDidMount() {
    }

    render() {
        var item=[];
       for(var i=0;i<10;++i) {
            item.push(
                <div>

                </div>
            )
        }

        return(
            <div>
                <Paper>
                    <Container>
                        <button id={"select"}></button>
                    </Container>
                </Paper>
            </div>
        )
    }
}
export default Progressmanage;
