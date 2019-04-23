function Square(props) {
  return (
    React.createElement("button", { className: "square", onClick: props.onClick },
    props.value));
}

function Reset(props){
	return(
		React.createElement("button", {className: "reset", onClick: props.onClick},
		props.value,
	));
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true, 
	  counter: 0};
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
	  counter: this.state.counter + 1});
  }

  resetGame(){
	this.setState({
		squares: Array(9).fill(null),
		xIsNext: true,
		counter: 0});
  }

  renderSquare(i) {
    return (
      React.createElement(Square, {
        value: this.state.squares[i],
        onClick: () => this.handleClick(i) }));
  }

  renderReset(){
  	  return(
	  	  React.createElement(Reset, {
		  	  value: "Reset",
			  onClick: () => this.resetGame()
		  }));
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    }
	else if(this.state.counter >= 9){ //Added this all by myself :>
		status = 'Draw!';
	}
	else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (

      React.createElement("div", null,
	  this.renderReset(),
      React.createElement("div", { className: "status" }, status),
      React.createElement("div", { className: "board-row" },
      this.renderSquare(0),
      this.renderSquare(1),
      this.renderSquare(2)),

      React.createElement("div", { className: "board-row" },
      this.renderSquare(3),
      this.renderSquare(4),
      this.renderSquare(5)),

      React.createElement("div", { className: "board-row" },
      this.renderSquare(6),
      this.renderSquare(7),
      this.renderSquare(8))));



  }}

/*class Reset extends React.Component{
render(){
	return(
		React.createElement("button", {className: "reset"}
	));
}}*/

class Game extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "game" },
      React.createElement("div", { className: "game-board" },
      React.createElement(Board, null)),


      React.createElement("div", { className: "game-info" },
      React.createElement("div", null),
      React.createElement("ol", null))));
	  //React.createElement(Reset, null))));
	  //React.createElement("button", { className: "reset"}, "Reset"))));


  }}

  /*class NameForm extends React.Component{
  	  constructor(props){
	  	  super(props),
		  this.state ={
		  	  value: ''
		  };
		  this.handleChange = this.handleChange.bind(this);
		  this.handleSubmit = this.handleSubmit.bind(this);
	  }

	  handleChange(event){
	  	  this.setState({
		  	  value: event.target.value
		  });
	  }

	  handleSubmit(event){
	  	  alert('A name was submitted ' + this.state.value);
		  event.preventDefault();
	  }

	  render(){
	  	  return(
		  	  <form onSubmit={this.handleSubmit}>
			  <label>
			  Name:
			  <input type="text" value={this.state.value} onChange={this.handleChange} />
			  </label>
			  <input type="submit" value="Submit"/>
			  </form>
		  );
	  }
  }*/


// ========================================

ReactDOM.render(
React.createElement(Game, null),
//React.createElement(NameForm, null),
document.getElementById('root'));


function calculateWinner(squares) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}