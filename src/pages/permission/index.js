import React, { Component } from 'react'
import {Card, Button, Modal, Select, Form, Input, message, Tree, Transfer} from 'antd'
import ETable from './../../components/ETable'
import util from './../../util/util'
import Axios from './../../axios'
import menuConfig from './../../config/menuConfig'

const FormItem = Form.Item
const Option = Select.Option
const { TreeNode } = Tree;
export default class PermissionUser extends Component {
    state = {
        isRoleVisible: false,
        isPermVisible: false,
        isUserVisible: false
    }
    request = () => {
        let _this = this;
        Axios.ajax({
            url:"/role/list",
            params: {
                data:this.params
            }
        })
        .then((res)=>{
            if(res.code === 0){
                this.setState({
                    dataSource:res.result.item_list.map((item,index)=>{
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
    componentDidMount() {
        this.request()
    }
    handleRole = () => {
        this.setState({
            isRoleVisible:true
        })
    }
    handleRoleSubmit = () => {
        let data = this.roleForm.props.form.getFieldsValue()
        Axios.ajax({
            url:"/role/create",
            data:{
                params:data
            }
        })
        .then(res=>{
            if(res.code === 0){
                message.success("角色创建成功")
                this.setState({
                    isRoleVisible: false
                })
                this.roleForm.props.form.resetFields()
                this.request()
            }
        })
    }
    handlePermission = () => {
        let item = this.state.selectedItem
        if(!item){
            Modal.info({
                content: "请选择一个角色"
            })
            return;
        }
        this.setState({
            isPermVisible: true,
            detailInfo: item,
            menuInfo: item.menus
        })
    }
    handlePermEditSubmit = () => {
        let data = this.permForm.props.form.getFieldsValue()
        data.role_id = this.state.selectedItem.id
        data.menus = this.state.menuInfo
        Axios.ajax({
            url:"/permission/edit",
            data:{
                params:{...data}
            }
        })
        .then(res => {
            if(res) {
                this.setState({
                    isPermVisible: false
                })
                this.request()
            }
        })
    }
    handleUserAuth = () => {
        let item = this.state.selectedItem
        if(!item){
            Modal.info({
                content: "请选择一个角色"
            })
            return;
        }
        this.setState({
            isUserVisible: true,
            detailInfo: item
        })
        this.getRoleUserList(item.id)
    }
    getRoleUserList = (id) => {
        Axios.ajax({
            url:"/role/user_list",
            data:{params:{id}}
        })
        .then(res => {
            if(res){
                this.getAuthUserList(res.result)
            }
        })
    }
    getAuthUserList = (dataSource) => {
        let mockData = []
        let targetKeys = []
        if(dataSource && dataSource.length > 0){
            for(let i=0; i<dataSource.length;i++){
                const data = {
                    key: dataSource[i].user_id,
                    title: dataSource[i].user_name,
                    status: dataSource[i].status
                }
                if(data.status === 1) {
                    targetKeys.push(data.key)
                }
                mockData.push(data)
            }
            this.setState({
                mockData,targetKeys
            })
        }
    }
    patchUserInfo = (targetKeys)=>{
        this.setState({
            targetKeys:targetKeys
        })
    }
    handleUserSubmit = () => {
        let data = {}
        data.user_ids = this.state.targetKeys
        data.role_id = this.state.selectedItem.id
        Axios.ajax({
            url:"/permission/edit",
            data:{params:{...data}}
        })
        .then(res=>{
            if(res){
                this.setState({
                    isUserVisible: false
                })
            }
        })
    }
    render() {
        const columns = [
            {
                title:"角色ID",
                dataIndex:"id"
            },
            {
                title:"角色名称",
                dataIndex:"role_name"
            },
            {
                title:"创建时间",
                dataIndex:"create_time",
                render:util.formateDate
            },
            {
                title:"使用状态",
                dataIndex:"status",
                render(status){
                    return status === 1 ? "启用":"停用"
                }
            },
            {
                title:"授权时间",
                dataIndex:"authorize_time",
                render:util.formateDate
            },
            {
                title:"授权人",
                dataIndex:"authorize_user_name"
            },
        ]
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleRole}>创建角色</Button>
                    <Button type="primary" style={{marginLeft:10,marginRight:10}} onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        columns={columns}
                        dataSource={this.state.dataSource}
                        updateSelectedItem = {util.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        style={{background:"#fff"}}
                    />
                </div>
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={()=>{
                        this.roleForm.props.form.resetFields()
                        this.setState({
                            isRoleVisible:false
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={inst=>this.roleForm=inst} />
                </Modal>
                <Modal
                    title="权限设置"
                    visible={this.state.isPermVisible}
                    width={600}
                    onOk={this.handlePermEditSubmit}
                    onCancel={() => {
                        this.setState({
                            isPermVisible: false
                        })
                    }}
                >
                    <PermEditForm
                        wrappedComponentRef={inst=>this.permForm=inst}
                        menuInfo={this.state.menuInfo}
                        detailInfo = {this.state.detailInfo}
                        patchMenuInfo = {(checkedKeys)=>{
                            this.setState({
                                menuInfo: checkedKeys
                            })
                        }}
                    />
                </Modal>
                <Modal
                    title="用户授权"
                    visible={this.state.isUserVisible}
                    width={800}
                    onOk={this.handleUserSubmit}
                    onCancel={() => {
                        this.setState({
                            isUserVisible: false
                        })
                    }}
                >
                    <RoleAuthForm
                        wrappedComponentRef={inst=>this.userAuthForm=inst}
                        targetKeys={this.state.targetKeys}
                        mockData={this.state.mockData}
                        detailInfo = {this.state.detailInfo}
                        patchUserInfo={this.patchUserInfo}
                    />
                </Modal>
            </div>
        )
    }
}
class RoleForm extends Component {
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
                        getFieldDecorator("role_name")(
                            <Input type="text" placeholder="请输入角色名"/>
                        )
                    }
                </FormItem>
                
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator("state")(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={2}>关闭</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
RoleForm = Form.create()(RoleForm);
class PermEditForm extends Component{
    renderTreeNodes = (data) => {
        return data.map(item=>{
            if(item.children) {
                return <TreeNode title={item.title} key={item.key}>{this.renderTreeNodes(item.children)}</TreeNode>
            } else {
                return <TreeNode {...item}/>
            }
        })
    }
    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys)
    }
    render(){
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:15}
        }
        const detailInfo = this.props.detailInfo
        const menuInfo = this.props.menuInfo
        const { getFieldDecorator } = this.props.form
        return(
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={detailInfo.role_name}/>
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator("status",{
                            initialValue:2
                        })(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={2}>关闭</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys)=>{
                        this.onCheck(checkedKeys)
                    }}
                    checkedKeys={menuInfo}
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}
PermEditForm = Form.create()(PermEditForm)
class RoleAuthForm extends Component{
    
    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys)
    }
    filterOption = (inputValue,option) => {
        return option.title.indexOf(inputValue) > -1
    }
    handleChange = (targetKeys) => {
        this.props.patchUserInfo(targetKeys)
    }
    render(){
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:15}
        }
        const detailInfo = this.props.detailInfo
        // const { getFieldDecorator } = this.props.form
        return(
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={detailInfo.role_name}/>
                </FormItem>
                <FormItem label="选择用户" {...formItemLayout}>
                <Transfer 
                    listStyle={{width:200,height:400}}
                    targetKeys={this.props.targetKeys}
                    dataSource = {this.props.mockData}
                    titles={["待选用户","已选用户"]}
                    showSearch
                    searchPlaceholder="请输入用户"
                    filterOption={this.filterOption}
                    render={item=>item.title}
                    onChange={this.handleChange}
                />
                </FormItem>
                
            </Form>
        )
    }
}
RoleAuthForm = Form.create()(RoleAuthForm)
