export const googleService = {
    getGoogleBooks
}


function getGoogleBooks(keyword) {
    const URL = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${keyword}`
    return fetch(URL)
        .then((res) => res.json())
}