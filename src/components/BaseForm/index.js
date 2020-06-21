import React, { Component } from 'react';
import {  Form, Select,  Button, DatePicker, Checkbox, message, Input } from 'antd';
import util from './../../util/util'

const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends Component {
    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue)
    }
    reset = () => {
        this.props.form.resetFields()
    }
    initFormList = () => {
        const { getFieldDecorator } = this.props.form
        const formList = this.props.formList
        const formItemList = []
        console.log('formList', formList)
        if (formList && formList.length > 0) {
            formList.forEach((item,index)=>{
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || "";
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type === "SELECT") {
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                initialValue: initialValue
                            })(
                                <Select
                                    placeholder={placeholder}
                                    style={{width:width}}
                                >
                                    {util.getOptionList(item.list)}
                                </Select>
                            )
                        }
                    </FormItem>
                    formItemList.push(SELECT)
                }else if(item.type === "时间查询"){
                    const begin_time = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator("start_time")(
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                            )
                        }
                    </FormItem>
                    formItemList.push(begin_time)
                    const end_time = <FormItem label="~" colon={false} key={field}>
                        {
                            getFieldDecorator("end_time")(
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                            )
                        }
                    </FormItem>
                    formItemList.push(end_time)
                }
                else if (item.type === "INPUT") {
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                initialValue: initialValue
                            })(
                                <Input type="text" placeholder={placeholder}/>
                            )
                        }
                    </FormItem>
                    formItemList.push(INPUT)
                }
                else if (item.type === "CHECKBOX") {
                    const CHECKBOX = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                valuePropName: "checked",
                                initialValue: initialValue
                            })(
                                <Checkbox>{label}</Checkbox>
                            )
                        }
                    </FormItem>
                    formItemList.push(CHECKBOX)
                }
            })
        }
        console.log('formItemList', formItemList)
        return formItemList
    }
    render() {
        return (
            <Form layout="inline">
                { this.initFormList() }
                <FormItem>
                    <Button type="primary" style={{margin:"0 20px"}} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create({})(FilterForm);