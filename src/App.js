import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardDimension: 6,
      gameArray: Array(6).fill('o').map(() => Array(6).fill('o')),
      gameScore: 0,
      molePosition: {},
      gameTick: 2000,
      gameTickLvlUp: 1000,
      nextLevel: false,
      endOfGame: false,
    };
  };

  componentDidMount = () => {
    this.startGame();
  }

  startGame = () => {
    this.timerID = setTimeout(
      () => this.stopGame(),
      120000
    );
    this.tickID = setInterval(
      () => this.gameInterval(),
      this.state.gameTick
    );
  };

  componentWillUnmount = () => {
    this.stopGame();
  };

  startNextInterval = () => {
    clearInterval(this.tickID);
    this.tickID = setInterval(
      () => this.gameInterval(),
      this.state.gameTickLvlUp
    );
  };

  stopGame = () => {
    clearInterval(this.tickID);
    this.setState({
      endOfGame: true,
    })
  };

  startAgain = () => {
    this.setState({
      gameScore: 0,
      molePosition: {},
      nextLevel: false,
      endOfGame: false,
    },
      this.startGame()
    )
  }

  gameInterval = () => {
    this.setState({
      molePosition: {
        x: Math.floor(Math.random() * this.state.boardDimension),
        y: Math.floor(Math.random() * this.state.boardDimension),
      }
    });
  };

  onClickCellHandler = (indexX, indexY) => {
    if (indexX === this.state.molePosition.x && indexY === this.state.molePosition.y) {
      this.setState({
        gameScore: this.state.gameScore + 1,
      },
        this.gameInterval()
      )
    };
    if (this.state.gameScore >= 9 && this.state.nextLevel === false) {
      this.setState({
        nextLevel: true,
      },
        this.startNextInterval()
      );
    }
  };

  render() {

    return (
      <div>
        {
          this.state.endOfGame ?
            <div
              className="modal-window"
              onClick={this.startAgain}
            >
              <h1>Koniec Gry!</h1>
              <h2>Twój wynik to: {this.state.gameScore}</h2>
              <p>kliknij by zacząć od nowa</p>
            </div>
            : null
        }
        <Grid container spacing={24}>
          {
            this.state.gameArray.map((row, indexX) =>
              row.map((cell, indexY) => {
                return (
                  <Grid
                    item
                    xs={2}
                    key={indexX + indexY}
                    onClick={() => this.onClickCellHandler(indexX, indexY)}
                  >
                    {
                      indexX === this.state.molePosition.x && indexY === this.state.molePosition.y ?
                        <Paper><div className="mole-cell">BLACK MOLE</div></Paper>
                        : <Paper><div className="empty-cell">grass</div></Paper>
                    }
                  </Grid>
                )
              }))
          }
        </Grid>
      </div >
    )
  }
};

export default App;
