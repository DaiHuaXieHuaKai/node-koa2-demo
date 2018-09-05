import React from 'react'

import{Steps, Layout} from 'antd'

import teach_common_01 from '../../assets/images/teach_common_01.png'
import teach_common_02 from '../../assets/images/teach_common_02.png'
import teach_common_03 from '../../assets/images/teach_common_03.png'
import teach_common_04 from '../../assets/images/teach_common_04.png'
const Step = Steps.Step


const stepcontent = [
    {
        title:"第一步",
        description:"进入系统点击Vip视频进入视频来源列表，选择一个视频来源（以腾讯视频为例）",
        img:teach_common_01
    },
    {
        title:"第二步",
        description:"打开腾讯视频选择一个自己想要看的影片，我们选择一个VIP视频阿凡达",
        img:teach_common_02
    },
    {
        title:"第三步",
        description:"打开自己想看的电影，复制播放地址（整个播放地址）",
        img:teach_common_03
    },
    {
        title:"第四步",
        description:"将复制的地址粘贴到搜索框，播放影片",
        img:teach_common_04
    }
]

export default class Teach extends React.Component{

    constructor(props){
          super(props)
          this.state = {
              current:0
          }
    }

    render(){
        return(
            <Layout style={{padding:24,background:'#fff'}}>
                        <Steps current={this.state.current}>
                           {stepcontent.map((step,index)=>(
                                <Step title={step.title} key={index} onClick={()=>this.setState({current:index})}/>
                           ))}
                        </Steps>
                        <div style={{marginTop:20}}>
                               <p style={{fontWeight:700,fontSize:16}}>{stepcontent[this.state.current].description}</p>
                               <img src={stepcontent[this.state.current].img} alt={stepcontent[this.state.current].title} style={{width:'100%'}}/>
                        </div>
          </Layout>
        )
    }
}