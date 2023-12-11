export function inptSearchOnChange(target, setInptSearch, setSearchElemnts) {
    if (target.value === ' ') return
    if (target.value[target.value.length - 1] === ' ') {
        setSearchElemnts(prev => [...prev, <span className="button is-small" value={(target.value).replaceAll(' ', '')}> {(target.value).replaceAll(' ', '')} </span>])
        setInptSearch('')
    } else setInptSearch(target.value)

}

export function formOnSubmit(event, { SearchElemnts, InptToken, InptPerRequest, setRequestImg, production, setOptionsRequestImg }) {
    if (!production) {
        event.preventDefault()
        setOptionsRequestImg({ headers: { 'Authorization': 'HhYgHSAQH5vRO8TXtslVmDZcaGq6VttlCxir2uEuUr2wYA54JXNV3cFz' } })
        return setRequestImg({
            "page": 1,
            "per_page": 1,
            "photos": [
                {
                    "id": 19262597,
                    "width": 4000,
                    "height": 6000,
                    "url": "https://www.pexels.com/photo/young-woman-in-a-coat-and-hat-standing-on-the-street-in-city-19262597/",
                    "photographer": "Orhan Pergel",
                    "photographer_url": "https://www.pexels.com/@skylake",
                    "photographer_id": 276311913,
                    "avg_color": "#888282",
                    "src": {
                        "original": "https://images.pexels.com/photos/19262597/pexels-photo-19262597.jpeg",
                        "large2x": "https://images.pexels.com/photos/19262597/pexels-photo-19262597.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                        "large": "https://images.pexels.com/photos/19262597/pexels-photo-19262597.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                        "medium": "https://images.pexels.com/photos/19262597/pexels-photo-19262597.jpeg?auto=compress&cs=tinysrgb&h=350",
                        "small": "https://images.pexels.com/photos/19262597/pexels-photo-19262597.jpeg?auto=compress&cs=tinysrgb&h=130",
                        "portrait": "https://images.pexels.com/photos/19262597/pexels-photo-19262597.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
                        "landscape": "https://images.pexels.com/photos/19262597/pexels-photo-19262597.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
                        "tiny": "https://images.pexels.com/photos/19262597/pexels-photo-19262597.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
                    },
                    "liked": false,
                    "alt": ""
                }
            ],
            "total_results": 8000,
            "next_page": "https://api.pexels.com/v1/search/?page=2&per_page=1&query=%5Bcar%5D"
        })
    }

    try {
        let urlBase = false
        let options = {}
        event.preventDefault()
        const selectAPI = document.getElementById('SelectAPI')
        //  console.log(selectAPI.value)
        switch (selectAPI.value) {
            // https://api.pexels.com/v1/search/?page=1&per_page=30&query=[nature,people]
            case 'PexelsAPI':
                urlBase = 'https://api.pexels.com/v1/search?page=1'
                break
        }


        if (SearchElemnts.length) {
            urlBase += `&query=[${(SearchElemnts.map(esse => esse.props.value).join())}]`
        }

        if (InptToken) options.headers = { 'Authorization': InptToken }

        if (InptPerRequest) urlBase += `&per_page=${InptPerRequest}`

        setRequestImg({ url: urlBase, options })
    } catch (error) {
        console.error(error)
        setRequestImg(null)
    }

}