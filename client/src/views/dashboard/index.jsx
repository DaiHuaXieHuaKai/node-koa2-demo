import React, { Component } from "react"

import MediaQuery from 'react-responsive'
import {
    Layout,
    Menu,
    Modal,
    Row,
    Input,
    message,
    Col,
    Select
} from 'antd';
const { Header, Content } = Layout;
const Search = Input.Search;
const Option = Select.Option;

const routes = [{
    key: 0,
    name: "默认线路",
    value: "http://yun.baiyug.cn/vip/index.php?url="
}, {
    key: 1,
    name: "线路1",
    value: "http://jx.vgoodapi.com/jx.php?url="
}, {
    key: 2,
    name: "线路2",
    value: "http://api.visaok.net/?url="
}, {
    key: 3,
    name: "线路3",
    value: "http://api.xyingyu.com/?url="
}, {
    key: 4,
    name: "线路4",
    value: "http://api.greatchina56.com/?url="
}, {
    key: 5,
    name: "线路5",
    value: "http://jx.618g.com/?url="
}]

const regs = [
    /youku/i,
    /iqiyi/i,
    /le/i,
    /qq/i,
    /tudou/i,
    /mgtv/i,
    /sohu/i,
    /acfun/i,
    /bilibili/i,
    /1905/i,
    /pptv/i,
    /yinyuetai/i
];

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            playVisible: false,
            selectedMenu: [this.props.loacation.pathname],
            resolveRoute: routes[0].value,//解析线路
            videoUrl: ""//播放视频地址
        }
    }
    //点击菜单
    handlerMenuItem = (item) => {
        this.setState({
            selectedMenu: [item.key]
        })
        this.props.history.push(item.key);
    }

    playVideo(value) {
        let canUse = regs.some(reg => (reg.test(value)))
        if (canUse) {
            this.setState({
                playVisible: true,
                videoUrl: value
            })
        } else {
            message.error("请输入有效的播放地址")
        }
    }

    //选择线路
    handleRouteChange = (value) => {
        this.setState({
            resolveRoute: routes[value].value
        })
    }
    render() {
        return (
            <Layout>
                <Header className="header">
                    <Row>
                        <Col md={2} xs={24}>
                            <div className="logo" />
                        </Col>
                        <Col md={16} xs={0}>
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['/home']}
                                selectedKeys={this.state.selectedMenu}
                                style={{
                                    lineHeight: '64px'
                                }}
                                onClick={this.handlerMenuItem}>
                                <Menu.Item key="/home">首页</Menu.Item>
                                <Menu.Item key="/vip">Vip视频</Menu.Item>
                                <Menu.Item key="/teach">使用教程</Menu.Item>
                            </Menu>

                        </Col>
                        <Col
                            md={6}
                            xs={0}
                            style={{
                                textAlign: 'right'
                            }}>
                            <Search
                                placeholder="请输入影片地址"
                                onSearch={(value) => this.playVideo(value)}
                                enterButton="播放" />
                        </Col>

                    </Row>
                </Header>
                <Layout>

                    <Layout style={{ padding: 0 }}>
                        <Content style={{ background: '#fff', margin: 0 }}>
                            {this.props.children}
                        </Content>
                    </Layout>
                    <Modal
                        title="播放影片"
                        width="50%"
                        visible={this.state.playVisible}
                        footer={null}
                        mask={true}
                        maskClosable={false}
                        destroyOnClose={true}
                        onCancel={() => this.setState({ playVisible: false })}>
                        <div style={{marginBottom:'20px',textAlign:'right'}}>
                            <Select defaultValue="默认线路" style={{ width: 240 }} onChange={this.handleRouteChange}>
                                {routes.map((r) => (
                                    <Option key={r.key} value={r.key}>{r.name}</Option>
                                ))}
                            </Select>
                        </div>
                        <iframe title={Math.random()} src={this.state.resolveRoute + this.state.videoUrl} frameBorder="0" scrolling="no" width="100%" height="600px" allowtransparency="true" allowFullScreen="true"></iframe>
                    </Modal>
                </Layout>
            </Layout>
        )
    }
}

export default Dashboard