import React, { Component } from 'react';
import Header from './components/Header'
import { Row } from 'antd'
import './style/common.less'

class Common extends Component {
    render() {
        return (
            <div>
                <Row className="simple-page">
                    <Header menuType="second"/>
                </Row>
                <Row className="content">
                    {this.props.children}
                </Row>
            </div>
        );
    }
}

export default Common;