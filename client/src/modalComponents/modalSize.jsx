import React from 'react';
import mod from './modalSize.scss';
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
          <div className={mod.title}>
            Size & Fit Notes
          </div>
          <div className={mod.small}><p>Sized: Regular measures 45" from shoulder to hemline.</p></div>
          <div><h3 className={mod.sizeChart}>Size Chart</h3></div>
          <div className={mod.sizeImg}></div>

          <div><h3 className={mod.sizeChart}>Plus Size Size Chart</h3></div>
          <div className={mod.plusImg}></div>

          <div><h3 className={mod.sizeChart}>Length Chart</h3></div>
          <div className={mod.lengthImg}></div>
          <div className={mod.lengthDisclaimer}>DRESSES MAY NOT BE OFFERED IN ALL OF THE ABOVE LENGTHS.</div>
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