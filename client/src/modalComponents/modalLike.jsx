import React from 'react';
import mod from './modalLike.scss';
import { Button, Modal, ButtonToolbar } from 'react-bootstrap';


class ModalLike extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className={mod.title}>
            Buy Less. Wear More.<br />Get $80 Off 2 Months of Unlimited.
          </Modal.Title>
        </Modal.Header>

        <Modal.Body >
          <form className={mod.likeForm} id="registration-form" action="/account/register" method="post" acceptCharset="UTF-8" noValidate="">
            <input type="hidden" name="destination" />
            <div className={mod.likeFormHead}>
              <label htmlFor="username">Email Address</label>
              <input type="email" id="username" className={mod.emailInput} />
            </div>
            <div className={mod.passForm}>
              <label htmlFor="password" className={mod.passLabel}>Create a Password</label>
              <input type="password" className={mod.passInput}/>
            </div>
            <div className={mod.dateForm}>
              <label htmlFor="birth_month" className={mod.dateLabel} >Birthday</label>
              <input type="tel" maxLength="2" placeholder="MM" id="birth_month" name="birth_month" className={mod.dateInput}/>
              <input type="tel" maxLength="2" placeholder="DD" id="birth_day" name="birth_day" className={mod.dateInput}/>
              <input type="tel" maxLength="4" placeholder="YYYY" id="birth_year" name="birth_year" className={mod.dateInput}/>
            </div>
            <div className={mod.termsConditions}>By registering, I accept the <a href="https://www.renttherunway.com/pages/termsofservice">Terms of Service</a> and <a href="https://www.renttherunway.com/privacy">Privacy Policy</a>.</div>
            <button className={mod.unlockOffer}>
              <span className={mod.unlockOfferTxt}>Unlock My Offer</span>
            </button>
		      </form>

          <div className={mod.socLogSeparator}>
            <p className={mod.orSeparator}>OR</p>
          </div>

          <button className={mod.googleButton}>
          <p className={mod.googleIcon}>Join with Google</p>
			    </button>

          <div className={mod.noSeparator}>
            <u className={mod.hasAccount}>Already have an account? Sign in.</u>
          </div>
        </Modal.Body>

      </Modal >
    );
  }
}

export default ModalLike;

{/* <Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
<Modal.Header closeButton>
  <Modal.Title className={mod.title}>
    Buy Less. Wear More.<br />Get $80 Off 2 Months of Unlimited.
    </Modal.Title>
</Modal.Header>
<Modal.Body>
  <h4>Centered Modal</h4>
  <p>
    Cras mattis consectetur pur<br />us sit amet fermentum. Cra<br />s justo odio,
      <br />dapibus ac facilisis in,<br /> egestas eget quam. M<br />orbi leo risus, p<br />orta
      ac consectetur <br />ac, vestibulum at eros.
    </p>
</Modal.Body>
<Modal.Footer>
  <Button onClick={this.props.onHide}>Close</Button>
</Modal.Footer>
</Modal> */}