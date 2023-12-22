export function submitForm(event, { InputEmail, InptEpochst, Elements, InputAuth }) {
    event.preventDefault()
    const data = {
        email: InputEmail,
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
            console.log(res.ok)
        })
        .catch(err => {
            console.error(err)
        })
}