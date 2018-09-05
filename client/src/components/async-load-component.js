import React, {Component} from 'react'
import {Spin} from 'antd'

export default(loadComponent) => {
    return class AsyncComponent extends Component {
        constructor() {
            super()
            this.state = {
                Child: null,
                hasUnmount: false
            }
        }

       async componentDidMount() {
            if (this.state.hasUnmount) 
                return
            const {default: Child} = await loadComponent()
            this.setState({Child})
        }
        componentWillUnmount() {
            this.setState({hasUnmount: true})
        }

        render() {
            const {Child} = this.state
            const loadingStyle={
                position:'absolute',
                left:'50%' ,
                top: '50%' ,
                transform: 'translate(-50%,-50%)'
            }
            return (Child
                ? <Child {...this.props}/>
                : <Spin size="large" tip="正在加载中..." style={loadingStyle}/>)
        }
    }
}