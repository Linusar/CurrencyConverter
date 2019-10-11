document.addEventListener("DOMContentLoaded", async () => {
  const cuntry = "ARS";
  const url = `https://api.mercadolibre.com/currency_conversions/search?from=USD&to=${cuntry}`;

  console.log(url);

  let selected = document.getElementById("currency_cuntry");

  let button = document.getElementById("changelinks");

  button.addEventListener("click", async () => {
    const response = await fetch(url);
    let { ratio } = await response.json();
    console.log(ratio);

    document.getElementById(
      "currency_price"
    ).innerHTML = `Cotizaci&oacute;n U$S1 = $${ratio} ${cuntry}`;

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { ratio: ratio }, response => {
        console.log("success");
      });
    });
  });

  button.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { ratio: ratio }, response => {
        console.log("success");
      });
    });
  });
});
