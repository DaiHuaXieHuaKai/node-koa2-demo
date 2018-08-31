import React, {Component} from 'react'
import request from '../../libs/request'
import { Button } from 'antd'

export default class Home extends Component {

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        request({url: '/wx/home', method: 'get'}).then(res => {
            console.log(res)
        })
    }
    render() {
        return (
            <div>
                首页
                <Button>Click</Button>
            </div>
        )
    }
}