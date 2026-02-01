package in.rao.retailBillingSoftware.Services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Pageable;

import in.rao.retailBillingSoftware.io.OrderRequest;
import in.rao.retailBillingSoftware.io.OrderResponse;
import in.rao.retailBillingSoftware.io.PaymentVerificationRequest;

public interface OrderService {
	OrderResponse createOrder(OrderRequest request);
	
	void deleteOrder(String orderId);
	
	List<OrderResponse> getLatestOrders();
	
	OrderResponse verifyPayment(PaymentVerificationRequest request);
	
	//Dashboard
	Double sumSalesByDate(LocalDate date);
	Long countByOrderDate(LocalDate date);
	List<OrderResponse> findRecentOrders();

}
