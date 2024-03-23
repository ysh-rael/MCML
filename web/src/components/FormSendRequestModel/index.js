import { useState } from "react"
import { submitForm } from "./handler"
import { Switch } from "../Switch"

export function FormSendRequestModel({ setModalActive, setModelContent, Elements }) {

    const [InputEmail, setInputEmail] = useState('')
    const [InputAuth, setInputAuth] = useState('')
    const [InptEpochst, setInptEpochst] = useState(4)
    const [Checked, setChecked] = useState(false)

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

    const form = <form className="form" onSubmit={(event) => submitForm(event, { InputEmail, InptEpochst, Elements, InputAuth, sendForEmail: Checked })}>
        <span className="subtitle is-info">{Checked ? 'Your model will be sent to your email' : 'Wait finish for download your model'}</span>

        <div class="field">
            <label class="label">Authentication</label>
            <div class="control has-icons-left has-icons-right">
                <input type="text" class="input" placeholder="Your MCML Token here" id="InputAuth" value={InputAuth} onChange={({ target }) => setInputAuth(target.value)} required={true} />
                <span class="icon is-small is-left">
                    <i class="fa-solid fa-key"></i>
                </span>
                <p class="help is-info">{/* <a href="" target="_blank" rel="noreferrer"> */}Get a token (disabled){/* </a> */}</p>
            </div>
        </div>

        <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
                <input type="email" class="input" placeholder="YourEmail@YourHost.com" id="inptToken" value={InputEmail} onChange={({ target }) => setInputEmail(target.value)} disabled={!Checked} />
                <span class="icon is-small is-left">
                    <i class="fa-solid fa-envelope"></i>
                </span>
            </div>
        </div>

        <div class="field">
            <label class="label">Send for email</label>
            <div class="control">
                <Switch Checked={Checked} setChecked={setChecked} />
            </div>
        </div>

        <div class="field">
            <label class="label">Number of epochst</label>
            <div class="control">
                <input class="button" type="number" placeholder="4-400" min={4} max={400} value={InptEpochst} onChange={({ target }) => setInptEpochst(Number(target.value))} />
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

