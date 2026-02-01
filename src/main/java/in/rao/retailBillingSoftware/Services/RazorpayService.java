package in.rao.retailBillingSoftware.Services;

import com.razorpay.RazorpayException;

import in.rao.retailBillingSoftware.io.RazorpayOrderResponse;

public interface RazorpayService {
	RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}
