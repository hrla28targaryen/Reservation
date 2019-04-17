import React from 'react';
import mod from './modalPro.scss';
import { Button, Modal, ButtonToolbar } from 'react-bootstrap';


class ModalSize extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className={mod.header} closeButton>
        </Modal.Header>

        <Modal.Body className={mod.mBody}>
          <div className={mod.wrapper}>
            <div className={mod.teaser}>
              <h3 className={mod.title}>Save at least $14.95 on every order and rent like a pro all year long.</h3>
              <p><a className={mod.standAlone} href="https://www.renttherunway.com/pages/rtr_pro" >Details</a></p>
              <ul className={mod.ulcontainer}>
                <li className={mod.list}><em className={mod.emp}>Free</em> Standard Shipping</li>
                <li className={mod.listMiddle}><em className={mod.emp}>Free</em> Insurance</li>
                <li className={mod.listMiddle}><em className={mod.emp}>Free</em> Birthday Dress</li>
              </ul>
              <div >
                <button className={mod.blackbutton}>Join now for $29.95/year</button>
              </div>
              <p className={mod.disclaimer}>Renews automatically every year, cancel anytime.</p>
            </div>
          </div>
        </Modal.Body>

      </Modal >
    );
  }
}

export default ModalSize;

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