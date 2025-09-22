# LanMan Exercise - Francesco Lanza

A JavaScript script that calculates the total price and tax for items in a shopping cart.

## Running

If you have **node.js** [installed](https://nodejs.org/en/download) on your system:

```bash
node main.js
```

Or, alternatively, you can open the `index.html` file in the browser in the browser, either by running it locally or going to the GitHub Page.

## Explaining the code

### Representing the goods

Every item is represented through the class `Good`, whose constructor has the following parameters:

- **quantity**: the quantity of  the product, 1 by default;
- **name**: the name of the product. Goes though the function `trim()` to remove any unnecessary whitespace;
- **price**: the price of the product before taxes;
- **imported**: if the good is imported, false by default;
- **exempt**: if the good is either a book, food, or a medical product.

### Calculating the price of a Product

The taxes for each product are calculated with the function `getTax()`, that checks the values `exempt` and `imported` of the `Good` object:

- if **exempt** is true, add 10% of the original price to  `tax`, which is initialized at 0.
- if **imported** is true, add 5% of the original price to `tax`

The total tax price is then rounded with the function `roundTax(amount)`, which is just a wrapper for the following function:

```js
Math.ceil(amount * 20) / 20;
```

`Math.ceil(x)` always rounds up and returns the smallest integer greater than or equal to a given number.

The **total price** of the single product is then obtained by adding the previously calculated tax price to the initial price of the good.

### Printing the receipt

The total receipt is shown in the console with the class `Receipt`, whose **constructor** takes in an array of `Good` objects called `cart`.

To print the prices, the class `Receipt` has the function `printReceipt`, that iterates on each product in the cart and calculates each of the products' prices and taxes, which are immediately shown with a `console.log()`:

```js
console.log(
    `${item.quantity} ${item.imported ? "imported " : ""}${item.name}: ${itemTotal.toFixed(2)}`
);
```

> **_NOTE:_**  The `toFixed()` method of _Number_ values returns a string representing this number using fixed-point notation with the specified number of decimal places.

After each item in the cart has been iterated, the function prints the last two values need for the receipt:

- **total**: the total price of the cart, taxes included.
- **salesTaxes**: the total price of the taxes.

### Error handling

To minimize and prevent errors, each parameter in the constructor is being checked by value and type, e.g.:

```js
if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error(`Invalid quantity "${quantity}" for item "${name}". Must be a positive integer.`);
}
```

or

```js
class Receipt {
    constructor(cart) {
        if (!Array.isArray(cart) || cart.length === 0) {
            throw new Error("Cart must be a non-empty array of Good objects.");
        }
        if (!cart.every(item => item instanceof Good)) {
            throw new Error("All items in cart must be instances of Good.");
        }
        this.cart = cart;
    }
```

**Example**: try to paste this in the browser console with the webpage open:

```js
const badCart = new Receipt([ new Good(0, "", -5) ]);
```

It will throw this error:

```
Invalid quantity "0" for item "". Must be a positive integer.
```

>  **_NOTE_**: These error are being caught in the main blocks of the script, but not if the user decides to execute extra code in the console.
