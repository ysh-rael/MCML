import './index.css'

export function Switch({ Checked, setChecked }) {

    return <div class="Switch" onClick={event => {
        event.preventDefault()
        setChecked(!Checked)
    }} >
        <input type="checkbox" id="switchCheckbox" checked={Checked} />
        <label for="switchCheckbox"></label>
    </div>
}