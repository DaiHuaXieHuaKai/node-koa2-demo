import React from 'react'

export default class Snmdetail extends React.Component{

  constructor(props){
      super(props)
      const {location} = this.props;
      this.state = {
          url:location.search.split("?")[1],
          iframeHeight:800,
          randomTitle:Math.random()
      }
  }


   componentWillMount(){
       this.setState({
           iframeHeight:(document.body.clientHeight - 74)+'px'
       })
   }
   render(){
       return (
           <iframe title={this.state.randomTitle} src={this.state.url} frameBorder="0" scrolling="auto" width="100%" height={this.state.iframeHeight}></iframe>
       )
   }

}