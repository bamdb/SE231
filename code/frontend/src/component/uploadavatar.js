import { Upload, Icon, message } from 'antd';
import React,{Component} from'react'
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPGorPng = file.type === 'image/jpeg'|| file.type === 'image/png';
    if (!isJPGorPng) {
        message.error('You can only upload JPG and PHG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPGorPng && isLt2M;
}

class Uploadavatar extends Component {
    state = {
        loading: false,
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (

            <Upload
                name="image"
                data={{imageId: this.props.imageid}}
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={"https://api.bamdb.cn/image/update?access_token="+localStorage.getItem("access_token")}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }}/> : uploadButton}
            </Upload>

        );
    }
}

export default Uploadavatar
