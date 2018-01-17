import React, { Component } from 'react';
import logo from './logo.svg';
import styles from'./App.css.js';
import GuessNumbers from './components/GuessNumbers';
import Keyboard from './components/Keyboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: false,
      flatListSource: []
    };
  }

  onPressNewGame = () => {
    this.guessNumbers.onPressNewGame();
    this.keyboard._reset();
    this.setState({isPlay: true, flatListSource: []});
  }

  onPressAbandon = () => {
    this.guessNumbers.onPressAbandon();
    this.keyboard._reset();
    this.setState({isPlay: false, flatListSource: []});
  }

  checkNumber = (guessNum, myNum) => {
    let a = 0;//有幾個是相同數字相同位置
    let b = 0;//有幾個是相同數字但是不同位置
    for(let i=0; i<guessNum.length; i++){
      for(let j=0; j<myNum.length; j++){
        if(guessNum[i] === myNum[j]) {
          if(i === j){
            a++;
          }else{
            b++;
          }
          break;
        }
      }
    }
    return [a, b];
  }

  _confirmFun = (myNum) => {
    if(this.state.isPlay) {
      const guessNum = this.guessNumbers.getGuessNum();
      if('X' !== myNum[myNum.length - 1]) {
        const ab = this.checkNumber(guessNum, myNum);

        let _myNum = '';
        for(let j=0; j<myNum.length; j++){
          _myNum += myNum[j];
        }

        let flatListSource = this.state.flatListSource;
        flatListSource.push({
          idx: flatListSource.length + 1,
          result: `${ab[0]}A${ab[1]}B`,
          myNum: _myNum
        });
        this.setState({flatListSource});

        if(ab[0] === 4){
          this.onPressAbandon();
          alert(`您猜對了!${myNum}`);
        }else{
          this.keyboard._reset();
        }
      } else {
        alert(`您的數字不完整，必須填滿。${myNum}`);
      }
    }else{
      alert('請先開啟「新遊戲」');
    }
  }

  _renderResults = () => {
    let myrowViewStyle = {
      ...styles.rowView,
      borderBottomWidth: '1px',
      borderBottomColor: 'green',
      borderBottomStyle: 'dotted'
    }
    let jsx = [];
    this.state.flatListSource.forEach(function(element){
      jsx.push(
        <div style={myrowViewStyle}>
          <div style={{flex: 1}}>{element.idx}</div>
          <div style={{flex: 1}}>{element.result}</div>
          <div style={{flex: 1}}>{element.myNum}</div>
        </div>
      );
    });
    return (<div style={styles.resultsDiv}>
      <div style={myrowViewStyle}>
        <div style={{flex: 1}}>次數</div>
        <div style={{flex: 1}}>結果</div>
        <div style={{flex: 1}}>猜的數字</div>
      </div>
      {jsx}
    </div>);
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.toolbarContainer}>
          <a onClick={()=>this.onPressNewGame()}>
            <div style={styles.button}>
              <span style={styles.numberText}>新遊戲</span>
            </div>
          </a>
          <a onClick={()=>this.onPressAbandon()} style={{'margin-left': '30px', display: this.state.isPlay ? 'flex' : 'none'}}>
            <div style={styles.button}>
              <span style={styles.numberText}>放棄</span>
            </div>
          </a>
        </div>
        <div style={styles.hr}></div>
        <span>猜測的數字</span>
        <GuessNumbers ref={obj => { this.guessNumbers = obj; }}></GuessNumbers>
        <div style={styles.hr}></div>
        <div style={styles.rowView}>
          <div style={{flex: 1}}>
            <Keyboard ref={obj => { this.keyboard = obj; }} confirmFun={this._confirmFun}></Keyboard>
          </div>
          {this._renderResults()}
        </div>
      </div>
    );
  }
}

export default App;