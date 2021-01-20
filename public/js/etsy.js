//grabbing DOM elements
const searchBtn = document.getElementById('search-btn');
const productInputEl = document.getElementById('productName')
const resultsHolder = document.getElementById('resultsDisplay');
const resultOne = document.getElementById('result-one');
const resultTwo = document.getElementById('result-two');
const resultThree = document.getElementById('result-three');
const resultFour = document.getElementById('result-four');
const resultFive = document.getElementById('result-five');



resultsHolder.style.display = "none";
//function that calls the Etsy API and returns data
search = (event) => {
    event.preventDefault();
    
    //takes the user input and plugs it into the api url
    let product = productInputEl.value.trim();
    etsyApiURL =`https://openapi.etsy.com/v2/listings/active?keywords=${product}&api_key=dzoouqyq8ghesfvn9jy7fj6b`;
    console.log(etsyApiURL);

    //fetch call and response
    fetch(etsyApiURL).then((response) => {
        if (response.ok) {
            console.log(response);
            response.json().then((data) => {
                console.log(data.results);

                resultsHolder.style.display = "block";
                let results = data.results;

                
                    resultOne.innerHTML = results[0].title + " Price: " + results[0].price
                    resultOne.href = results[0].url
                    resultOne.target = '_blank';
                    resultTwo.innerHTML = results[1].title + " Price: " + results[1].price;
                    resultTwo.href = results[1].url
                    resultTwo.target = '_blank';
                    resultThree.innerHTML = results[2].title + " Price: " + results[2].price;
                    resultThree.href = results[2].url;
                    resultThree.target= '_blank';
                    resultFour.innerHTML = results[3].title + " Price: " + results[3].price;
                    resultFour.href = results[3].url;
                    resultFour.target = '_blank';
                    resultFive.innerHTML = results[4].title + " Price: " + results[4].price;
                    resultFive.href = results[4].url;
                    resultFive.target = '_blank';

                

            });
        };
    }); 
};



//event listener
searchBtn.addEventListener('click', search);


