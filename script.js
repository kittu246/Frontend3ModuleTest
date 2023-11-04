
let IP;

window.addEventListener('load',
$.getJSON("https://api.ipify.org?format=json", function(data) {
         
        // Setting text of element P with id gfg
        $("#gfg").html(data.ip);
        
        IP= data.ip;
        console.log(IP);
    })
    )


   

getUserInfo.addEventListener('click',() =>{
    const url = `./navigation.html?ip=${IP}`;
    let otherPage = document.createElement('a');
    otherPage.href =url;
    otherPage.click();

});


// async function fetchdata ()  {

//     console.log("hey u done it");

// //let response = await fetch(`https://ipapi.co/${IP}/json/`);
// let response = await fetch(`./dummy.json`);

//    let data =  await response.json();
//    console.log(data);

//    getUserTimedate(data.timezone);
//    getDataFromPin(data.postal);

// } 

// getUserInfo.addEventListener('click',fetchdata);

// function getUserTimedate (timezone){

//     let current_datetime_str = new Date().toLocaleString("en-US", { timeZone: timezone });
//     console.log(current_datetime_str);

// }



// async function getDataFromPin (pincode) {

//     let response  = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
//     let data = await response.json();
//     console.log(data);
// }







  

