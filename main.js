//Author: Francesco Lanza

class Good {
    constructor(quantity = 1, name, price, imported = false, exempt = false) {

        // check if the constructor parameters are valid
        if (!Number.isInteger(quantity) || quantity <= 0) {
            throw new Error(`Invalid quantity "${quantity}" for item "${name}". Must be a positive integer.`);
        }
        if (typeof name !== "string" || name.trim().length === 0) {
            throw new Error(`Invalid name "${name}". Must be a non-empty string.`);
        }
        if (typeof price !== "number" || price < 0) {
            throw new Error(`Invalid price "${price}" for item "${name}". Must be a non-negative number.`);
        }
        if (typeof imported !== "boolean" || typeof exempt !== "boolean") {
            throw new Error(`Flags "imported" and "exempt" must be boolean values.`);
        }

        this.quantity = quantity;
        this.name = name.trim();
        this.price = price;
        this.imported = imported;
        this.exempt = exempt;
    }

    // round tax
    static roundTax(amount) {
        // check if the tax amount is a valid number
        if (typeof amount !== "number" || isNaN(amount)) {
            throw new Error(`Invalid tax amount: ${amount}`);
        }
        return Math.ceil(amount * 20) / 20;
    }

    getTax() {
        let tax = 0;

        if (!this.exempt) {
            tax += this.price * 0.1;
        }

        if (this.imported) {
            tax += this.price * 0.05;
        }

        return Good.roundTax(tax);
    }

    getTotalPrice() {
        return this.price + this.getTax();
    }
}

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

    printReceipt() {
        let total = 0;          // total price, taxes included
        let salesTaxes = 0;     // total tax price

        this.cart.forEach(item => {
            try {
                const itemTax = item.getTax() * item.quantity;
                const itemTotal = item.getTotalPrice() * item.quantity;

                salesTaxes += itemTax;
                total += itemTotal;

                console.log(
                    `${item.quantity} ${item.imported ? "imported " : ""}${item.name}: ${itemTotal.toFixed(2)}`
                );
            } catch (err) {
                console.error(`Error processing item "${item.name}": ${err.message}`);
            }
        });

        console.log(`Sales Taxes: ${salesTaxes.toFixed(2)}`);
        console.log(`Total: ${total.toFixed(2)}`);
    }
}

// test cases, provided in the test outline (pdf file)

try {
    const cart1 = new Receipt([
        new Good(2, "book", 12.49, false, true),
        new Good(1, "music CD", 14.99, false, false),
        new Good(1, "chocolate bar", 0.85, false, true)
    ]);

    const cart2 = new Receipt([
        new Good(1, "box of chocolates", 10.00, true, true),
        new Good(1, "bottle of perfume", 47.50, true, false)
    ]);

    const cart3 = new Receipt([
        new Good(1, "bottle of perfume", 27.99, true, false),
        new Good(1, "bottle of perfume", 18.99, false, false),
        new Good(1, "packet of headache pills", 9.75, false, true),
        new Good(3, "box of chocolates", 11.25, true, true)
    ]);

    // print the receipts
    console.log("Output 1:");
    cart1.printReceipt();
    console.log("\nOutput 2:");
    cart2.printReceipt();
    console.log("\nOutput 3:");
    cart3.printReceipt();

} catch (err) {
    console.error("Fatal error:", err.message);
}
