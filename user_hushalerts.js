//defining and declaring variables
let countInventory = 50; //inventory count initialized at 50 pads 
localStorage.setItem('countInventory', countInventory); //inventory count stored in local storage
let maxInventory = 50; //set and stored maximum inventory limit
localStorage.setItem('maxInventory', maxInventory);
const limitInventory = 10; //set and stored minimum inventory limit threshold; replenishment request is triggered here
localStorage.setItem('limitInventory', limitInventory);

//HTML Elements
const elementCountInventory = document.getElementById('countInventory'); 
const replenish = document.getElementById('replenish'); //replenish button
const dispense = document.getElementById('dispense'); //dispense button

//function based on what the inventory count is 
function inventoryUpdate(){
    elementCountInventory.textContent = `Inventory Count: ${countInventory}`;
    //updated text content based on count inventory levels 

    if (countInventory <= limitInventory) {
        replenish.style.display = 'block';
        dispense.style.display = 'none';
    //if inventory level is less than or equal to the minimum, then user can request to replenish.
      } else {
        replenish.style.display = 'none';
        dispense.style.display = 'block';
    //if count inventory is greater than the minimum, then user can dispense the prodct. 
      }
}

replenish.addEventListener('click', () => {
    localStorage.setItem('requestReplenish', true);
    alert("Request to replenish inventory has been sent!")
  });
  //when user clicks the replenish button, its key is assigned to being true on local storage
  //an alert shows on user's screen to confirm their request


  dispense.addEventListener('click', () => {
    countInventory--;
    localStorage.setItem('countInventory', countInventory);
    inventoryUpdate();
  });
  //when user clicks to dispense, the inventory count decreases by one each time
  //this is updated in local storage and on the screen for the user to see 


  setInterval(() => {
    countInventory = localStorage.getItem('countInventory');
    inventoryUpdate();
  }, 1000);
  //function avoids manual refreshes especially when staff replenishes the inventory amount
  //updates inventory count from local storage to update the display every second 
  