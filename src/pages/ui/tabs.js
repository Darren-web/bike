import React, { Component } from 'react';
import { Card, message, Tabs,Icon } from 'antd'
import './ui.less'

class Tab extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
            { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
            {
            title: 'Tab 3',
            content: 'Content of Tab 3',
            key: '3',
            closable: false,//不可删除
            },
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
        };
    }
    onChange = activeKey => {
        this.setState({ activeKey });
    };
    
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };
    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    };
    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
            lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
            } else {
            activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    };
    handlecallback = (key) => {
        message.info("页签"+key)
    }
    render() {
        let { TabPane } = Tabs;
        return (
            <div>
                <Card title="Tab标签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handlecallback}>
                        <TabPane tab="Tab 1" key="1">
                        Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                        Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="带图标Tab标签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handlecallback}>
                        <TabPane tab={<span><Icon type="plus"/>Tab 1</span>} key="1">
                        Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab={<span><Icon type="edit"/>Tab 1</span>}  key="2">
                        Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab={<span><Icon type="delete"/>Tab 1</span>}  key="3">
                        Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="可增删标签">
                    <Tabs
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {this.state.panes.map(pane => (
                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                            {pane.content}
                        </TabPane>
                        ))}
                    </Tabs>
                </Card>
            </div>
        );
    }
}

export default Tab;