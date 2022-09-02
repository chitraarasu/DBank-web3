import {dbank} from '../../declarations/dbank';

window.addEventListener('load', async () => {
  updateUI();
})

document.querySelector("form").addEventListener('submit', async (event) => {
  event.preventDefault();

  document.getElementById("submit-btn").setAttribute("disabled", true);

  const inputAmount = parseFloat(document.getElementById("input-amount").value); 
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value); 

  if(document.getElementById("input-amount").value.length != 0){
    await dbank.topUp(inputAmount);
  }

  if(document.getElementById("withdrawal-amount").value.length != 0){
    await dbank.withDraw(outputAmount);
  }

  await dbank.compound();

  document.getElementById("submit-btn").removeAttribute("disabled");
  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  updateUI();
});

async function updateUI()  {
  var currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerHTML = Math.round(currentAmount).toFixed(2);
}