import "./ReceiptPopup.css";
import "./Print.css";

const ReceiptPopup = ({ orderDetails, onClose, onPrint }) => {
  return (
    <div className="receipt-popup-overlay text-dark">
      <div className="receipt-popup">
        <div className="text-center">
          <i className="bi bi-check-circle-fill text-success fs-2"></i>
          <h3 className="mb-4">Order Receipt</h3>
        </div>

        <p>
          <strong>Order ID:</strong> {orderDetails.orderId}
        </p>
        <p>
          <strong>Name:</strong> {orderDetails.customerName}
        </p>
        <p>
          <strong>Phone:</strong> {orderDetails.phoneNumber}
        </p>

        <hr className="my-3" />
        <h5 className="mb-3">Items Ordered</h5>

        <div className="cart-items-scrollable">
          {orderDetails.items.map((item, index) => (
            <div key={index} className="d-flex justify-content-between mb-1">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <hr className="my-3" />

        <div className="d-flex justify-content-between mb-2">
          <span>
            <strong>Subtotal:</strong>
          </span>
          <span>₹{orderDetails.subtotal.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>
            <strong>Tax (1%):</strong>
          </span>
          <span>₹{orderDetails.tax.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>
            <strong>Grand Total:</strong>
          </span>
          <span>₹{orderDetails.grandTotal.toFixed(2)}</span>
        </div>

        <p className="mt-3">
          <strong>Payment Method: </strong>
          {orderDetails.paymentMethod}
        </p>

        {orderDetails.paymentMethod === "UPI" && (
          <div className="small text-muted">
            <p className="mb-1">
              <strong>Razorpay Order Id: </strong>
              {orderDetails.razorpayOrderId}
            </p>
            <p>
              <strong>Razorpay Payment Id: </strong>
              {orderDetails.razorpayPaymentId}
            </p>
          </div>
        )}

        {/* These buttons will be hidden by the @media print CSS */}
        <div className="d-flex justify-content-end gap-3 mt-4 print-hide">
          <button className="btn btn-warning" onClick={onPrint}>
            Print Receipt
          </button>
          <button className="btn btn-danger" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReceiptPopup;
