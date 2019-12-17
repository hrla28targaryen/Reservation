import React from 'react';
import header from './header.scss';
import ModalLike from '../modalComponents/modalLike.jsx';
import moment from 'moment';


const Header = props => {
    const {modalOpen, modalClose, state} = props;
    // pricing schema displayed is based on selected date & date span
    
    // nextTwoWeeks date for pricing schema ======================
    const nextTwoWeeks = moment().add(14, 'days');

    if (!state.startDate) {
      if (state.dateSpan === 3) {
        var priceTag = (<span className={header.productPriceOriginal} >
          ${state.rentPrice} — ${Math.round(Number(state.rentPrice) * 1.25)}
        </span>);
      } else {
        var priceTag = (<span className={header.productPriceOriginal} >
          ${Math.round(Number(state.rentPrice) * 1.6)} — ${Math.round(Number(state.rentPrice) * 1.25 *1.6)}
        </span>);
      }
    } else {
      if (state.dateSpan === 3) {
        if (state.startDate.isBefore(nextTwoWeeks) ) {
          var priceTag = (<span className={header.productPriceOriginal} >
            ${Math.round(Number(state.rentPrice * 1.25))}
          </span>);
        } else {
          var priceTag = (<span className={header.productPriceOriginal} >
            ${Math.round(Number(state.rentPrice))}
          </span>);
        }
      } else {
        if (state.startDate.isBefore(nextTwoWeeks) ) {
          var priceTag = (<span className={header.productPriceOriginal} >
            ${Math.round(Number(state.rentPrice * 1.6 *1.25))}
          </span>);
        } else {
          var priceTag = (<span className={header.productPriceOriginal} >
            ${Math.round(Number(state.rentPrice) * 1.6)}
          </span>);
        }
      }
    }

    return (
      <div id="1header">
        <div className={header.pdpHeader_infoTop} >
          <h1 className={header.h3} >
            <a>{state.designerName}</a>
          </h1>
          <div className="pdpHeader_heart" >
            <div className={header.heart} >
              <div className={header.heart_buttonMinimal} onClick={modalOpen} >
                <img id="sign_in" className={header.like} src="https://s3.amazonaws.com/renttherunwayhrla28/icons/like.png" />
              </div>
              <ModalLike
                className="modalLike"
                show={state.sign_in}
                onHide={modalClose}
              />
            </div>
          </div>
        </div>

        <h2 className={header.pdpHeader_displayName} >
          {state.productName}
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
              ${state.purchasePrice}  retail
              </div>
          </div>
        </div>
      </div>
    );

}

export default Header;