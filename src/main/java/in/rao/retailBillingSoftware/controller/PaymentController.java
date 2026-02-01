package in.rao.retailBillingSoftware.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.RazorpayException;

import in.rao.retailBillingSoftware.Services.OrderService;
import in.rao.retailBillingSoftware.Services.RazorpayService;
import in.rao.retailBillingSoftware.io.OrderResponse;
import in.rao.retailBillingSoftware.io.PaymentRequest;
import in.rao.retailBillingSoftware.io.PaymentVerificationRequest;
import in.rao.retailBillingSoftware.io.RazorpayOrderResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {
	
	//inject Razorpay service
	private final RazorpayService razorpayService;
	private final OrderService orderService;
	
	@PostMapping("/create-order")
	@ResponseStatus(HttpStatus.CREATED)
	public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException{
		return razorpayService.createOrder(request.getAmount(), request.getCurrency());
	}
	
	@PostMapping("/verify")
	public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request) {
		return orderService.verifyPayment(request);
	}
	
}
