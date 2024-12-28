const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const flag = document.getElementById("flag");
const dropdown2 = document.querySelectorAll(".dropdown2 select");
const lag = document.getElementById("lag");
const btn = document.getElementById("btn");
const amt = document.getElementById("amt");
const msg = document.getElementById("msg");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

// Ensure `countryList` is defined with the correct mapping
for (let select of dropdowns) {
    for (let code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        select.append(newOption);
    }
    select.addEventListener("change", (event) => {
        updateFlag(event.target); // Pass the event target (select element) to updateFlag
    });
}

const updateFlag = (element) => {
    let code = element.value;
    console.log(code);
    let countryCode = countryList[code];
    if (countryCode) {
        flag.src = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    } else {
        console.error("Country code not found for", code);
    }
};

for (let select1 of dropdown2) {
    for (let code in countryList) {
        let newOption2 = document.createElement("option");
        newOption2.innerText = code;
        newOption2.value = code;
        select1.append(newOption2);
    }
    select1.addEventListener("change", (event) => {
        updateFlag1(event.target);
    });
}

const updateFlag1 = (element1) => {
    let code1 = element1.value;
    console.log(code1);
    let countryCode = countryList[code1];
    if (countryCode) {
        lag.src = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    } else {
        console.error("Country code not found for", code1);
    }
};

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
    
    // Updated URL structure
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]; 
    
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  };
  
  
  btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
  });
  
  window.addEventListener("load", () => {
    updateExchangeRate();
  });