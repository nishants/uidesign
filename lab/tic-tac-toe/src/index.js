import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      squareIndex: props.squareIndex
    }
  }
  render(){
    var onClickAction = ()=> this.setState({squareIndex: this.state.squareIndex+1});
    return (
        <button className="square" onClick={onClickAction}>
          {this.state.squareIndex}
        </button>
    );
  }
}

class Board extends React.Component{
  renderSquare(index){
    return (<Square squareIndex={index}/>);
  }
  render(){
    return (
        <div>
          <div className="board-row">
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
          </div>
          <div className="board-row">
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
          </div>
          <div className="board-row">
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
          </div>
        </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
        <div className="game">
          <div className="game-board">
            <Board/>
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
  );
  }
}

ReactDOM.render(<Game/>,document.getElementById("root"));



