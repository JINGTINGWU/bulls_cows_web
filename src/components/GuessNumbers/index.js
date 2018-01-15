import React from 'react';

import styles from'./styles.css.js';

class GuessNumbers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      num: [0, 0, 0, 0],
      isPlay: true
    };
  }

  onPressNewGame = () => {
    let num = [];
    num.push(Math.floor(Math.random()*(9-0+1)+0)); //第一個數字
    let i=1;
    while( i<4 ){
      const n = Math.floor(Math.random()*(9-0+1)+0);
      let isOkNum = true;
      for(let j=0; j<num.length; j++) {
        if(n === num[j]){
          isOkNum = false;
          break;
        }
      }
      if(isOkNum) {
        i++;
        num.push(n); //第一個數字
      }
    }
    this.setState({
      num,
      isPlay: true
    });
    console.log(this.state);
  }

  onPressAbandon = () => {
    this.setState({isPlay: false});
  }

  getGuessNum = () => {
    return this.state.num;
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.numberBlock}>
          {this.state.isPlay? '?' : this.state.num[0]}
        </div>
        <div style={styles.numberBlock}>
          {this.state.isPlay? '?' : this.state.num[1]}
        </div>
        <div style={styles.numberBlock}>
          {this.state.isPlay? '?' : this.state.num[2]}
        </div>
        <div style={styles.numberBlock}>
          {this.state.isPlay? '?' : this.state.num[3]}
        </div>
      </div>
    );
  }
}

export default GuessNumbers;
