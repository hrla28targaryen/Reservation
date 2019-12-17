import React from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

import inputForm from './form.scss';
import ModalSize from '../modalComponents/modalSize.jsx';
import ModalPro from '../modalComponents/modalPro.jsx';
import CalArrowIcon from "./arrowIcon.jsx";


class Form extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { allSize, handleChange, state, modalOpen, modalClose, onDatesChange, onFocusChange, dateSpanChange, renderCalendarInfo, endDateOffset, isOutsideRange, isDayHighlighted } = this.props;

    // blocking all holidays and Sundays ======================
    var start = moment('2019-04-01'),
      end = moment('2019-09-30'),
      memorialDay = moment('2019-05-27'),
      independenceDay = moment('2019-07-04');
    var holiday = [];
    var current = start.clone();
    while (current.day(7).isBefore(end)) {
      holiday.push(current.clone());
    }
    holiday.push(memorialDay, independenceDay);
    holiday.push(...state.bookedDate);
    holiday.map(m => m.format('LLLL'));

    return (
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
                <select id="product-primary-size" className={inputForm.rentableSize} onChange={handleChange}>
                  <option label="Select">Select</option>
                  {state.items.map((e, idx) => (
                    <option key={idx} value={e.bookedDate} label={e.size}></option>
                  ))}
                </select>
              </div>

              <div className={inputForm.sizebackup}>
                <label className={inputForm.rentableForm} htmlFor="product-primary-size">FREE BACKUP SIZE</label>
                <select id="product-secondary-size" className={inputForm.rentableSize}>
                  <option label="Select">Select</option>
                  {allSize.map((e, idx) => (
                    <option key={idx} value={e} label={e}></option>
                  ))}
                </select>
              </div>
            </div>

            <div className={inputForm.sizeRefTable}>
              <div id="size_table" className={inputForm.sizeRefButton} onClick={modalOpen} >SIZE &amp; FIT </div>&nbsp;
                <ModalSize
                className="modalSizeTable"
                show={state.size_table}
                onHide={modalClose}
              />
            </div>

            <div className={inputForm.reservationDateDiv}>
              <fieldset className={inputForm.reservationDateWindow}>
                <legend className={inputForm.labelReservationDateWindow_legend}>DELIVERY + RETURN DATES</legend>
                <div className={inputForm.reservationDateWindow_durations}>
                  <div>
                    <label className={inputForm.radioContainter} onClick={() => dateSpanChange(3)}>
                      <input type="radio" id="rentaldays-4" value="4" defaultChecked name="radio" />
                      <span className={inputForm.checkmark} value="4" ></span>
                      <div className={inputForm.radioWord}>4-day rental</div>
                    </label>
                  </div>
                  <div>
                    <label className={inputForm.radioContainter} onClick={() => dateSpanChange(7)}>
                      <input type="radio" id="rentaldays-8" value="8" name="radio" />
                      <span className={inputForm.checkmark} value="8" ></span>
                      <div className={inputForm.radioWord}>8-day rental</div>
                    </label>
                  </div>
                </div>

                <div className={inputForm.reservationDateWindow_date}>
                  <input readOnly style={{zIndex: "-1", position:"absolute", width:"250px", padding:"13px 13px", background:"transparent", border:"none", lineHeight:"18px", font:"200 16px Times New Roman", color:"#333333", letterSpacing:"0.2px"}} type="text" value={state.stringDateRange} />
                  <label className={inputForm.datepickerLabel} htmlFor="holdDate"></label>
                  <DateRangePicker
                    startDate={state.startDate}
                    endDate={state.endDate}
                    onDatesChange={onDatesChange}
                    focusedInput={state.focusedInput}
                    onFocusChange={focusedInput => onFocusChange(focusedInput)}
                    numberOfMonths={1}
                    hideKeyboardShortcutsPanel
                    enableOutsideDays
                    displayFormat="ddd M/DD "
                    customInputIcon={<img src='https://s3.amazonaws.com/renttherunwayhrla28/icons/calendar.png' width={25} height={25} />}
                    inputIconPosition="after"
                    customArrowIcon = {<div> _ </div>}
                    small
                    withPortal
                    calendarInfoPosition="top"
                    transitionDuration={0}
                    renderCalendarInfo={renderCalendarInfo}
                    isDayBlocked={day => holiday.filter(d => d.isSame(day, 'day')).length > 0}
                    endDateOffset={day => endDateOffset(day)}
                    isOutsideRange={day => isOutsideRange(day)}
                    isDayHighlighted={day => isDayHighlighted(day)}
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
                  <a id="pro_table" className={inputForm.standAlone} onClick={modalOpen} >Learn More</a>
                  <ModalPro
                    className="modalPro"
                    show={state.pro_table}
                    onHide={modalClose}
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
    );
  }
}


export default Form;