import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import moment from 'moment';

import header from './mainComponents/header.scss';

import Header_1 from './mainComponents/header.jsx';
import Form_2 from './mainComponents/form.jsx';
import Info_3 from './mainComponents/info.jsx'


class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: '',
      productName: '',
      designerName: '',
      facebook: 0,
      rentPrice: 0,
      purchasePrice: 0,
      items: [],
      bookedDate: [],
      // below for modals
      sign_in: false,
      size_table: false,
      pro_table: false,
      //below for calendar
      startDate: null,
      endDate: null,
      stringDateRange:"",
      focusedInput: null,
      dateSpan: 3,
    }
    this.fetchOne = this.fetchOne.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.onDatesChange = this.onDatesChange.bind(this);
    this.dateSpanChange = this.dateSpanChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.renderCalendarInfo = this.renderCalendarInfo.bind(this);
    this.isDayHighlighted = this.isDayHighlighted.bind(this);
    this.isOutsideRange = this.isOutsideRange.bind(this);
    this.endDateOffset = this.endDateOffset.bind(this);
  }

  componentDidMount() {
    this.fetchOne();
  }
  fetchOne() { // fetch randomly from db
    let rand = `HRLA`;
    var i = String(Math.floor(Math.random() * 100));
    rand += i.padStart(3,"0");
    var tempItems = {};
    $.get(`/api/reservation/${rand}`, ({ productID, productName, designerName, facebook, rentPrice, purchasePrice, items }) => {
      for (let item of items) {
        if (!Object.keys(tempItems).includes(item.size)) {
          tempItems[item.size] = [];
          for (let date of item.bookedDate) {
            tempItems[item.size].push(new Date(date).toDateString());
          }
        } else {
          var pivotDate = [];
          for ( let date of item.bookedDate ) {
            if (tempItems[item.size].includes(new Date(date).toDateString())) {
              pivotDate.push(date)
            }
          }
          tempItems[item.size] = pivotDate;
        }
      }
      var filteredArr = [];
      for (let key in tempItems) {
        let tempObj = {};
        tempObj.size = key;
        tempObj.bookedDate = tempItems[key];
        filteredArr.push(tempObj)
      }
      this.setState({
        productID, productName, designerName, facebook, rentPrice, purchasePrice, items: filteredArr
      });
    })
  }

  modalOpen(e) {
    const {id} = e.target;
    this.setState({ [id]: true });
  }

  modalClose() {
    this.setState({
      sign_in: false,
      size_table: false,
      pro_table: false,
    });
  }

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate });
    this.setState({ endDate });
    let str = `${moment(startDate).format('ddd M/DD')} - ${moment(endDate).format('ddd M/DD')}`;
    this.setState({stringDateRange: str});
  }

  dateSpanChange(val) {
    this.setState({ dateSpan: val });
  }

  handleChange(event) {
    let dateArray1 = event.target.value.split(',');
    let dateArray = [];
    for (let d of dateArray1) {
      dateArray.push(moment(d));
    }
    this.setState({ bookedDate: dateArray });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  renderCalendarInfo() {
    return <div><div className="closeButton">x</div><center className="calendarInfo">Pick a delivery date 1–2 days before your event</center></div>;
  }

  isDayHighlighted (day) {
    return this.state.bookedDate.filter(d => d.isSame(day, 'day')).length > 0;
  }

  isOutsideRange (day) {
    return day.isBefore(moment()) || day.isAfter(moment().add(120, 'days'));
  }

  endDateOffset (day) {
    return day.clone().add(this.state.dateSpan, "d");
  }

  render() {
    // getting all cloths sizes ===============================
    var allSize = this.state.items.map(e => e.size);
    allSize = allSize.filter((item, idx) => allSize.indexOf(item) === idx);

    return (
      <div className={header.pdpWide_primary}>
        <Header_1
        state={this.state}
        modalOpen={this.modalOpen}
        modalClose={this.modalClose}
        />
        <br /><br />

        <Form_2
        allSize={allSize}
        state={this.state}
        handleChange={this.handleChange}
        modalOpen={this.modalOpen}
        modalClose={this.modalClose}
        onDatesChange={this.onDatesChange}
        onFocusChange={this.onFocusChange}
        dateSpanChange={this.dateSpanChange}
        renderCalendarInfo={this.renderCalendarInfo}
        endDateOffset={this.endDateOffset}
        isOutsideRange={this.isOutsideRange}
        isDayHighlighted={this.isDayHighlighted}
        />

        <Info_3
        state={this.state}
        allSize={allSize}
        />

      </div>
    );
  }
};

//window.Reservation = Reservation;
ReactDOM.render(<Reservation />, document.getElementById('Reservation'))