gameData = {
  Droopy: {
    value: 10,
    speed: 1000,
    initallyLocked: false,
    image: "./images/Droopy.svg",
  },
  Jacky: {
    value: 20,
    cost: 50,
    speed: 1500,
    initallyLocked: true,
    image: "./images/Jacky.svg",
  },
  Prairie: {
    value: 50,
    cost: 90,
    speed: 2000,
    initallyLocked: true,
    image: "./images/Prairie.svg",
  },
};
let currentMoney = 0;
let selling = false;

//TODO Add Upgrade Buttons
generateSellButtons();
function generateSellButtons() {
  const Plants = document.querySelector(".Sell .Plants");
  for (const plant in gameData) {
    // Create List Item
    const listItem = document.createElement("li");
    listItem.classList.add(
      gameData[plant].initallyLocked ? "Locked" : "Unlocked"
    );
    listItem.innerHTML = "<span>" + plant + "</span>";
    Plants.appendChild(listItem);

    // Create Sell Button
    const listItemButton = document.createElement("button");
    listItemButton.textContent = "Sell";
    listItemButton.addEventListener("click", (e) => {
      sellPlant(e, gameData[plant]);
    });
    listItem.appendChild(listItemButton);

    // Create Unlock Button
    let unlockButton;
    if (gameData[plant]?.initallyLocked) {
      unlockButton = document.createElement("button");
      unlockButton.textContent = "Unlock for: $" + gameData[plant].cost;
      unlockButton.classList.add("Unlock");
      unlockButton.addEventListener("click", (e) => {
        if (currentMoney >= gameData[plant].cost) {
          currentMoney -= gameData[plant].cost;
          document.querySelector(".values .money .value").textContent =
            currentMoney;
          listItem.classList.remove("Locked");
          unlockButton.replaceWith(document.createElement("div"));
        }
      });
    } else {
      unlockButton = document.createElement("div");
    }
    listItem.appendChild(unlockButton);
  }
}

// function createUpgradeButtons(plantData) {
//   const wrapper = document.createElement("div");

//   const cost = document.createElement("button");
//   cost.textContent = `Upgrade Value: $${plantData.value * 3}`;
//   cost.addEventListener('click', ()=>{
//     if(currentMoney >= plantData.value * 3){
//         currentMoney -= plantData.value * 3;
//     }
//   })

//   const speed = document.createElement("button");
//   cost.textContent = `Upgrade Speed: $${plantData.value * 10}`;
// }

function sellPlant(e, plantData) {
  if (!selling) {
    selling = true;
    const model = document.querySelector(".runway .Model");
    const plant = model.querySelector(".Plant");
    const money = document.querySelector(".values .money .value");
    plant.src = plantData.image;
    model.style.animationDuration = `${plantData.speed}ms`;
    model.classList.add("Running");

    setTimeout(() => {
      plant.removeAttribute("src");
      currentMoney += plantData.value;
      money.textContent = currentMoney;
    }, plantData.speed);

    setTimeout(() => {
      model.classList.remove("Running");
      selling = false;
    }, plantData.speed * 2);
  }
}
