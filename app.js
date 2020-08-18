/* Global Variables */
const zipCode      = document.getElementById('zip');

let baseUrl  = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKeyUrl = '&units=metric&appid=';
const apiKey = '64d6defb4e08b7553a5309c41efe0c43';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click',doAction);

function doAction(e) {
  const userFeelings = document.getElementById('feelings').value;

  getData(baseUrl, apiKeyUrl, zipCode.value, apiKey)
  .then(function(data){
    console.log(data)
    postData('/addZipCode',{Tempreture:data.main.temp, feelings: userFeelings});
    updateUI();
  })
};


const getData = async(baseUrl, apiKeyUrl, zipCode, key) =>{
const response = await fetch(baseUrl + zipCode + apiKeyUrl + key)
  try{
    const data = await response.json();
    console.log("API data" + data);
    return data
  }catch(error) {
    console.log("error",error);
  }
};


const postData = async(url='',data={}) => {

  const response = await fetch(url,{
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(data),
  });

  try{
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch(error){
    console.log("error",error);
  }
};


const updateUI = async()=>{
  const req = await fetch('/all')
  try{
    const allData = await req.json()
    console.log(allData);
    document.getElementById('date').innerHTML    ="Date: "+ newDate;
    document.getElementById('temp').innerHTML    = "Temp: "+ allData.temp + " C";
    document.getElementById('content').innerHTML = allData.feelings;
  }catch(error){
    console.log("error",error);
  }
};
