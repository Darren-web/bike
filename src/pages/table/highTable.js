import React, { Component } from 'react';
import { Card, Table, Modal, Badge, message, Button } from 'antd'
import Axios from './../../axios/index'

class HighTable extends Component {
    state={
        dataSource2:[],
        isShowLoading:true
    }
    params={
        page:1
    }
    request = () => {
        Axios.ajax({
            url:"/table/high/dataSource3",
            params:{
                page:this.params.page
            }
        }).
        then((res)=>{
            if(res.code === 0){
                res.result.list.map((item,index)=>{
                    item.key = index
                    return ""
                })
                this.setState({
                    dataSource2:res.result.list,
                    selectedRowKeys:[],
                    selectedRows:null,
                })
            }
        })
    }
    componentDidMount(){
        this.request()
    }
    handleChange = (pagination,filters,sorter)=>{
        this.setState({
            sortOrder:sorter.order
        })
    }
    handleDelete=(item)=>{
        // let id = item.id;
        Modal.confirm({
            title:'确认',
            content:"确认删除此条数据吗",
            onOk:()=>{
                message.success("删除成功");
                this.request();
            }
        })
    }
    render() {
        const columns = [
            {
                title:"id",
                dataIndex:"id",
                width:80
            },
            {
                title:"用户名",
                dataIndex:"userName",
                width:80
            },
            {
                title:"性别",
                dataIndex:"sex",
                render(sex){
                    return sex === 1 ? "男":"女"
                },
                width:80
            },
            {
                title:"状态",
                dataIndex:"status",
                render(status){
                    let config = {
                        "1":"咸鱼一条",
                        "2":"风华浪子",
                        "3":"北大才子",
                        "4":"前端FE",
                        "5":"创业者",
                    }
                    return config[status]
                },
                width:80
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
                },
                width:80
            },
            {
                title:"生日",
                dataIndex:"birthday",
                width:120
            },
            {
                title:"地址",
                dataIndex:"address",
                width:120
            },
            {
                title:"早起时间",
                dataIndex:"time",
                width:80
            },
        ]
        const columns2 = [
            {
                title:"id",
                dataIndex:"id",
                width:80,
                fixed:"left"
            },
            {
                title:"用户名",
                dataIndex:"userName",
                width:80,
                fixed:"left"
            },
            {
                title:"性别",
                dataIndex:"sex",
                render(sex){
                    return sex === 1 ? "男":"女"
                },
                width:80
            },
            {
                title:"状态",
                dataIndex:"status",
                render(status){
                    let config = {
                        "1":"咸鱼一条",
                        "2":"风华浪子",
                        "3":"北大才子",
                        "4":"前端FE",
                        "5":"创业者",
                    }
                    return config[status]
                },
                width:80
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
                },
                width:80
            },
            {
                title:"生日",
                dataIndex:"birthday",
                width:120
            },
            {
                title:"地址",
                dataIndex:"address",
                width:120
            },
            {
                title:"早起时间",
                dataIndex:"time",
                width:80,
                fixed:"right"
            },
        ]
        const columns3 = [
            {
                title:"id",
                dataIndex:"id",
            },
            {
                title:"用户名",
                dataIndex:"userName",
            },
            {
                title:"性别",
                dataIndex:"sex",
                render(sex){
                    return sex === 1 ? "男":"女"
                },
            },
            {
                title:"年龄",
                dataIndex:"age",
                sorter:(a,b)=>{
                    return a.age-b.age;
                },
                sortOrder:this.state.sortOrder
            },
            {
                title:"状态",
                dataIndex:"status",
                render(status){
                    let config = {
                        "1":"咸鱼一条",
                        "2":"风华浪子",
                        "3":"北大才子",
                        "4":"前端FE",
                        "5":"创业者",
                    }
                    return config[status]
                },
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
                },
            },
            {
                title:"生日",
                dataIndex:"birthday",
            },
            {
                title:"地址",
                dataIndex:"address",
            },
            {
                title:"早起时间",
                dataIndex:"time",
            },
        ]
        const columns4 = [
            {
                title:"id",
                dataIndex:"id",
            },
            {
                title:"用户名",
                dataIndex:"userName",
            },
            {
                title:"性别",
                dataIndex:"sex",
                render(sex){
                    return sex === 1 ? "男":"女"
                },
            },
            {
                title:"年龄",
                dataIndex:"age",
            },
            {
                title:"状态",
                dataIndex:"status",
                render(status){
                    let config = {
                        "1":"咸鱼一条",
                        "2":"风华浪子",
                        "3":"北大才子",
                        "4":"前端FE",
                        "5":"创业者",
                    }
                    return config[status]
                },
            },
            {
                title:"爱好",
                dataIndex:"interest",
                render(interest){
                    let config = {
                        "1":<Badge status="success" text="success"/>,
                        "2":<Badge status="error" text="error"/>,
                        "3":<Badge status="default" text="default"/>,
                        "4":<Badge status="processing" text="processing"/>,
                        "5":<Badge status="warning" text="warning"/>,
                    }
                    return config[interest]
                },
            },
            {
                title:"生日",
                dataIndex:"birthday",
            },
            {
                title:"地址",
                dataIndex:"address",
            },
            {
                title:"操作",
                render:(text,item)=>{
                    return <Button type="link" href="#" onClick={(item)=>{this.handleDelete(item)}}>删除</Button>
                }
            },
        ]
        return (
            <div>
                <Card title="头部固定" style={{margin:"10px 0"}}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        scroll={{y:240}}
                    />
                </Card>
                <Card title="左侧固定" style={{margin:"10px 0"}}>
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        scroll={{x:1050}}
                    />
                </Card>
                <Card title="表格排序" style={{margin:"10px 0"}}>
                    <Table
                        bordered
                        columns={columns3}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="表格排序" style={{margin:"10px 0"}}>
                    <Table
                        bordered
                        columns={columns4}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
            </div>
        );
    }
}

export default HighTable;