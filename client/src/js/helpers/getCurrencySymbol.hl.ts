const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case 'EUR':
      return '€';
    case 'UAH':
      return 'UAH';
    case 'USD':
      return '$';
    default:
      return '$';
  }
};

export {
  getCurrencySymbol
};
