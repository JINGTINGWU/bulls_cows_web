import React from 'react';
import styles from'./styles.css.js';

class Keyboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pressNumber: [false, false, false, false, false, false, false, false, false, false],
      myNumber: ['X', 'X', 'X', 'X']
    };
  }

  _renderMyNumber = () => {
    let jsx = [];
    for(let i=0; i<this.state.myNumber.length; i++){
      jsx.push(<div style={styles.myNumberBlock} key={`myNumber_${i}`}>
        <span style={styles.numberText}>{this.state.myNumber[i]}</span>
      </div>);
    }
    return <div style={styles.rowContainer}>{jsx}</div>
  }

  _reset = () => {
    this.setState({
      pressNumber: [false, false, false, false, false, false, false, false, false, false],
      myNumber: ['X', 'X', 'X', 'X']
    })
  }

  _renderNumberOnPress = (n) => {
    if('X' === this.state.myNumber[this.state.myNumber.length - 1]) {
      if(this.state.pressNumber[n] === false) {
        let pressNumber = this.state.pressNumber;
        pressNumber[n] = true;
        
        let myNumber = this.state.myNumber;
        for(let i=0; i<myNumber.length; i++){
          if('X' === myNumber[i]) {
            myNumber[i] = n;
            break;
          }
        }
        this.setState({pressNumber, myNumber});
      }
    }

    return false;
  }

  _renderNumberView = (n) => {
    const newStyle = {...styles.numberBlock, backgroundColor: (this.state.pressNumber[n]? 'gray': '#388fdf')};
    return (<a onClick={()=>this._renderNumberOnPress(n)}>
      <div style={newStyle}>
        <span style={styles.numberText}>{n}</span>
      </div>
    </a>);
  }


  _numBack = () => {
    if('X' !== this.state.myNumber[0]) {
      let myNumber = this.state.myNumber;
      for(let i=0; i<myNumber.length; i++){
        if('X' !== myNumber[i]) {
          myNumber[i] = 'X';
        }
      }
      this.setState({
        pressNumber: [false, false, false, false, false, false, false, false, false, false],
        myNumber});
    }
  }



  render() {
    return (
      <div style={styles.container}>
        {this._renderMyNumber()}
        <div style={styles.rowContainer}>
          {this._renderNumberView(1)}
          {this._renderNumberView(2)}
          {this._renderNumberView(3)}
        </div>
        <div style={styles.rowContainer}>
          {this._renderNumberView(4)}
          {this._renderNumberView(5)}
          {this._renderNumberView(6)}
        </div>
        <div style={styles.rowContainer}>
          {this._renderNumberView(7)}
          {this._renderNumberView(8)}
          {this._renderNumberView(9)}
        </div>
        <div style={styles.rowContainer}>
          {this._renderNumberView(0)}
          <a onClick={()=>this._numBack()}>
            <div style={styles.funcBlock}>
              <span style={styles.numberText}>清除</span>
            </div>
          </a>
          <a onClick={()=>this.props.confirmFun(this.state.myNumber)}>
            <div style={styles.funcBlock}>
              <span style={styles.numberText}>確定</span>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default Keyboard;
