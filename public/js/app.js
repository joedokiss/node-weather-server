/**
 * this JS is running from frontend used by the browser
 */

// const puzzleUrl = 'http://puzzle.mead.io/puzzle';

const weatherForm = document.querySelector('form');
const address = document.querySelector('input');

const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    message1.textContent = 'Loading...';
    message2.textContent = '';

    const location = address.value;

    // const url = 'http://localhost:3000/weather?address=' + location;
    const url = '/weather?address=' + location; // for live on Heroku
    
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log('Request successful', data);

            if(data.error)
            {
                message1.textContent = data.error;
            }
            else
            {
                message1.textContent = data.location;
                message2.textContent = data.summary;
            }
        })
        .catch(error => {
            console.log('Request failed', error);
            message1.textContent = error;
        })
});