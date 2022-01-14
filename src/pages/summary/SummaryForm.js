import { useState } from "react"

 function SummaryForm() {

    const [disabledBtn, setDisabledBtn] = useState(false)

    return (
        <div>
            <input type={'checkbox'}  id="disabled-order-btn-checkbox" onChange={(e) => {setDisabledBtn(e.target.checked)}}/>
            <label htmlFor="disabled-order-btn-checkbox">I agree to</label>
            <button disabled={ !disabledBtn }>Confirm order</button>
        </div>
    )
}

export default SummaryForm;