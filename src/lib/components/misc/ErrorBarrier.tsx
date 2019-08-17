import * as React from "react"
import { showFailure } from "../../utils"

export class ErrorBarrier extends React.Component<{},any> {

  constructor(props) {
    super(props);
    this.state = { error: false}
  }

  componentDidCatch(error, info) {
    
    showFailure({ message:error.toString(), 
                details: info.componentStack, 
                allowReload: true,
                onClose : close => { 
                        close(); 
                        this.setState({error:false});} 
                })

  }

  static getDerivedStateFromError() {

    return { error: true }
  }

  

  render() {

    return this.state.error ? <div className="blackscreen"/> : this.props.children;
  
  }
}