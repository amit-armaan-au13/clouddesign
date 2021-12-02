import React, { Component } from 'react'

export class MyApp extends Component {
constructor(){
    super()
    this.state ={
        count:0
    }
}

incrementHandler(){
    this.setState((prevState)=>({
        count:prevState.count+1
    }))
    console.log(this.state.count)
}
decrementHandler(){
    this.setState({
        count:this.state.count-1
    })
}
resetHandler = ()=> {
    this.setState({
        count:0
    })
}
// hoverEffect=() =>{
//     console.log("Hovering")
// }

    render() {
        return (
            <div>
                <h1 id ="header">My  Counter App</h1>
                <hr></hr>

                <button id = "count">{this.state.count}</button>
              
                
                <div>
                    <button id = "increment" onClick={()=>this.incrementHandler()}>Increment</button>
                    <button id = "decrement" onClick={()=>this.decrementHandler()}>Decrement</button>
                </div>
                <div>
                    <button id = 'reset' onClick={this.resetHandler}>Reset Count</button>
                </div>
            </div>
        )
    }
}

export default MyApp

