import { Steps, Button, message } from 'antd';
import React,{Component} from 'react'
import Editorpage from "./editorpage";
import Uploadavatar from "../component/uploadavatar";
import Typography from "@material-ui/core/Typography";
const { Step } = Steps;
const steps = [
    {
        title: 'First',
        content: "",
    },
    {
        title: 'Second',
        content: "",
    },
    {
        title: 'Last',
        content: 'Last-content',
    },
];


class Neweditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            id:null
        };
        this.getid=this.getid.bind(this);
    }
    getid(id)
    {
        this.setState({id:id});
    }
    next() {
        if(this.state.id!=null)
        {
            const current = this.state.current + 1;
            this.setState({ current });
        }
        else{
            alert("please finish the formerstep")
        }
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render() {
        const { current } = this.state;
        var rows=[];
        switch(current)
        {
            case 0:rows.push(<Editorpage getid={this.getid}></Editorpage>);break;
            case 1:rows.push(<Uploadavatar imageid={""+this.state.id+"1"}></Uploadavatar>);break;
            case 2:rows.push(<Typography>finish</Typography>)
        }
        return (
            <div>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <br/>
                <br/>
                <br/>



                <div className="steps-content">{rows}</div>
                <br/>
                <br/>
                <div className="steps-action">
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            success
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}
export default Neweditor;