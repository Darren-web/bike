import React, { Component } from 'react';
import { Col, Row } from 'antd';
import './index.less'
import Util from './../../util/util'
import axios from '../../axios'

class Header extends Component {
    componentWillMount(){
        this.setState({
            userName:'Darren'
        });
        //首页时间
        setInterval(() => {
            let sysTime = Util.formateDate(+new Date())
            this.setState({
                sysTime
            });
        },1000);
        // this.getWeatherAPIData();
    }
    getWeatherAPIData(){
        let city='河北沧州泊头'
        axios.jsonp({//tWrCgvFP44BL0XIuITTBBP94sOZAfQnO
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=Z9P71yRorl9NRzntQ9ahB6Oja8CPk5rW'
        }).then((res) => {
            if(res.status){
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl:data.dayPictureUrl,
                    weather:data.weather
                })
            }
        })
    }
    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span={24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href=" ">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span={4} className="breadcrumb-title">
                        首页
                    </Col>
                    <Col span={20} className="weather">
                        <span className="date">{this.state.sysTime}</span>
                        <span className="weather-img">
                            <img src={this.state.dayPictureUrl} alt=""/>
                        </span>
                        <span className="weather-detail">
                            {this.state.weather}
                        </span>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Header;