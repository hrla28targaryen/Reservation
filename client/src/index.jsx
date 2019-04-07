import React from 'react';
import Collapsible from 'react-collapsible';
import ReactDOM from 'react-dom';
import header from './header.scss';
import inputForm from './form.scss';
import info from './info.scss';
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
              <button className={header.questionButton} >
              </button>
              <span className={header.tooltiptext}>
                <p className={header.description}>Price varies depending on date. <br/>Pick your date to see price.</p>
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
                        <input type="radio" id="rentaldays-4" value="4" defaultChecked name="radio" />
                        <span className={inputForm.checkmark} value="4" ></span>
                        <div className={inputForm.radioWord}>4-day rental</div>
                      </label>
                    </div>
                    <div>
                      <label className={inputForm.radioContainter}>
                        <input type="radio" id="rentaldays-8" value="8" name="radio" />
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
                    <a className={inputForm.standAlone} type="button">Learn More</a>
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
            <Collapsible transitionTime="10"  trigger="Stylist Notes"className={info.collapsibleTitle}  >
              <div className={info.collapsibleContent}>
                <p>Experience this beautiful {this.state.productName.split(' ')[1]} designed by {this.state.designerName}.</p>
              </div>
            </Collapsible>

            <Collapsible transitionTime="10" trigger="SIZE &amp; FIT" className={info.collapsibleTitle}  >
              <div className={info.collapsibleContent}>
                <p>Size available from {String(allSize[0]).split(',')[0]} to {String(allSize[0]).split(',')[0]===String(allSize[allSize.length-1]).split(',')[0]?String(allSize[allSize.length-2]).split(',')[0]:String(allSize[allSize.length-1]).split(',')[0]}</p>
              </div>
            </Collapsible>

            <Collapsible transitionTime="10" trigger="Product Details" className={info.collapsibleTitle}  >
              <div className={info.collapsibleContent}>
                <p>{this.state.productName.split(' ')[0]}. See size and fit tab for length. Imported.</p>
              </div>
            </Collapsible>

            <Collapsible transitionTime="10" trigger="Share" className={info.collapsibleTitle}  >
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


ReactDOM.render(<Reservation />, document.getElementById('Reservation'))