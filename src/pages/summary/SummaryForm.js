import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'


function SummaryForm() {
  const [disabledBtn, setDisabledBtn] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>no ice cream will be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
        I agree to
      <OverlayTrigger trigger="hover" placement="bottom" overlay={popover}>
         <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );



  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          id="disabled-order-btn-checkbox"
          onChange={(e) => {
            setDisabledBtn(e.target.checked);
          }}
          label={checkboxLabel}
        />
      </Form.Group>

      <Button type="submit" disabled={!disabledBtn}>
        Confirm order
      </Button>
    </Form>
  );
}

export default SummaryForm;
