export function submitForm(event, { InputEmail, InptEpochst, Elements, InputAuth, sendForEmail }) {
    event.preventDefault()
    const data = {
        email: InputEmail,
        sendForEmail,
        epochs: InptEpochst,
        data: Elements
    }
    fetch(`${process.env.REACT_APP_BACK_URLBASE}${process.env.REACT_APP_BACK_ENDPOINT_SEND}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authentication': InputAuth
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => {
            console.log('res')
            console.log(res.err)
            console.log(res.message)
        })
        .catch(err => {
            console.error(err)
        })
}