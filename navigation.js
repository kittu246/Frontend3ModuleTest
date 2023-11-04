let urlParam = new URLSearchParams(window.location.search);
let ipAddress = urlParam.get("ip");   
console.log(ipAddress);

ipSection.innerText =ipAddress;


let timeDiv = document.getElementById("DateTieInfo");
let cardSectionDiv = document.getElementById("cardSection");
let arr ;
async function fetchdata() {
  // console.log("hey u done it");

  try {
    let response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
    // let response = await fetch(`./dummy.json`);

    let data = await response.json();
    console.log(data);

    getUserTimedate(data.timezone);
    getDataFromPin(data.postal);

  let navBarDiv = document.getElementById("navbar");

  let userInfoSection = navBarDiv.children[1];
  console.log(userInfoSection);
    userInfoSection.innerHTML=`
    
    <div>
            <pre>Lat :  ${data.latitude}       </pre>
            <pre>City :  ${data.city}     </pre>
            <pre>Organisation :  ${data.org}</pre>
        </div>

        <div >
            <pre>Long :  ${data.longitude}     </pre>
            <pre>Region :  ${data.region}  </pre>
            <pre>Hostname :  ${data.network}
            </pre>
        </div>`;

        navBarDiv.appendChild(userInfoSection); 

        // displaying map


        getUserLocation ();
        

        let mapDiv = document.getElementById("map");
        mapDiv.innerHTML=`
        <iframe src="https://maps.google.com/maps?q=${data.latitude}, ${data.longitude}&z=15&output=embed"  ></iframe>`


  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("load", fetchdata);

//get currentLAtLONG

function getUserLocation (){



    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition
        );
        
    }
    else {

        console.log("geolocation not supported");
    }

 

   
}

function showPosition (position){

   if(position){

    // let mapDiv = document.getElementById("map");
    // mapDiv.innerHTML=`
    // <iframe src="https://maps.google.com/maps?q=${position.coords.latitude}, ${position.coords.longitude}&z=15&output=embed"  ></iframe>`
    console.log("success");

   }
   else{
    console.log("not shown");
   }

   

}

getUserLocation();


function getUserTimedate(timezone) {
  let current_datetime_str = new Date().toLocaleString("en-US", {
    timeZone: timezone,
  });
  console.log(current_datetime_str);

  


timeDiv.children[0].innerText=`Time Zone : ${timezone}`
  
  timeDiv.children[1].innerText=`Date and Time : ${current_datetime_str}`


}

async function getDataFromPin(pincode) {
  try {
    let response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`
    );
    let data = await response.json();
    console.log(data[0].PostOffice
        );

    arr = data[0].PostOffice;

    timeDiv.children[2].innerText =`Pincode : ${pincode}`
    timeDiv.children[3].innerText =`Message : Number of pincode(s) found : ${arr.length}`

    displayCards(arr);

    

  } catch (err) {
    console.log(err);
  }
}


function displayCards (data) {

    cardSectionDiv.innerHTML= "";



    for(let ele of data){


        let cardSection = document.createElement("div");
    cardSection.className="card";
    cardSection.innerHTML=`
    <p>Name : ${ele.Name}</p>
            <p>Branch Type : ${ele.BranchType}</p>
            <p>Delivery Status : ${
                ele.DeliveryStatus
            }</p>
            <p>Distict : ${ele.District}</p>
            <p>Division : ${
                ele.Division
            }</p>
    `
    cardSectionDiv.appendChild(cardSection);

    }

}

// search functionality

let inputSection = document.getElementById('inputCard')
console.log(inputSection);

inputSection.addEventListener('keyup', handleInput);

let filteredData;
function handleInput(event){
    
    if(event.keyCode === 13){
        console.log(event.target.value);

        let userInput = event.target.value.toUpperCase();
        console.log(userInput);

         filteredData =  arr.filter((ele) =>{
             return ele.Name.toUpperCase().includes(userInput) || ele.BranchType.toUpperCase().includes(userInput)
        })

        displayCards(filteredData);
    }

    
}
