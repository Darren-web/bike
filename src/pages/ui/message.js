import React, { Component } from 'react';
import { Card,Button, message } from 'antd'
import './ui.less'

class Message extends Component {
    showMessage = (type) => {
        // message[type]({
        //     content:"提示内容",
        //     duration:1
        // })
        message[type]("提示内容",1)
    }
    render() {
        return (
            <div>
                <Card title="全局提示框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.showMessage('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.showMessage('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.showMessage('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.showMessage('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.showMessage('loading')}>Loading</Button>
                </Card>
            </div>
        );
    }
}

export default Message;