import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Board extends React.Component{
  renderSquare(index){
    return <div key={index} className='square' onClick={()=> this.props.selectSquare(index)}>{this.props.squares[index]}</div>
  }
  renderBoardRow(...indices){
    return <div className="board-row">{indices.map((index)=> this.renderSquare(index))}</div>
  }
  render(){
    return (
        <div>
          {this.renderBoardRow(0,1,2)}
          {this.renderBoardRow(3,4,5)}
          {this.renderBoardRow(6,7,8)}
        </div>
    );
  }
}

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      history: [],
      squares: new Array(9).fill(null),
      nextMove: "X",
      gameEnd : null
    };
    this.WINNING_COMBINATIONS = [
        [0,1,2],
        [0,3,6],
        [0,4,8],
        [3,4,5],
        [6,7,8],
        [6,4,2],
        [1,4,7],
        [2,5,8],
    ];
  }
  restore(state){
    this.setState({
      history : state.history.slice(),
      squares : state.squares,
      nextMove: state.nextMove,
      gameEnd : state.gameEnd

    });
  }
  getHistory(){
    return this.state.history.map((state, index)=>{
      return <li key={index}><button onClick={()=> this.restore(state)}>move#{index}</button></li>
    });
  }
  getStatus(){
    return this.state.gameEnd ? (this.state.gameEnd === "none" ? "Game Over !" : "Winner : " + this.state.gameEnd ) : ("Next move : " + this.state.nextMove);
  }
  getWinnerIn(squares){
    var winningCombination = this.WINNING_COMBINATIONS.find((combination)=> {
      return (squares[combination[0]] === squares[combination[1]]) && (squares[combination[0]] === squares[combination[2]])
    });
    return winningCombination ? squares[winningCombination[0]] : null;
  }
  selectSquare(index){
    if(!this.state.squares[index] && !this.state.gameEnd){
      let squares = this.state.squares.slice(),
          history = this.state.history.slice(),
          gameEnd = null;
      squares[index] = this.state.nextMove;
      gameEnd = this.getWinnerIn(squares) || (squares.indexOf(null) === -1 ? "none" : null);

      history.push({
        history : this.state.history.slice(),
        squares : this.state.squares.slice(),
        nextMove: this.state.nextMove,
        gameEnd : this.state.gameEnd
      });

      this.setState({
        history : history,
        squares : squares,
        nextMove: this.state.nextMove === "X" ? "O" : "X",
        gameEnd : gameEnd
      })
    }
  }
  render(){
    return (
        <div className='game'>
          <div className='game-board'>
            <Board squares={this.state.squares} selectSquare={(index)=>{this.selectSquare(index)}}/>
          </div>
          <div className='game-info'>
            <div className='status'>{this.getStatus()}</div>
            <ul className='history'>{this.getHistory()}</ul>
            </div>
        </div>
    )
  }
}

ReactDOM.render(<Game/>, document.getElementById('root'));