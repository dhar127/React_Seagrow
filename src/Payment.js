import React, { useState } from "react";
import "./Payment.css";

function Payment() {
    const [paymentStep, setPaymentStep] = useState("amount"); // Step: 'amount' or 'payment'
    const [alertMessage, setAlertMessage] = useState(""); // State to hold the alert message
    const [paymentSuccessMessage, setPaymentSuccessMessage] = useState(""); // State to hold the success message
    const [cardNumber, setCardNumber] = useState(""); // For card input formatting

    const handleCardNumberChange = (e) => {
        let cNumber = e.target.value.replace(/\s/g, ""); // Remove spaces
        if (Number(cNumber)) {
            cNumber = cNumber.match(/.{1,4}/g)?.join(" ") || ""; // Format in groups of 4
        }
        setCardNumber(cNumber); // Update the state
    };

    const handleProceedToPayment = () => {
        setPaymentStep("payment"); // Move to the payment form
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        setAlertMessage("Processing your payment...");
        setTimeout(() => {
            setAlertMessage(""); // Remove processing message
            setPaymentSuccessMessage("Payment Successful! Thank you for booking."); // Display success message
        }, 3000); // Simulate payment processing for 3 seconds
    };

    return (
        <div className="container">
            {/* Display the alert message at the top */}
            {alertMessage && <div className="alert">{alertMessage}</div>}

            {/* Enter Amount Step */}
            {paymentStep === "amount" && (
                <div>
                    <h3 className="title">Billing Information</h3>
                    <p className="billing-info">The total amount is ₹340</p>
                    <button className="proceed_btn" onClick={handleProceedToPayment}>
                        Proceed to Payment
                    </button>
                </div>
            )}

            {/* Card Payment Step */}
            {paymentStep === "payment" && (
                <form onSubmit={handlePaymentSubmit}>
                    <h3 className="title">Card Payment</h3>

                    <div className="inputBox">
                        <label htmlFor="cardName">Name on Card:</label>
                        <input
                            type="text"
                            id="cardName"
                            placeholder="Enter card name"
                            required
                        />
                    </div>

                    <div className="inputBox">
                        <label htmlFor="cardNum">Credit Card Number:</label>
                        <input
                            type="text"
                            id="cardNum"
                            placeholder="1111 2222 3333 4444"
                            maxLength="19"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            required
                        />
                    </div>

                    <div className="flex">
                        <div className="inputBox">
                            <label htmlFor="expMonth">Exp Month:</label>
                            <select id="expMonth" required>
                                <option value="">Choose month</option>
                                {[
                                    "January",
                                    "February",
                                    "March",
                                    "April",
                                    "May",
                                    "June",
                                    "July",
                                    "August",
                                    "September",
                                    "October",
                                    "November",
                                    "December",
                                ].map((month) => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="inputBox">
                            <label htmlFor="expYear">Exp Year:</label>
                            <select id="expYear" required>
                                <option value="">Choose year</option>
                                {[2023, 2024, 2025, 2026, 2027].map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="inputBox">
                        <label htmlFor="cvv">CVV:</label>
                        <input
                            type="number"
                            id="cvv"
                            placeholder="123"
                            required
                        />
                    </div>

                    <input
                        type="submit"
                        value="Submit Payment"
                        className="submit_btn"
                    />
                </form>
            )}

            {/* Success Message */}
            {paymentSuccessMessage && (
                <div className="successMessage">{paymentSuccessMessage}</div>
            )}
        </div>
    );
}

export default Payment;

