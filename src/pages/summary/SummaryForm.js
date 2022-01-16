import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SummaryForm() {
  const [disabledBtn, setDisabledBtn] = useState(false);

  const checkboxLabel = (
    <span>
      I agree to <span style={{ color: "blue" }}>Terms and Conditions</span>
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
