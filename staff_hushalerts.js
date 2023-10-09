//declaring variables
let countInventoryCurrent; //holding current inventory count
let amtReplenish; //holding amount to replenish

//HTML Elements 
const alertElement = document.getElementById('alert'); //displaying the alert
const msgAlertElement = document.getElementById('msgAlert'); //displaying the alert message
const confirm = document.getElementById('confirm'); //displaying the confirm button
const lastReplenishedElement = document.getElementById('lastReplenished'); //displaying the last time of replenishment

const audio = new Audio('simple-notification-152054.mp3'); //playing notification sound

//check if the replenishment request is true - does it exist? 
function checkRequestReplenish(){
  const requestReplenish = localStorage.getItem('requestReplenish');
  return requestReplenish;
}


//runs every second without manual refreshes to display values from local storage
setInterval(() => {

  const requestReplenish = checkRequestReplenish();
  //the above function is called to check if the replenishment request is true - does it exist? 

  if (requestReplenish == 'True' || requestReplenish == 'true'){
    countInventoryCurrent = localStorage.getItem('countInventory'); 
    let maxInventory = Number(localStorage.getItem('maxInventory'));
    amtReplenish = maxInventory - countInventoryCurrent;
  //if request is true, then it calculates how many pads must be replenished by subtracting the current amount by the maximum amount


    msgAlertElement.textContent = `The current inventory count for pads is ${countInventoryCurrent}. 
    Must replenish with ${amtReplenish} pads.`
    //this amount to be replenished is displayed on the screen within the alert element message 

    alertElement.style.display = 'block'; 
    audio.play(); 
    //notification sound plays when there is a request alert 
    } else {
    alertElement.style.display = 'none';
    /*if there is no request alert, the alert element, which includes the alert element message and the confirm button, 
    will not be seen*/
    }
    let times = JSON.parse(localStorage.getItem('timesReplenish')) || [];
  
    lastReplenishedElement.innerHTML = 
    times.map(time => `<p>Your last replenishment was at: ${time}</p>`).join('');


}, 1000); 

//when the confirm button is clicked...
confirm.addEventListener('click', () => {
  const countInventoryCurrent = parseInt(localStorage.getItem('countInventory')) || 0;
  //takes the integer value of the current inventory count from local storage or it takes 0
  let maxInventory = Number(localStorage.getItem('maxInventory')); 
  //takes the number value of the max inventory count from local storage
  let amtReplenish = maxInventory - countInventoryCurrent; 
  //how many pads must be replenished by subtracting the current amount by the maximum amount
  localStorage.setItem('countInventory', maxInventory); 
  //updates count inventory with the maximum inventory amount, meaning that it has been replenished
  localStorage.removeItem('requestReplenish');
  //removes current request to replenish as it has now been accomodated - removed so it will not interfere in future requests 
  alertElement.style.display = 'none';
  //hides the alert element like before to signify that there are no alerts for staff anymore 
  const lastTimeReplenished = new Date().toLocaleString();
  //using the current date and time as a string 
  let times = JSON.parse(localStorage.getItem('timesReplenish')) || [];
  //retrieving an array to store replenishment times from local storage - or it defaults to an empty array if there are no such values
  times.push(lastTimeReplenished);
  //adds latest replenishment time to array 
  localStorage.setItem('timesReplenish', JSON.stringify(times));
  //updates the above array in local storage now that new replenishment time is added 
  alert("Success! You have replenished the inventory."); 
  //alert staff of them successfully replenishing the inventory
});

  