import React, { Component } from 'react';
import { Card,Form, Input, Button, Icon, Radio, InputNumber, Select, Switch, DatePicker, TimePicker, Upload, message, Checkbox } from 'antd'
import moment from 'moment'
const FormItem = Form.Item;
const RadioGroup = Radio.Group
const Option = Select.Option
const TextArea = Input.TextArea;
class Register extends Component {
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
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
        this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
                imageUrl,
                loading: false,
            }),
        );
        }
    };
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue()
        console.log('userInfo', userInfo)
    }
    render() {
        const {getFieldDecorator} = this.props.form
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        return (
            <div>
                <Card title="注册表单">
                    <Form>
                        <FormItem label="用户名" {...formItemLayout}>
                        {
                                getFieldDecorator("userName",{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:"用户名不能为空"
                                        },{
                                            min:5,max:10,
                                            message:'长度在5-10之间'
                                        },{
                                            pattern:/^\w+$/,
                                            // pattern:new RegExp('^\\w+$','g'),
                                            message:"用户名必须为字母或数字"
                                        }
                                    ] 
                                })(
                                    <Input placeholder="请输入用户名"/>
                                )
                            }
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator("userPwd",{
                                    initialValue:'',
                                    rules:[] 
                                })(
                                    <Input type="password" placeholder="请输入密码"/>
                                )
                            }
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator("sex",{
                                    initialValue:'1' 
                                })(
                                    <RadioGroup>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator("age",{
                                    initialValue:18
                                })(
                                    <InputNumber />
                                )
                            }
                        </FormItem>
                        <FormItem label="状态" {...formItemLayout}>
                            {
                                getFieldDecorator("state",{
                                    initialValue:"2"
                                })(
                                    <Select>
                                        <Option value="1">咸鱼一条</Option>
                                        <Option value="2">风华才子</Option>
                                        <Option value="3">前端FE</Option>
                                        <Option value="4">一代大师</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator("interest",{
                                    initialValue:["2","5"]
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">游泳</Option>
                                        <Option value="2">打篮球</Option>
                                        <Option value="3">踢足球</Option>
                                        <Option value="4">跑步</Option>
                                        <Option value="5">爬山</Option>
                                        <Option value="6">桌游</Option>
                                        <Option value="7">王者荣耀</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="是否已婚" {...formItemLayout}>
                            {
                                getFieldDecorator("isMarried",{
                                    valuePropName:"checked",
                                    initialValue:true
                                })(
                                    <Switch/>
                                )
                            }
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator("birthday",{
                                    initialValue:moment("2020-5-28 12:13:14")
                                })(
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator("address",{
                                    initialValue:"河北省泊头市"
                                })(
                                    <TextArea
                                        autosize={
                                            {minRows:2,maxRows:4}
                                        }
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="早起时间" {...formItemLayout}>
                            {
                                getFieldDecorator("time")(
                                    <TimePicker/>
                                )
                            }
                        </FormItem>
                        <FormItem label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator("userImg")(
                                    <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator("xiyi")(
                                    <Checkbox>我已阅读<Button type="link">XXX协议</Button></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator("register")(
                                    <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                                )
                            }
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
} 

export default Form.create()(Register);