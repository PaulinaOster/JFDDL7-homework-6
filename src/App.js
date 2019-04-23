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
      nextLevel: false,
      endOfGame: false,
    };
  };

  componentDidMount = () => {
    this.timerID = setInterval(
      () => this.gameInterval(),
      this.state.gameTick
    );
  };

  componentWillUnmount = () => {
    clearInterval(this.timerID);
  };

  startNextInterval = () => {
    // for (var i = 1; i < 99999; i++) {
    //   window.clearInterval(i);
    // }
    clearInterval(this.timerID);
    this.timerID = setInterval(
      () => this.gameInterval(),
      this.state.gameTick
    );
  };

  stopInterval = () => {
    clearInterval(this.timerID);
  };

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
      })
    };
    if (this.state.gameScore >= 9 && this.state.nextLevel === false) {
      this.setState({
        nextLevel: true,
        gameTick: 500,
      },
        this.startNextInterval()
      )
    }
  };

  render() {

    return (
      <div>
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
                        <Paper className={'mole-cell'}>mole in a cell</Paper>
                        : <Paper className={'empty-cell'}>empty cell</Paper>
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
