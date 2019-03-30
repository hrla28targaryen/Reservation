import React from 'react';
import ReactDOM from 'react-dom';
import index from './index.scss';

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // to be decided later
    }
  }
  render() {
    return (
      <div className={index.pdpWide}>
        Hello from index
      </div>
    );
  }
};

ReactDOM.render(<Reservation />, document.getElementById('Reservation'))