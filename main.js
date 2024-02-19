const allSeats = document.getElementById("seat-parent").children;
const totalSeatCount = document.getElementById("total-seat-count");

let seatCountInt = parseInt(totalSeatCount.innerText);
let selectedSeatCount = 0;

const totalPrice = document.getElementById("total-price");
const grandTotal = document.getElementById("grand-total");
let calculatedTotalPrice = 0;

const discountInput = document.getElementById("discount-input");
const discountButton = document.getElementById("discount-btn");

const tableSeatCount = document.getElementById("seat-count");
const phoneInput = document.getElementById("phone-input");

for (let i = 0; i < allSeats.length; i++) {
  addClickEvent(allSeats[i]);
}

function addClickEvent(element) {
  element.addEventListener("click", function () {
    selectedSeatCount += 1;
    if (selectedSeatCount > 4) {
      alert("you can not choose more than 4 seats.");
      return;
    }

    // update seat count on the table
    tableSeatCount.innerText = selectedSeatCount;

    // update total price
    calculatedTotalPrice += 550;
    totalPrice.innerText = calculatedTotalPrice;
    grandTotal.innerText = calculatedTotalPrice;

    // decrease total seat count
    seatCountInt -= 1;
    totalSeatCount.innerText = seatCountInt;

    element.classList.remove("bg-gray-200");
    // if element has id only then it will change the color
    const hasId = element.getAttribute("id");
    if (hasId) {
      element.classList.add("bg-primary", "text-white");
    }

    updateTable(element);
  });
}

function updateTable(element) {
  const tableBOdy = document.getElementById("table-body");
  const tableRow = document.createElement("tr");

  const fistTd = document.createElement("td");
  fistTd.innerText = element.innerText;

  const secondTd = document.createElement("td");
  secondTd.innerText = "Economoy";

  const thirdTd = document.createElement("td");
  thirdTd.innerText = "550tk";

  // if element has id only then it will add that element to the table
  const hasId = element.getAttribute("id");
  if (hasId) {
    tableRow.append(fistTd, secondTd, thirdTd);
    tableBOdy.appendChild(tableRow);
  }
}

discountButton.addEventListener("click", function () {
  if (
    discountInput.value.toLowerCase() === "new15" &&
    parseInt(grandTotal.innerText) !== 0
  ) {
    const discount = (15 / 100) * parseInt(grandTotal.innerText);
    grandTotal.innerText = parseInt(grandTotal.innerText) - discount;
  } else if (
    discountInput.value.toLowerCase() === "couple 20" &&
    parseInt(grandTotal.innerText) !== 0
  ) {
    const discount = (20 / 100) * parseInt(grandTotal.innerText);
    grandTotal.innerText = parseInt(grandTotal.innerText) - discount;
  } else {
    return;
  }

  document.getElementById("discount-div").style.display = "none";
});

phoneInput.addEventListener("keyup", function (e) {
  if (e.target.value.length > 0 && selectedSeatCount > 0) {
    const btn = document.getElementById("next-btn");
    btn.removeAttribute("disabled");
  }
});