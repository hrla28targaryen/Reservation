import React from 'react';
import Collapsible from 'react-collapsible';

import info from './info.scss';


class Info extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {state, allSize} = this.props;
    return (
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
              <p>Experience this wonderful {state.productName.split(' ')[1]} designed by {state.designerName}.</p>
            </div>
          </Collapsible>

          <Collapsible transitionTime={10} trigger="SIZE &amp; FIT" className={info.collapsibleTitle}  >
            <div className={info.collapsibleContent}>
              <p>Size available from {String(allSize[0]).split(',')[0]} to {String(allSize[0]).split(',')[0] === String(allSize[allSize.length - 1]).split(',')[0] ? String(allSize[allSize.length - 2]).split(',')[0] : String(allSize[allSize.length - 1]).split(',')[0]}</p>
            </div>
          </Collapsible>

          <Collapsible transitionTime={10} trigger="Product Details" className={info.collapsibleTitle}  >
            <div className={info.collapsibleContent}>
              <p>{state.productName.split(' ')[0]}. See size and fit tab for length. Imported.</p>
            </div>
          </Collapsible>

          <Collapsible transitionTime={10} trigger="Share" className={info.collapsibleTitle}  >
            <div className={info.collapsibleContent}>
              <div className={info.facebook}>
                <button> <div> </div><b>Like</b> {state.facebook}</button>
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
    );
  }
}

export default Info;