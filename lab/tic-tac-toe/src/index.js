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
  constructor(props){
    super(props);
    this.state = {
      nextMove: "X",
      gameEnded  : null,
      squares: new Array(9).fill(null),
      onClick: (squareIndex)=>{
        if(!this.state.squares[squareIndex] && !this.state.gameEnded){
          var squares    = this.state.squares.slice(),
              fillSquare = this.state.nextMove,
              winner     = null,
              gameEnded  = false,
              nextMove = fillSquare === "O" ? "X" : "O";
          squares[squareIndex] = fillSquare;
          winner = this.state.getWinner(squares);
          gameEnded = winner || squares.indexOf(null) === -1;
          gameEnded ? this.props.onGameEnd(winner): this.props.onNextMove(nextMove);
          this.setState({squares: squares, nextMove: nextMove, gameEnded: gameEnded, winner: winner});
        }
      },
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
      }
    }
  }
  renderSquare(index){
    return (<Square clickAction={()=> this.state.onClick(index)} squareValue={this.state.squares[index]}/>);
  }

  componentDidUpdate() {
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
      nextMove : (nextMove)=>{
        this.setState({status: nextMove+ "'s turn"});
      },
      onGameEnd: (winner)=>{
        this.setState({
          status: winner ? winner +" won" : "Game over"
        });
      }
    }
  }
  render() {
    return (
        <div className="game">
          <div className="game-board">
            <Board onNextMove={this.state.nextMove} onGameEnd={this.state.onGameEnd}/>
          </div>
          <div className="game-info">
            <div className="status">{this.state.status}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
  );
  }
}

ReactDOM.render(<Game/>,document.getElementById("root"));



