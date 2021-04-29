import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
 
class QRScan extends Component {
  state = {
    result: 'No result'
  }
  componentDidMount() {

    

  }
  handleScan = data => {
    if (data) {
      window.location = `/addblog?id=${data}`;
      this.setState({
        result: data
      })
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <p>{this.state.result}</p>
      </div>
    )
  }
}
export default QRScan;