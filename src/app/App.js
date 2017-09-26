import React, { Component } from 'react'
import Editor from '../components/editor/Editor.js'
import './App.css'

class App extends Component {
    state = { solution: 0 }

    render() {
        return (
            <div id="App">
                <div className="editor">
                    <Editor onResult={r => this.setState({ solution: r })} />
                </div>
                <div className="results">
                    Results<br />
                    {this.state.solution}
                </div>
            </div>
        )
    }
}

export default App
