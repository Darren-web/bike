import { Button, Card, DatePicker, Form, Input, Modal, Radio, Select, message } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import Axios from './../../axios';
import BaseForm from './../../components/BaseForm';
import ETable from './../../components/ETable';
import util from './../../util/util';

const FormItem = Form.Item
const RadioGroup = Radio.Group
const TextArea = Input.TextArea
const Option = Select.Option
class User extends Component {
    state = {
        isVisible:false
    }
    params = {
        page:1
    }
    formList = [
        {
            type:"INPUT",
            label:"用户名",
            field:"user_name",
            placeholder:"请输入用户名",
            width:100
        },
        {
            type:"INPUT",
            label:"手机号",
            field:"user_mobile",
            placeholder:"请输入手机号",
            width:100
        },
        {
            type:"DATE",
            label:"请选择入职日期",
            field:"user_date",
            placeholder:"请选择日期",
        }
    ]
    handleFilter = (params) => {
        this.params = params
        this.request();
    }
    request = () => {
        let _this = this;
        Axios.ajax({
            url:"/userList",
            params: {
                data:this.params
            }
        })
        .then((res)=>{
            if(res.code === 0){
                this.setState({
                    list:res.result.item_list.map((item,index)=>{
                        item.key = index;
                        return item;
                    }),
                    pagination:util.pagination(res,(current)=>{
                        _this.params.page = current;
                        this.request();
                    })
                })
            }
        })
    }
    //创建员工提交
    handleSubmit = () => {
        let type = this.state.type
        let data = this.UserForm.props.form.getFieldsValue()
        Axios.ajax({
            url:type ==="create" ? "/user/add" :"/user/edit",
            data:{
                params:data
            }
        })
        .then((res)=>{
            if(res.code === 0){
                this.UserForm.props.form.resetFields()
                this.setState({
                    isVisible: false
                })
                this.request()
            }
        })
    }
    handleOperate = (type) => {
        let item = this.state.selectedItem
        if(type === "create"){
            this.setState({
                type,
                isVisible:true,
                title:"创建员工"
            })
        } else if(type === "edit") {
            if(!item){
                Modal.info({
                    title:"提示",
                    content:"请选择一个用户"
                })
                return;
            }
            this.setState({
                type,
                isVisible:true,
                title:"编辑员工",
                userInfo:item
            })
        } else if(type === "detail") {
            if(!item){
                Modal.info({
                    title:"提示",
                    content:"请选择一个用户"
                })
                return;
            }
            this.setState({
                type,
                isVisible:true,
                userInfo:item,
                title:"员工详情"
            })
        }else{
            if(!item){
                Modal.info({
                    title:"提示",
                    content:"请选择一个用户"
                })
                return;
            }
            let _this = this
            Modal.confirm({
                title:"确认删除",
                content:"是否删除当前选中的员工",
                onOk(){
                    Axios.ajax({
                        url:"/user/delete",
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    })
                    .then((res)=>{
                        if(res.code === 0){
                            _this.setState({
                                isVisible:false
                            })
                            message.success("删除成功")
                            _this.request()
                        }
                    })
                }
            })
        }
    }
    render() {
        const columns = [
            {
                title:"id",
                dataIndex:"id"
            },
            {
                title:"用户名",
                dataIndex:"user_name"
            },
            {
                title:"性别",
                dataIndex:"sex",
                render(sex){
                    return sex === 1 ? "男":"女"
                }
            },
            {
                title:"状态",
                dataIndex:"state",
                render(status){
                    let config = {
                        "1":"咸鱼一条",
                        "2":"风华浪子",
                        "3":"北大才子",
                        "4":"前端FE",
                        "5":"创业者",
                    }
                    return config[status]
                }
            },
            {
                title:"爱好",
                dataIndex:"interest",
                render(interest){
                    let config = {
                        "1":"游泳",
                        "2":"打篮球",
                        "3":"踢足球",
                        "4":"爬山",
                        "5":"跑步",
                    }
                    return config[interest]
                }
            },
            {
                title:"生日",
                dataIndex:"birthday"
            },
            {
                title:"地址",
                dataIndex:"address"
            },
            {
                title:"早起时间",
                dataIndex:"time"
            }
        ]
        let footer = {}
        if(this.state.type === "detail") {
            footer = {
                footer:null
            }
        }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop:10}}>
                <Button type="primary" icon="plus" onClick={()=>this.handleOperate("create")}>创建员工</Button>
                    <Button type="primary" icon="edit" style={{marginLeft:10}} onClick={()=>this.handleOperate("edit")}>编辑员工</Button>
                    <Button type="primary" style={{marginLeft:10}} onClick={()=>this.handleOperate("detail")}>员工详情</Button>
                    <Button type="primary" icon="delete" style={{marginLeft:10}} onClick={()=>this.handleOperate("delete")}>删除员工</Button>
                </Card>
                <div className="content_wrap">
                    <ETable
                        updateSelectedItem ={util.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        pagination={this.state.pagination}
                        rowSelection=""
                    />
                </div>
                <Modal 
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.UserForm.props.form.resetFields()
                        this.setState({
                            isVisible:false
                        })
                    }}
                    width={600}
                    {...footer}
                >
                    <UserForm 
                        type={this.state.type}
                        userInfo={this.state.userInfo}
                        wrappedComponentRef={(inst)=>{this.UserForm = inst}}
                    />
                </Modal>
            </div>
        );
    }
    componentDidMount(){
        this.request()
    }
}

class UserForm extends Component {
    getState = (state) => {
        return {
            "1":"咸鱼一条",
            "2":"风华浪子",
            "3":"北大才子",
            "4":"前端FE",
            "5":"创业者"
        }[state]
    }
    render() {
        let type = this.props.type
        let userInfo = this.props.userInfo || {}
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:15}
        }
        return (
            <Form layout="horizontal">
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        type === "detail" ? userInfo.user_name :
                        getFieldDecorator("user_name",{
                            initialValue:userInfo.user_name
                        })(
                            <Input type="text" placeholder="请输入用户名"/>
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        type === "detail" ? userInfo.sex === 1 ? "男":"女" :
                        getFieldDecorator("sex",{
                            initialValue:userInfo.sex
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={0}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        type === "detail" ? this.getState(userInfo.state) :
                        getFieldDecorator("state",{
                            initialValue:userInfo.state
                        })(
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>风华浪子</Option>
                                <Option value={3}>北大才子</Option>
                                <Option value={4}>前端FE</Option>
                                <Option value={5}>创业者</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        type === "detail" ? userInfo.birthday :
                        getFieldDecorator("birthday",{
                            initialValue:moment(userInfo.birthday)
                        })(
                            <DatePicker />
                        )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        type === "detail" ? userInfo.address :
                        getFieldDecorator("address",{
                            initialValue:userInfo.address
                        })(
                            <TextArea rows={3} placeholder="请输入联系地址"></TextArea>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
UserForm = Form.create()(UserForm);

export default User;