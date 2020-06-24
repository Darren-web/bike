import React, { Component } from 'react';
import { Card, Form, Button, Modal, message } from 'antd';
import Axios from './../../axios';
import util from './../../util/util';
import BaseForm from './../../components/BaseForm'
import ETable from './../../components/ETable'

const FormItem = Form.Item
class Order extends Component {
    state = {
        orderInfo:{},
        orderConfirmVisible:false,
    }
    params = {
        page:1
    }
    formList = [
        {
            type:"SELECT",
            label:"城市",
            field:"city",
            placeholder:"全部",
            initialValue:"1",
            width:80,
            list:[{id:"0",name:"全部"},{id:"1",name:"北京"},{id:"2",name:"上海"},{id:"3",name:"杭州"},]
        },
        {
            type:"时间查询",
            label:"订单时间"
        },
        {
            type:"SELECT",
            field:"order_status",
            label:"订单状态",
            placeholder:"全部",
            initialValue:"1",
            width:80,
            list:[{id:"0",name:"全部"},{id:"1",name:"进行中"},{id:"2",name:"行程结束"}]
        },
    ]
    componentDidMount() {
        this.request();
    }
    handleFilter = (params) => {
        this.params = params
        this.request();
    }
    request = () => {
        let _this = this;
        Axios.ajax({
            url:"/order/list",
            data:{
                params:{
                    page:this.params.page
                }
            }
        })
        .then((res)=>{
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
        })
    }
    //订单结束确认
    handleConfirm = ()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:"提示信息",
                content:"请选择一条订单进行结束"
            })
            return;
        }

        Axios.ajax({
            url:"/ebike_info",
            data:{
                param:{
                    orderId:item.id
                }
            }
        })
        .then((res)=>{
            this.setState({
                orderInfo:res.result,
                orderConfirmVisible:true
            })
        })
        
    }
    //结束订单
    handleFinishOrder = ()=>{
        Axios.ajax({
            url:"/order/finish_order"
        })
        .then((res)=>{
            message.success("订单结束成功");
            this.setState({
                orderConfirmVisible:false
            })
            this.request();
        })
    }
    openOrderDetail = () => {
        let item = this.state.selectedItem;
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
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft:10}} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content_wrap">
                    <ETable
                        updateSelectedItem ={util.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        selectedIds={this.state.selectedIds}
                        pagination={this.state.pagination}
                        rowSelection=""
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

export default Order;