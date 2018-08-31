import React, {Component} from 'react'

export default(componentLoad) => {
    return class AsyncComponent extends Component {

        isunmount = false

        constructor() {
            super()
            this.state = {
                Child: null
            }
        }

        async componentDidMount() {
            const {default: Child} = await componentLoad()
            if (this.unmount) 
                return
            this.setState({Child})
        }

        componentWillUnmount() {
            this.isunmount = true
        }

        render() {
            const {Child} = this.state
            return (Child
                ? <Child {...this.props}/>
                : '正在加载...')
        }
    }

}