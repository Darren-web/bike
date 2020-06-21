import React, { Component } from 'react';
import { Card, Form, Select, Table, Button, DatePicker, Modal, message } from 'antd';
import axios from 'axios';
import util from './../../util/util';

class Order extends Component {
    state = {
        orderInfo:{},
        orderConfirmVisible:false,
    }
    params = {
        page:1
    }
    componentDidMount() {
        this.request();
    }
    request = () => {
        let _this = this;
        let baseUrl = 'http://localhost:3000/#/order';

        axios.get(baseUrl+"/list",{
            page:this.params.page
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
    //订单结束确认
    handleConfirm = ()=>{
        let item = this.state.selectItem;
        if(!item){
            Modal.info({
                title:"提示信息",
                content:"请选择一条订单进行结束"
            })
            return;
        }
        axios.get("http://localhost:3000/#/order/ebike_info",{
                orderId:item.id
        })
        .then((res)=>{
            if(res.status === 200 && res.data.code === 0){
                this.setState({
                    orderInfo:res.data.result,
                    orderConfirmVisible:true
                })
            }
        })
        
    }
    //结束订单
    handleFinishOrder = ()=>{
        
        axios.get("http://localhost:3000/#/order/finish_order")
        .then((res)=>{
            if(res.status === 200 && res.data.code === 0){
                message.success("订单结束成功");
                this.setState({
                    orderConfirmVisible:false
                })
                this.request();
            }
        })
    }
    onRowClick = (record,index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys:selectKey,
            selectItem:record
        })
    }
    openOrderDetail = () => {
        let item = this.state.selectItem;
        if(!item){
            Modal.info({
                title:"提示信息",
                content:"请选择一条订单"
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`,'_blank')
    }
    render() {
        const columns = [
            {
                title:"订单编号",
                dataIndex:"order_sn"
            },
            {
                title:"车辆编号",
                dataIndex:"bike_sn"
            },
            {
                title:"用户名",
                dataIndex:"user_name"
            },
            {
                title:"手机号",
                dataIndex:"mobile"
            },
            {
                title:"里程",
                dataIndex:"distance",
                render(distance){
                    return distance/1000 +"Km";
                }
            },
            {
                title:"行驶时长",
                dataIndex:"total_time"
            },
            {
                title:"状态",
                dataIndex:"status"
            },
            {
                title:"开始时间",
                dataIndex:"start_time"
            },
            {
                title:"结束时间",
                dataIndex:"end_time"
            },
            {
                title:"订单金额",
                dataIndex:"total_fee"
            },
            {
                title:"实付金额",
                dataIndex:"user_pay"
            },
        ]
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        let {selectedRowKeys} = this.state
        return (
            <div>
                <Card>
                    <FilterForm/>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft:10}} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content_wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={{type:"radio",selectedRowKeys}}
                        onRow={(record,index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record,index)
                                }
                            };
                        }}
                    />
                </div>
                <Modal 
                    title="结束订单"
                    visible={this.state.orderConfirmVisible}
                    onCancel={()=>{
                        this.setState({
                            orderConfirmVisible:false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery+'%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
const FormItem = Form.Item
const {Option} = Select
class FilterForm extends Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator("city_id")(
                            <Select
                                placeholder="全部"
                                style={{width:100}}
                            >
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="订单时间">
                    {
                        getFieldDecorator("start_time")(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                        )
                    }
                    
                </FormItem>
                <FormItem>
                    
                    {
                        getFieldDecorator("end_time")(
                            <DatePicker style={{marginLeft:5}} showTime format="YYYY-MM-DD HH:mm:ss"/>
                        )
                    }
                </FormItem>
                <FormItem label="订单状态">
                    {
                        getFieldDecorator("status")(
                            <Select
                                placeholder="全部"
                                style={{width:100}}
                            >
                                <Option value="">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">结束行驶</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin:"0 20px"}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm)

export default Order;