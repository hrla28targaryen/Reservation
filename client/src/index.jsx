import React from 'react';
import Collapsible from 'react-collapsible';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

import header from './header.scss';
import inputForm from './form.scss';
import info from './info.scss';

import ModalLike from './components/modalLike.jsx';
import ModalSize from './components/modalSize.jsx';
import ModalPro from './components/modalPro.jsx';


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
      // below for modal
      sign_in: false,
      size_table: false,
      pro_table: false,
      //below for calendar
      startDate: null,
      endDate: null,
      focusedInput: null,
      dateSpan: 3,
    }
    this.fetchOne = this.fetchOne.bind(this);
    this.onDatesChange = this.onDatesChange.bind(this);
    this.dateSpanChange = this.dateSpanChange.bind(this);
  }

  componentDidMount() {
    this.fetchOne();
  }
  fetchOne() {
    let rand = `HRLA`;
    var i = Math.floor(Math.random() * 100);
    if (i.toString().length === 1) {
      rand += '00' + i.toString();
    } else if (i.toString().length === 2) {
      rand += '0' + i.toString();
    } else if (i.toString().length === 3) {
      rand += i.toString();
    }
    $.get(`/api/${rand}`, (data) => {
      var { productID, productName, designerName, facebook, rentPrice, purchasePrice, items } = data;
      this.setState({
        productID, productName, designerName, facebook, rentPrice, purchasePrice, items
      });
    })
  }

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate });
    var abc = moment(startDate._d);
    abc.add(this.state.dateSpan, 'd'); delete abc._i;
    this.setState({ endDate: abc })
  }

  dateSpanChange(val) {
    this.setState({ dateSpan: val });
  }


  render() {
    // getting all cloths sizes ===============================
    var allSize = this.state.items.map(e => e.size);
    allSize = allSize.filter((item, idx) => allSize.indexOf(item) === idx);

    // close the modal button
    let modalClose1 = () => this.setState({ sign_in: false });
    let modalClose2 = () => this.setState({ size_table: false });
    let modalClose3 = () => this.setState({ pro_table: false });
    
    // blocking all holidays and Sundays ======================
    var start = moment('2019-04-01'), 
    end = moment('2019-09-30'), 
    day = 0;                    
    var holiday = [];
    var memorialDay = moment('2019-05-27'),
    independenceDay = moment('2019-07-04');
    var current = start.clone();
    while (current.day(7 + day).isBefore(end)) {
      holiday.push(current.clone());
    }
    holiday.push(memorialDay, independenceDay);
    holiday.map(m => m.format('LLLL'));

    // nextWeek date for pricing schema ======================
    var nextWeek = moment().add(7, 'days');

    // pricing schema shown is based on selected date & date span
    if (!this.state.startDate) {
      if (this.state.dateSpan === 3) {
        var priceTag = (<span className={header.productPriceOriginal} >
          ${this.state.rentPrice} — ${Math.round(Number(this.state.rentPrice) * 1.25)}
        </span>);
      } else {
        var priceTag = (<span className={header.productPriceOriginal} >
          ${Math.round(Number(this.state.rentPrice) * 1.6)} — ${Math.round(Number(this.state.rentPrice) * 1.25 *1.6)}
        </span>);
      }
    } else {
      if (this.state.dateSpan === 3) {
        if (this.state.startDate.isBefore(nextWeek) ) {
          var priceTag = (<span className={header.productPriceOriginal} >
            ${Math.round(Number(this.state.rentPrice * 1.25))}
          </span>);
        } else {
          var priceTag = (<span className={header.productPriceOriginal} >
            ${Math.round(Number(this.state.rentPrice))}
          </span>);
        }
      } else {
        if (this.state.startDate.isBefore(nextWeek) ) {
          var priceTag = (<span className={header.productPriceOriginal} >
            ${Math.round(Number(this.state.rentPrice * 1.6 *1.25))}
          </span>);
        } else {
          var priceTag = (<span className={header.productPriceOriginal} >
            ${Math.round(Number(this.state.rentPrice) * 1.6)}
          </span>);
        }
      }
    }

    return (
      <div className={header.pdpWide_primary}>
        <div id="1header">
          <div className={header.pdpHeader_infoTop} >
            <h1 className={header.h3} >
              <a>{this.state.designerName}</a>
            </h1>
            <div className="pdpHeader_heart" >
              <div className={header.heart} >
                <div className={header.heart_buttonMinimal} onClick={() => this.setState({ sign_in: true })} >
                  <img className={header.like} src="https://s3.amazonaws.com/hrla28renttherunway/icons/like.png" />
                </div>
                <ModalLike
                  show={this.state.sign_in}
                  onHide={modalClose1}
                />
              </div>
            </div>
          </div>

          <h2 className={header.pdpHeader_displayName} >
            {this.state.productName}
          </h2>

          <div className={header.pdpPrice} >
            <div className={header.pdpPrice_price} >
              <span className="pdpPrice_rentalLabel" >
                <span className="productPrice" >
                  {priceTag}
                  <span className={header.pdpPrice_priceType} >
                    rental
                  </span>
                </span>
              </span>
              <button className={header.questionButton} >
              </button>
              <span className={header.tooltiptext}>
                <p className={header.description}>Price varies depending on date. <br />Pick your date to see price.</p>
                <p className={header.descExit}>x</p>
              </span>
              <span className={header.pdpPrice_priceType} >
                |
              </span>
              <div className={header.gridProductCardPrice} >
                ${this.state.purchasePrice}  retail
              </div>
            </div>
          </div>
        </div>
        <br /><br />

        <div id="2form">
          <form className={inputForm.reservationForm}>
            <div>
              <div className={inputForm.zipCodeWrapper}>
                <label className={inputForm.destinationZip}>ZIP Code</label>
                <input type="tel" pattern="(\d{5}?)" maxLength="5" className={inputForm.reservationZip} />
              </div>

              <div>
                <div className={inputForm.size}>
                  <label className={inputForm.rentableForm} htmlFor="product-primary-size">Size</label>
                  <select id="product-primary-size" className={inputForm.rentableSize}>
                    <option label="Select">Select</option>
                    {allSize.map((e, idx) => (
                      <option key={idx} value={e} label={e}>{e}</option>
                    ))}
                  </select>
                </div>

                <div className={inputForm.sizebackup}>
                  <label className={inputForm.rentableForm} htmlFor="product-primary-size">FREE BACKUP SIZE</label>
                  <select id="product-primary-size" className={inputForm.rentableSize}>
                    <option label="Select">Select</option>
                    {allSize.map((e, idx) => (
                      <option key={idx} value={e} label={e}></option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={inputForm.sizeRefTable}>
                <div className={inputForm.sizeRefButton} onClick={() => this.setState({ size_table: true })} >SIZE &amp; FIT </div>&nbsp;
                <ModalSize
                  show={this.state.size_table}
                  onHide={modalClose2}
                />
              </div>

              <div className={inputForm.reservationDateDiv}>
                <fieldset className={inputForm.reservationDateWindow}>
                  <legend className={inputForm.labelReservationDateWindow_legend}>DELIVERY + RETURN DATES</legend>
                  <div className={inputForm.reservationDateWindow_durations}>
                    <div>
                      <label className={inputForm.radioContainter} onClick={() => this.dateSpanChange(3)}>
                        <input type="radio" id="rentaldays-4" value="4" defaultChecked name="radio" />
                        <span className={inputForm.checkmark} value="4" ></span>
                        <div className={inputForm.radioWord}>4-day rental</div>
                      </label>
                    </div>
                    <div>
                      <label className={inputForm.radioContainter} onClick={() => this.dateSpanChange(7)}>
                        <input type="radio" id="rentaldays-8" value="8" name="radio" />
                        <span className={inputForm.checkmark} value="8" ></span>
                        <div className={inputForm.radioWord}>8-day rental</div>
                      </label>
                    </div>
                  </div>

                  <div className={inputForm.reservationDateWindow_date}>
                    <label className={inputForm.datepickerLabel} htmlFor="holdDate"></label>
                    <DateRangePicker
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onDatesChange={this.onDatesChange}
                      focusedInput={this.state.focusedInput}
                      onFocusChange={focusedInput => this.setState({ focusedInput })}
                      numberOfMonths={1}
                      hideKeyboardShortcutsPanel
                      enableOutsideDays
                      displayFormat="ddd M/DD"
                      customInputIcon={<img src='https://s3.amazonaws.com/hrla28renttherunway/icons/calendar.png' width={25} height={25} />}
                      inputIconPosition="after"
                      customArrowIcon={<p>_</p>}
                      small
                      withPortal
                      calendarInfoPosition="top"
                      renderCalendarInfo={() => <div><div className="closeButton">x</div><center className="calendarInfo">Pick a delivery date 1–2 days before your event</center></div>}
                      transitionDuration={0}
                      isDayBlocked={day => holiday.filter(d => d.isSame(day, 'day')).length > 0}
                      endDateOffset={day => day.clone().add(this.state.dateSpan, "d")}
                      isOutsideRange={(day) => day.isBefore(moment()) || day.isAfter(moment().add(90, 'days'))}
                      onPrevMonthClick={this.onPrevMonthClick}
                      endDateId="123"
                      startDateId="abc"
                    />
                  </div>
                  <input type="hidden" name="reservation[date]" value="" />
                </fieldset>
              </div>

              <div className={inputForm.ctaContainer}>
                <div className={inputForm.pro_cta}>
                  <div className="input-wrapper pro-cta__input-pair">
                    <input className={inputForm.includeProHidden} type="hidden" name="includePro" value="0" />
                    <label className={inputForm.includeProCheckbox}>
                      <input type="checkbox" id="reservationPro" name="includePro" value="1" />
                      <span className={inputForm.includeProSpan}></span>
                    </label>
                    <label htmlFor="reservationPro" className={inputForm.proLabel}>I want free shipping &amp; insurance with PRO.
                    </label>
                    <a className={inputForm.standAlone} onClick={() => this.setState({ pro_table: true })} >Learn More</a>
                    <ModalPro
                      show={this.state.pro_table}
                      onHide={modalClose3}
                    />
                  </div>
                  <div className={inputForm.labelPRO}></div>
                </div>
              </div>

              <div className="add-to-bag-button">
                <button className={inputForm.btnFullWidth} type="submit">Add to Bag</button>
              </div>
            </div>
          </form>
        </div>

        <div id="3info">
          <div className={info.infoCallout} >
            <div className={info.infoCalloutSurtext} >
              100% Fit Guarantee
            </div>
            <div className={info.infoCalloutHed} >
              Select your free second style on the next screen.
            </div>
            <p className={info.infoCalloutDek}>
              That's&nbsp;
              <span className={info.italic}>in addition</span>
              &nbsp;to your free backup size.
            </p>
          </div>

          <div className={info.productDetails}>
            <Collapsible transitionTime={10} trigger="Stylist Notes" className={info.collapsibleTitle}  >
              <div className={info.collapsibleContent}>
                <p>Experience this wonderful {this.state.productName.split(' ')[1]} designed by {this.state.designerName}.</p>
              </div>
            </Collapsible>

            <Collapsible transitionTime={10} trigger="SIZE &amp; FIT" className={info.collapsibleTitle}  >
              <div className={info.collapsibleContent}>
                <p>Size available from {String(allSize[0]).split(',')[0]} to {String(allSize[0]).split(',')[0] === String(allSize[allSize.length - 1]).split(',')[0] ? String(allSize[allSize.length - 2]).split(',')[0] : String(allSize[allSize.length - 1]).split(',')[0]}</p>
              </div>
            </Collapsible>

            <Collapsible transitionTime={10} trigger="Product Details" className={info.collapsibleTitle}  >
              <div className={info.collapsibleContent}>
                <p>{this.state.productName.split(' ')[0]}. See size and fit tab for length. Imported.</p>
              </div>
            </Collapsible>

            <Collapsible transitionTime={10} trigger="Share" className={info.collapsibleTitle}  >
              <div className={info.collapsibleContent}>
                <div className={info.facebook}>
                  <button> <div> </div><b>Like</b> {this.state.facebook}</button>
                </div>
                <div className={info.share}>
                  <button> <b>Share</b></button>
                </div>
                <button className={info.pinteresta} >
                </button>
              </div>
            </Collapsible>
          </div>
        </div>

      </div>
    );
  }
};

//window.Reservation = Reservation;
ReactDOM.render(<Reservation />, document.getElementById('Reservation'))



