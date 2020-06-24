import React, { Component } from 'react';
import { Card, Table, Modal, Button, message } from 'antd'
import Axios from './../../axios/index'
import util from '../../util/util';

class BasicTable extends Component {
    state={
        dataSource2:[],
        isShowLoading:true
    }
    params={
        page:1
    }
    componentDidMount(){
        const data = [
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                status:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'北京市海淀区奥林匹克公园',
                time:'09:00'
            },
            {
                id:'1',
                userName:'tom',
                sex:'1',
                status:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'北京市海淀区奥林匹克公园',
                time:'09:00'
            },
            {
                id:'2',
                userName:'jarry',
                sex:'1',
                status:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'北京市海淀区奥林匹克公园',
                time:'09:00'
            }
        ]
        data.map((item,index)=>{
            item.key = index
            return ""
        })
        this.setState({
            dataSource:data
        })
        this.request()
    }
    //动态获取mock数据
    request = () => {
        let _this = this;
        Axios.ajax({
            url:"/table/basic/dataSource2",
            data:{
                params:{page:this.params.page}
            }
        }).
        then((res)=>{
            if( res.code === 0 ) {
                res.result.list.map((item,index)=>{
                    item.key = index
                    return ""
                })
                this.setState({
                    dataSource2:res.result.list,
                    selectedRowKeys:[],
                    selectedRows:null,
                    pagination:util.pagination(res,(current)=>{
                        _this.params.page = current;
                        this.request();
                    })
                })
            }
        })
    }
    onRowClick = (record,index) => {
        let selectKey = [index];
        Modal.info({
            title:'信息',
            content:`用户名：${record.userName}`
        })
        this.setState({
            selectedRowKeys:selectKey,
            selectItem:record
        })
    }
    handleDelete = () => {
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item=>{
            ids.push(item.id)
            return ""
        }))
        Modal.confirm({
            title:"删除提示",
            content:`确定删除？${ids.join(",")}`,
            onOk:()=>{
                message.success("删除成功");
                this.request()
            }
        })
    }
    render() {
        const columns = [
            {
                title:"id",
                dataIndex:"id"
            },
            {
                title:"用户名",
                dataIndex:"userName"
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
            },
        ]
        let {selectedRowKeys} = this.state
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="mockjs动态表格" style={{margin:"10px 0"}}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="mockjs动态表格-单选" style={{margin:"10px 0"}}>
                    <Table
                        bordered
                        rowSelection={{type:"radio",selectedRowKeys}}
                        onRow={(record,index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record,index)
                                }
                            };
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                
                <Card title="mockjs动态表格-复选" style={{margin:"10px 0"}}>
                <div>
                    <Button onClick={this.handleDelete} style={{marginBottom:10}}>删除</Button>
                </div>
                    <Table
                        bordered
                        rowSelection={{
                            type:"checkbox",selectedRowKeys,
                            onChange:(selectedRowKeys,selectedRows)=>{
                                this.setState({
                                    selectedRowKeys,
                                    selectedRows
                                })
                            }
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="mockjs动态表格-分页" style={{margin:"10px 0"}}>
                
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        );
    }
}

export default BasicTable;