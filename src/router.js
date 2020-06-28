import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Admin from './admin';
import App from './App';
import Common from './common';
import City from './pages/city';
import Bar from './pages/echarts/bar';
import FormLogin from './pages/form/login';
import Register from './pages/form/register';
import Home from './pages/home';
import Login from './pages/login';
import BikeMap from './pages/map/bikeMap';
import NoMatch from './pages/nomatch';
import Order from './pages/order';
import OrderDetail from './pages/order/detail';
import RichText from './pages/rich';
import BasicTable from './pages/table/basicTable';
import HighTable from './pages/table/highTable';
import Buttons from './pages/ui/button';
import Carousels from './pages/ui/carousel';
import Gallery from './pages/ui/gallery';
import Loadings from './pages/ui/loading';
import Message from './pages/ui/message';
import Modals from './pages/ui/modals';
import Notice from './pages/ui/notice';
import Tab from './pages/ui/tabs';
import User from './pages/user';
import PermissionUser from './pages/permission';


class Router extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/common" render={()=>
                            <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
                            </Common>
                        }/>
                        <Route path="/" render={()=><Admin>
                            <Switch>
                                <Route path="/home" component={Home}/>
                                <Route path="/ui/buttons" component={Buttons}/>
                                <Route path="/ui/modals" component={Modals}/>
                                <Route path="/ui/loading" component={Loadings}/>
                                <Route path="/ui/notification" component={Notice}/>
                                <Route path="/ui/messages" component={Message}/>
                                <Route path="/ui/tabs" component={Tab}/>
                                <Route path="/ui/gallery" component={Gallery}/>
                                <Route path="/ui/carousel" component={Carousels}/>
                                <Route path="/form/login" component={FormLogin}/>
                                <Route path="/form/reg" component={Register}/>
                                <Route path="/table/basic" component={BasicTable}/>
                                <Route path="/table/high" component={HighTable}/>
                                <Route path="/city" component={City}/>
                                <Route path="/order" component={Order}/>
                                <Route path="/user" component={User}/>
                                <Route path="/bikeMap" component={BikeMap}/>
                                <Route path="/charts/bar" component={Bar}/>
                                <Route path="/rich" component={RichText}/>
                                <Route path="/permission" component={PermissionUser}/>
                                <Redirect from="/" to="/home"/>
                            </Switch>
                            </Admin>}
                        />
                        <Route component={NoMatch}/>
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}

export default Router;