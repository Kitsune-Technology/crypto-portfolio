let piChart = document.getElementById("pie-chart");
let updateChart = document.getElementById("update-chart");
let allCrypto = document.querySelectorAll("input");
let allCoin = [];
let chartHoldingValue = [];
let geckoData = {};

function cryptoHold(name, allCrypto) {
  for (let i = 0; i < allCrypto.length; i++) {
    if (allCrypto[i].name === name) {
      holdAmount = allCrypto[i].value;
      return holdAmount;
    }
  }
}

function newCrypto(name, color, allCrypto) {
  let coinName = name.toLowerCase();
  let holdAmount = 0;
  cryptoHold(coinName, allCrypto);
  let key = name;
  allCoin[key] = {
    name: name,
    holding: holdAmount,
    price: 0,
    color: color,
  };
}

newCrypto("Bitcoin", "hsl(204deg 81.9% 26.7%)", allCrypto);
newCrypto("Ethereum", "hsl(204deg 81.9% 56.7%)", allCrypto);
newCrypto("Dogecoin", "hsl(204deg 81.9% 36.7%)", allCrypto);
newCrypto("Ripple", "hsl(204deg 81.9% 46.7%)", allCrypto);
newCrypto("Ethereum-Classic", "hsl(204deg 81.9% 66.7%)", allCrypto);
newCrypto("Cardano", "hsl(204deg 81.9% 76.7%", allCrypto);

function updateAll(all) {
  for (let i = 0; i < all.length; i++) {
    if (allCoin[all[i].name].name === all[i].name) {
      allCoin[all[i].name].holding = all[i].value;
    }
  }
  updateChartData();
  yourCoinUsd();
  totalAmountUsd();
}

function updateCoin(coin) {
  let dataUpdateCoin = "[data-update-coin='" + coin + "']";
  allCoin[coin].holding = document.querySelector(dataUpdateCoin).value;
  updateChartData();
  yourCoinUsd();
  totalAmountUsd();
}

function changeValue(objectName, newHolding) {
  return (objectName.value = newHolding);
}

function updateCrypto(coin) {
  if (coin === "all") {
    allCrypto = document.querySelectorAll("input");
    updateAll(allCrypto);
  }
  if (coin !== "all") {
    updateCoin(coin);
  }
}

let dataHolding = [
  allCoin.Bitcoin.holding,
  allCoin.Ethereum.holding,
  allCoin.Dogecoin.holding,
  allCoin.Ripple.holding,
  allCoin["Ethereum-Classic"].holding,
  allCoin.Cardano.holding,
];

let chartData = {
  labels: [
    allCoin.Bitcoin.name,
    allCoin.Ethereum.name,
    allCoin.Dogecoin.name,
    allCoin.Ripple.name,
    allCoin["Ethereum-Classic"].name,
    allCoin.Cardano.name,
  ],

  datasets: [
    {
      label: "Crypto Portfolio",
      data: dataHolding,
      backgroundColor: [
        allCoin.Bitcoin.color,
        allCoin.Ethereum.color,
        allCoin.Dogecoin.color,
        allCoin.Ripple.color,
        allCoin["Ethereum-Classic"].color,
        allCoin.Cardano.color,
      ],
      hoverOffSet: 4,
    },
  ],
};

let cryptoPieChart = new Chart(piChart, {
  type: "pie",
  data: chartData,
});

function updateChartData() {
  let newData = [
    allCoin.Bitcoin.holding,
    allCoin.Ethereum.holding,
    allCoin.Dogecoin.holding,
    allCoin.Ripple.holding,
    allCoin["Ethereum-Classic"].holding,
    allCoin.Cardano.holding,
  ];
  cryptoPieChart.data.datasets[0].data = newData;
  cryptoPieChart.update();
}

function yourCoinUsd() {
  for (let y in allCoin) {
    let yourUsdAmount = y.toLocaleLowerCase() + "-usd";
    //console.log(yourUsdAmount);
    let elPrice = document.getElementById(yourUsdAmount);
    //console.log(elPrice);
    elPrice.innerHTML = allCoin[y].holding * allCoin[y].price;
  }
}

function totalAmountUsd() {
  let totalUsd = document.getElementById("total-usd");
  let total = 0;
  for (let x in allCoin) {
    total = total + allCoin[x].price * allCoin[x].holding;
  }
  totalUsd.innerText = total;
}

function getPrice() {
  //console.log(Object.keys(allCoin));
  let geckoUrl =
    "https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=" +
    Object.keys(allCoin);
  //console.log(geckoUrl.toLocaleLowerCase().replace(" ", "-"));
  fetch(geckoUrl)
    .then((responce) => {
      return responce.json();
    })
    .then((data) => {
      for (let x in allCoin) {
        if (x.toLocaleLowerCase() in data) {
          allCoin[x].price = data[x.toLocaleLowerCase()].usd;
        }
      }

      let todaysPrice = document.getElementById("current-price");
      todaysPrice.innerHTML =
        '<span class="original-price">Bitcoin:</span> $' +
        allCoin.Bitcoin.price +
        ' <span class="original-price">Ethereum:</span> $' +
        allCoin.Ethereum.price +
        ' <span class="original-price">Dogecoin:</span> $' +
        allCoin.Dogecoin.price +
        ' <span class="original-price">Ripple (XRP):</span> $' +
        allCoin.Ripple.price +
        ' <span class="original-price">Ethereum Classic:</span> $' +
        allCoin["Ethereum-Classic"].price +
        ' <span class="original-price">Cardano:</span> $' +
        allCoin.Cardano.price;

      yourCoinUsd();
    });
}
getPrice();
yourCoinUsd();
totalAmountUsd();
