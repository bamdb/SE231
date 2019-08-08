import { Steps, Button, message } from 'antd';
import React,{Component} from 'react'
import Grid from '@material-ui/core/Grid';
import Edititem from "../component/edititem";
import Uploadavatar from "../component/uploadavatar";
import '../css/editor.css';
import Typography from "@material-ui/core/Typography";
import  axios from "axios";
import Addrelation from "../component/addrelation";
const { Step } = Steps;
const steps = [
    {
        title: '上传条目信息',
        content: "",
    },
    {
        title: '上传封面',
        content: "",
    },
    {
        title: '上传关联条目',
        content: '',
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
        if(localStorage.getItem("userid")==null)
        {
          //  window.location.href="/#/login";
        }
    }

    setid(item)
    {
        this.setState({item:item});
    }
    next() {
        if(this.state.item!=null)
        {
            axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem("access_token");
            const current = this.state.current + 1;
            this.setState({ current });
            if(current==1)
            {

                var item =this.state.item;
                item.imgurl="https://api.bamdb.cn/image/id/"+item.id+"1";
                axios.put("https://api.bamdb.cn/item/update",item).then(
                    function(response){

                    }.bind(this)
                )
                axios.post("https://api.bamdb.cn/rating/add/itemid/"+item.id)
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
            <Grid container justify={"center"} alignContent={"center"}>
                <Grid item xs={10} >
            <div>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">{rows}</div>
                <div class="steps-action" >
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
                </Grid>
            </Grid>
        );
    }
}
export default Editorpage;
