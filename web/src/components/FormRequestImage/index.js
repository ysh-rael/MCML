import { useState } from "react"
import { formOnSubmit, inptSearchOnChange } from "./handler"

export function FormRequestImage({ setModalActive, setModelContent, setRequestImg, setOptionsRequestImg }) {
    const [SearchElemnts, setSearchElemnts] = useState([])
    const [InptSearch, setInptSearch] = useState('')
    const [InptToken, setInptToken] = useState('')
    const [InptPerRequest, setInptPerRequest] = useState(1)
    return <form className="form" onSubmit={(event) => formOnSubmit(event, { SearchElemnts, InptToken, InptPerRequest, setRequestImg, setOptionsRequestImg })}>

        <div class="field">
            <label class="label">Choose an API</label>
            <div class="control">
                <div class="select">
                    <select id="SelectAPI">
                        <option value={'PexelsAPI'}>Pexels API</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="field">
            <label class="label">Token</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Your token" id="inptToken" value={InptToken} onChange={({ target }) => setInptToken(target.value)} />
                <span class="icon is-small is-left">
                    <i class="fa-solid fa-key"></i>
                </span>
            </div>
            <p class="help is-info"> <a href="https://www.pexels.com/pt-br/api/new/" target="_blank">
                Request an API key</a></p>
        </div>

        <div class="field">
            <label class="label">Search for</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="exemple: car" value={InptSearch} onChange={({ target }) => inptSearchOnChange(target, setInptSearch, setSearchElemnts)} />
                <span class="icon is-small is-left">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </span>
            </div>
            <p class="help">Separate with spaces</p>
        </div>
        <div>
            {SearchElemnts}
        </div>

        <div class="field">
            <label class="label">Maximum elements per request</label>
            <div class="control">
                <input class="button" type="number" placeholder="1-80" min={1} max={80} value={InptPerRequest} onChange={({ target }) => setInptPerRequest(target.value)} />
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
}