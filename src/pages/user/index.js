import React, { Component } from 'react';
import { Card, Button, Modal, Form, Input, Radio, DatePicker, Select,  } from 'antd'
import axios from 'axios'
import util from './../../util/util'
import ETable from './../../components/ETable'
import BaseForm from './../../components/BaseForm'

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
        let baseUrl = 'https://www.fastmock.site/mock/f33220cda0f9b989fe7e01d14bd4f8a0/bike';

        axios.get(baseUrl+"/userList",{
            params:{data:this.params}
        }).then((res)=>{
            if(res.status === 200 && res.data.code === 0){
                this.setState({
                    list:res.data.result.item_list.map((item,index)=>{
                        item.key = index;
                        return item;
                    }),
                    pagination:util.pagination(res.data,(current)=>{
                        _this.params.page = current;
                        this.request();
                    })
                })
            }else{
                Modal.info({
                    title:"提示",
                    content:res.data.msg
                })
            }
        })
    }
    //创建员工提交
    handleSubmit = () => {

    }
    handleOperate = (type) => {
        if(type === "create"){
            this.setState({
                type,
                isVisible:true,
                title:"创建员工"
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
                        this.setState({
                            isVisible:false
                        })
                    }}
                    width={600}
                >
                    <UserForm 
                        type={this.state.type}
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
    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:15}
        }
        return (
            <Form layout="horizontal">
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        getFieldDecorator("user_name")(
                            <Input type="text" placeholder="请输入用户名"/>
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        getFieldDecorator("sex")(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator("state")(
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>百度FE</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        getFieldDecorator("birthday")(
                            <DatePicker />
                        )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        getFieldDecorator("address")(
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