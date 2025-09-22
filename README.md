# LanMan Exercise - Francesco Lanza

A Javascript script that calculates the total price and tax for items in a shopping cart.

## Executing

```bash
node main.js
```

Or, alternatively, you can run the `index.html` file in the browser in the browser, either by running it locally or going to the GitHub Page.

## Explaining the script

Every item is represented through the class `Good`, whose constructor has the following parameters:

- **quantity**: the quantity of  the product, 1 by default;
- **name**: the name of the product;
- **price**: the price of the product before taxes;
- **imported**: if the good is imported, false by default;
- **exempt**: if the good is either a book, food, or a medical product.
