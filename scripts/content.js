const dolar = 58.5;
const peso = (1 / dolar).toFixed(5);

const parsePrice = price => {
  return price.split(".").join("");
};

const convertToDolar = (price, quote) => {
  const newPrice = parsePrice(price);
  const result = parseFloat(newPrice) / parseFloat(quote);
  return Math.round(result * 100) / 100;
};

const addDolar = (father, price) => {
  var node = document.createElement("span");
  node.setAttribute("id", "currency_span");
  var textnode = document.createTextNode(price);
  node.appendChild(textnode);
  father.appendChild(node);
};

const changePrice = (tag, price) => {
  let itemList = document.querySelectorAll(tag);
  [].forEach.call(itemList, header => {
    let item = header.querySelectorAll("span");
    if (item[0].innerHTML === "$") {
      item[0].innerHTML = "U$S";
      item[1].innerHTML = convertToDolar(item[1].innerHTML, price);
    }
  });
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const ratio = request.ratio;
  changePrice(".item__price", ratio);
  changePrice(".price-tag", ratio);
  sendResponse({ success: true });
});
