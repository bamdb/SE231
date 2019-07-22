import { Steps, Button, message } from 'antd';
import React,{Component} from 'react'
import Edititem from "../component/edititem";
import Uploadavatar from "../component/uploadavatar";
import Typography from "@material-ui/core/Typography";
import  axios from "axios";
import Addrelation from "../component/addrelation";
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


class Editorpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            item:null
        };
        this.setid=this.setid.bind(this);
    }
    componentWillMount() {

    }

    setid(item)
    {
        this.setState({item:item});
    }
    next() {
        if(this.state.item!=null)
        {
            const current = this.state.current + 1;
            this.setState({ current });
            if(current==1)
            {

                var item =this.state.item;
                item.imgurl="http://202.120.40.8:30741/image/id/"+item.id+"1";
                axios.put("http://202.120.40.8:30741/item/update?access_token="+localStorage.getItem("access_token"),item).then(
                    function(response){
                        this.props.setid(response.data.id);
                    }.bind(this)
                )
                axios.post("http://202.120.40.8:30741/rating/add/itemid/"+item.id+"?access_token="+localStorage.getItem("access_token"))
            }

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
            case 0:rows.push(<Edititem setid={this.setid}></Edititem>);break;
            case 1:rows.push(<Uploadavatar imageid={this.state.item.id+"1"}></Uploadavatar>);break;
            case 2:rows.push(<Addrelation itemid={this.state.item.id}></Addrelation>)
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
export default Editorpage;