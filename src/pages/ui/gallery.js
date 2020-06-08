import React, { Component } from 'react';
import { Card, Row, Col, Modal } from 'antd'
import './ui.less'

class Gallery extends Component {
    state = {
        visible:false,
        currentImg:''
    }
    openGallery = (imgSrc) => {
        this.setState({
            visible:true,
            currentImg: '/gallery/'+imgSrc
        })
    }
    render() {
        let imgs = [
            ['1.png', '2.png', '3.png', '4.png', '5.png', '22.png'],
            ['6.png', '7.png', '8.png', '9.png', '10.png', '23.png', '21.png'],
            ['11.png', '12.png', '13.png', '14.png', '15.png', '24.png'],
            ['16.png', '17.png', '18.png', '19.png', '20.png', '25.png'],
        ]
        let imgList = imgs.map((list) => list.map((item) => 
        <Card
            style={{marginBottom:10}}
            cover={<img src={'/gallery/'+ item} onClick={()=>this.openGallery(item)} alt=""/>}
        >
            <Card.Meta title="图片展示" description="I love photo"/>
        </Card>
        ))
        return (
            <div className="card-wrap">
                <Row gutter={10}>
                    <Col span={6}>{imgList[0]}</Col>
                    <Col md={6}>{imgList[1]}</Col>
                    <Col md={6}>{imgList[2]}</Col>
                    <Col md={6}>{imgList[3]}</Col>
                </Row>
                <Modal footer={null}
                    visible = {this.state.visible}
                    title="图片画廊"
                    onCancel = {() => {
                        this.setState({visible:false})
                    }}
                >
                    {<img src={this.state.currentImg} alt="" style={{width:"100%"}}/>}
                </Modal>
            </div>
        );
    }
}

export default Gallery;