import React from 'react';
import ReactDOM from 'react-dom';
import header from './header.scss';
import inputForm from './form.scss';
import $ from 'jquery';

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
      items: []
    }
    this.fetchOne = this.fetchOne.bind(this);
  }
  componentDidMount() {
    this.fetchOne();
  }
  fetchOne() {
    let rand = `HRLA${String(Math.floor(Math.random() * 100)).padStart(3, 0)}`
    $.get(`/api/${rand}`, data => {
      var { productID, productName, designerName, facebook, rentPrice, purchasePrice, items } = data;
      this.setState({
        productID, productName, designerName, facebook, rentPrice, purchasePrice, items
      });
    })
  }
  render() {
    var allSize = this.state.items.map(e => e.size);
    allSize = allSize.filter((item, idx) => allSize.indexOf(item) === idx);
    return (
      <div className={header.pdpWide_primary}>
        <div id="1header">
          <div className={header.pdpHeader_infoTop} >
            <h1 className={header.h3} >
              <a>{this.state.designerName}</a>
            </h1>
            <div className="pdpHeader_heart" >
              <div className={header.heart} >
                <button className={header.heart_buttonMinimal} >
                  <img className={header.like} src="like.png" />
                </button>
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
                  <span className={header.productPriceOriginal} >
                    ${this.state.rentPrice} — ${Math.round(Number(this.state.rentPrice) * 1.25)}
                  </span>
                  <span className={header.pdpPrice_priceType} >
                    rental
                  </span>
                </span>
              </span>
              <img src="question.png" className={header.pdpPrice_noDiscount} />
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
                      <option value={e} label={e}>{e}</option>
                    )
                    )}
                  </select>
                </div>

                <div className={inputForm.sizebackup}>
                  <label className={inputForm.rentableForm} htmlFor="product-primary-size">FREE BACKUP SIZE</label>
                  <select id="product-primary-size" className={inputForm.rentableSize}>
                    <option label="Select">Select</option>
                    {allSize.map((e, idx) => (
                      <option value={e} label={e}></option>
                    )
                    )}
                  </select>
                </div>
              </div>

              <div className={inputForm.sizeRefTable}>
                <button className={inputForm.sizeRefButton} type="button">SIZE &amp; FIT</button>&nbsp;
              </div>

              <div className={inputForm.reservationDateDiv}>
                <fieldset className={inputForm.reservationDateWindow}>
                  <legend className={inputForm.labelReservationDateWindow_legend}>DELIVERY + RETURN DATES</legend>
                  <div className={inputForm.reservationDateWindow_durations}>
                    <div>
                      <label className={inputForm.radioContainter}>
                        <input type="radio" id="rentaldays-4" value="4" defaultChecked name="radio"/>
                        <span className={inputForm.checkmark} value="4" ></span>
                        <div className={inputForm.radioWord}>4-day rental</div>
                      </label>
                    </div>
                    <div>
                      <label className={inputForm.radioContainter}>
                        <input type="radio" id="rentaldays-8" value="8" name="radio"/>
                        <span className={inputForm.checkmark} value="8" ></span>
                        <div className={inputForm.radioWord}>8-day rental</div>
                      </label>
                    </div>
                  </div>

                  <div className={inputForm.reservationDateWindow_date}>
                    <label className={inputForm.datepickerLabel} htmlFor="holdDate"></label>
                    <input type="date" className={inputForm.datePicker} readOnly="" id="holdDate" />
                  </div>

                  <input type="hidden" name="reservation[date]" value="" />
                </fieldset>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

ReactDOM.render(<Reservation />, document.getElementById('Reservation'))