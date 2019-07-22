import React, {Component} from "react";
import { Modal} from 'antd';
import "antd/dist/antd.css";
import axios from "axios";

class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            content: this.props.content
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.content === "") {
            this.setState({visible: false, content: nextProps.content})
        }else {
            this.setState({visible: true, content: nextProps.content})
        }
    }
    handleOk() {
        if(this.props.cancelAlert){
            this.props.cancelAlert("");
        }
        this.setState({
            visible: false,
            content: ""
        })
    }
    handleCancel() {
        if(this.props.cancelAlert){
            this.props.cancelAlert("");
        }
        this.setState({
            visible: false,
            content: ""
        })
    }
    render() {
        return (
            <Modal title="系统提示" visible={this.state.visible}
                   onOk={this.handleOk} onCancel={this.handleCancel}>
                <p>{this.state.content}</p>
            </Modal>
        )
    }
}

export default Alert;

