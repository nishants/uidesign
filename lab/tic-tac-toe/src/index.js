import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component{
  render(){
    return (
        <button className="square"
                onClick={this.props.clickAction}>
          {this.props.squareValue}
        </button>
    );
  }
}

class Board extends React.Component{
  renderSquare(index){
    return (<Square clickAction={()=> this.props.onNextMove(index)} squareValue={this.props.squares[index]}/>);
  }
  render(){
    return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      status: null,
      history: [],
      nextMove: "X",
      gameEnded  : null,
      squares: new Array(9).fill(null),
      getWinner: (squares)=>{
        let winner = (squares[0] === squares[1]) && (squares[0] === squares[2])  ? squares[0] : null;
        winner = winner || ((squares[0] === squares[3]) && (squares[0] === squares[6]) ? squares[0] : null);
        winner = winner || ((squares[0] === squares[4]) && (squares[0] === squares[8]) ? squares[0] : null);
        winner = winner || ((squares[1] === squares[4]) && (squares[1] === squares[7]) ? squares[1] : null);
        winner = winner || ((squares[2] === squares[5]) && (squares[2] === squares[8]) ? squares[2] : null);
        winner = winner || ((squares[3] === squares[4]) && (squares[3] === squares[5]) ? squares[3] : null);
        winner = winner || ((squares[6] === squares[7]) && (squares[6] === squares[8]) ? squares[6] : null);
        winner = winner || ((squares[6] === squares[2]) && (squares[6] === squares[4]) ? squares[6] : null);
        return winner;
      },
      onNextMove : (squareIndex)=>{
        if(!this.state.squares[squareIndex] && !this.state.gameEnded){
          var squares    = this.state.squares.slice(),
              fillSquare = this.state.nextMove,
              winner     = null,
              gameEnded  = false,
              nextMove   = fillSquare === "O" ? "X" : "O",
              history    = this.state.history.slice(),
              status     = null;

          history.push({
            nextMove  : this.state.nextMove,
            gameEnded : this.state.gameEnded,
            squares   : this.state.squares,
            status    : this.state.status,
            winner    : this.state.winner,
            history   : this.state.history,
          });

          squares[squareIndex] = fillSquare;
          winner    = this.state.getWinner(squares);
          gameEnded = winner || squares.indexOf(null) === -1;
          status    = winner ? winner +" won" : (gameEnded ? "Game over" : nextMove + "'s turn");

          this.setState({
            nextMove  : nextMove,
            gameEnded : gameEnded,
            squares   : squares,
            status    : status,
            winner    : winner,
            history   : history
          });
        }
      },
      restore: (state)=>{
        this.setState({
          nextMove  : state.nextMove,
          gameEnded : state.gameEnded,
          squares   : state.squares,
          status    : state.status,
          winner    : state.winner,
          history   : state.history,
        });
      }
    }
  }
  getHistory(){
    return this.state.history.map((state, moveIndex)=> {
      return <li key={moveIndex}><button  onClick={()=>{this.state.restore(state)}}>move#{moveIndex}</button></li>;
    });
  }
  render() {
    return (
        <div className="game">
          <div className="game-board">
            <Board squares={this.state.squares}
                   onNextMove={this.state.onNextMove}/>
          </div>
          <div className="game-info">
            <div className="status">{this.state.status}</div>
            <ol>{this.getHistory()}</ol>
          </div>
        </div>
  );
  }
}

ReactDOM.render(<Game/>,document.getElementById("root"));



