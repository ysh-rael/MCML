import { useState } from "react"
import { submitForm } from "./handler"

export function FormSendRequestModel({ setModalActive, setModelContent, Elements }) {

    const [InputEmail, setInputEmail] = useState('')
    const [InptEpochst, setInptEpochst] = useState(120)

    function test(Elements) {
        if (!Elements) return
        if (!Elements.length) return
        let stop = true
        Elements.forEach(esse => {
            if (esse.imgs.length) stop = false
        })
        if (stop) return
        return true
    }

    const form = <form className="form" onSubmit={(event) => submitForm(event, { InputEmail, InptEpochst, Elements })}>
        <span className="subtitle is-info">Your model will be sent to your email</span>

        <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
                <input type="email" class="input" placeholder="YourEmail@YourHost.com" id="inptToken" value={InputEmail} onChange={({ target }) => setInputEmail(target.value)} />
                <span class="icon is-small is-left">
                    <i class="fa-solid fa-envelope"></i>
                </span>
            </div>
        </div>

        <div class="field">
            <label class="label">Number of epochst</label>
            <div class="control">
                <input class="button" type="number" placeholder="120-8k" min={120} max={8000} value={InptEpochst} onChange={({ target }) => setInptEpochst(target.value)} />
            </div>
        </div>


        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link">Confirm</button>
            </div>
            <div class="control">
                <span class="button is-link is-light" onClick={() => { setModalActive(false); setModelContent(null) }}>Cancel</span>
            </div>
        </div>


    </form>

    const ElementIsNull = 'You need to create an Object Group and include at least one image that contains it'

    return test(Elements) ? form : ElementIsNull

}

