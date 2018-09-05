import React from 'react'
import {Link} from 'react-router-dom'


import tengxun from '../../assets/images/tengxun.jpg'
import aiqiyi from '../../assets/images/aiqiyi.jpg'
import leshi from '../../assets/images/leshi.jpg'
import tudou from '../../assets/images/tudou.jpg'
import mangguo from '../../assets/images/mangguo.jpg'
import souhu from '../../assets/images/souhu.jpg'
import acfun from '../../assets/images/acfun.jpg'
import bilibili from '../../assets/images/bilibili.jpg'
import pptv from '../../assets/images/pptv.jpg'
import youku from '../../assets/images/youku.jpg'
import yinyuetai from '../../assets/images/yinyuetai.jpg'
import movie from '../../assets/images/1905.jpg'
import bg from '../../assets/images/bg.jpeg'

import { Card,Row,Col } from 'antd';
const { Meta } = Card;

class Snmlist extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            modalIsVisiable:false,
            modalTitle:""
        }
    }
handlerCard(item){
    this.setState({
        modalIsVisiable:true,
        modalTitle:item.title,
        modalUrl:item.url
    })
}

    render() {
        const items = [
            {title:"腾讯视频",cover:tengxun,url:"https://v.qq.com/"},
            {title:"爱奇艺",cover:aiqiyi,url:"http://www.iqiyi.com/"},
            {title:"乐视视频",cover:leshi,url:"https://le.com/"},
            {title:"土豆视频",cover:tudou,url:"https://tudou.com/"},
            {title:"芒果TV",cover:mangguo,url:"https://mgtv.com/"},
            {title:"搜狐视频",cover:souhu,url:"https://tv.sohu.com/"},
            {title:"AcFun",cover:acfun,url:"http://www.acfun.cn/"},
            {title:"Bilibili",cover:bilibili,url:"https://www.bilibili.com/"},
            {title:"PPTV",cover:pptv,url:"http://www.pptv.com//"},
            {title:"优酷视频",cover:youku,url:"https://v.youku.com/"},
            {title:"音悦台",cover:yinyuetai,url:"https://v.yinyuetai.com/"}
        ]
        return (
            <div style={{padding:20,backgroundImage:"url("+bg+")",backgroundAttachment:'fixed',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
                <Row>
                    {items.map((item,index)=>(
                        <Col key={index} md={6} xs={24} style={{marginTop:40,display:'flex',justifyContent:'center'}}>
                            <Link to={{pathname:"/vip/vipdetail",search:item.url}}>
                                <Card hoverable style={{width:240}} cover={< img alt = {item.title} src = {item.cover} />}>
                                    <Meta title={item.title} style={{textAlign:'center'}}/>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>   
            </div>
        )
    }
}

export default Snmlist
