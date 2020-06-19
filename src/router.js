import React, { Component } from 'react';
import { HashRouter,Route,Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Home from './pages/home'
import Buttons from './pages/ui/button'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loading'
import Notice from './pages/ui/notice'
import NoMatch from './pages/nomatch'
import Message from './pages/ui/message';
import Tab from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import FormLogin from './pages/form/login';
import Register from './pages/form/register';
import BasicTable from './pages/table/basicTable';
import HighTable from './pages/table/highTable';
import City from './pages/city';
import Order from './pages/order';
import Common from './common';
import OrderDetail from './pages/order/detail'


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
                                <Route component={NoMatch}/>
                            </Switch>
                            </Admin>}
                        />
                        
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}

export default Router;