const form = document.querySelector('#profit-form');

const fields = {
  productCost: document.querySelector('#product-cost'),
  domesticShipping: document.querySelector('#domestic-shipping'),
  internationalShipping: document.querySelector('#international-shipping'),
  commissionRate: document.querySelector('#commission-rate'),
  adCost: document.querySelector('#ad-cost'),
  salePrice: document.querySelector('#sale-price'),
};

const outputs = {
  grossProfit: document.querySelector('#gross-profit'),
  netProfit: document.querySelector('#net-profit'),
  profitMargin: document.querySelector('#profit-margin'),
};

const currencyFormatter = new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY',
  minimumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat('zh-CN', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function readNumber(input) {
  const value = Number.parseFloat(input.value);
  return Number.isFinite(value) ? value : 0;
}

function calculateProfit() {
  const productCost = readNumber(fields.productCost);
  const domesticShipping = readNumber(fields.domesticShipping);
  const internationalShipping = readNumber(fields.internationalShipping);
  const commissionRate = readNumber(fields.commissionRate) / 100;
  const adCost = readNumber(fields.adCost);
  const salePrice = readNumber(fields.salePrice);

  const commissionFee = salePrice * commissionRate;
  const grossProfit = salePrice - productCost - domesticShipping - internationalShipping;
  const netProfit = grossProfit - commissionFee - adCost;
  const profitMargin = salePrice > 0 ? netProfit / salePrice : 0;

  outputs.grossProfit.textContent = currencyFormatter.format(grossProfit);
  outputs.netProfit.textContent = currencyFormatter.format(netProfit);
  outputs.profitMargin.textContent = percentFormatter.format(profitMargin);
}

form.addEventListener('input', calculateProfit);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  calculateProfit();
});
form.addEventListener('reset', () => {
  requestAnimationFrame(calculateProfit);
});

calculateProfit();
