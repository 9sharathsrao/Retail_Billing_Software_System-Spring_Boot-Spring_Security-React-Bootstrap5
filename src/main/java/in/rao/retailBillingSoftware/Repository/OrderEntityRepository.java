package in.rao.retailBillingSoftware.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import in.rao.retailBillingSoftware.entity.OrderEntity;

public interface OrderEntityRepository extends JpaRepository<OrderEntity, Long>{
	
	Optional<OrderEntity> findByOrderId(String id);
	List<OrderEntity> findAllByOrderByCreatedAtDesc();
	
	//Query annotations to create the methods of dashboard
	@Query("SELECT SUM(o.grandTotal) FROM OrderEntity o WHERE DATE(o.createdAt) = :date")
	Double sumSalesByDate(@Param("date") LocalDate date);
	
	@Query("SELECT COUNT(o) FROM OrderEntity o WHERE DATE(o.createdAt) = :date")
	Long countByOrderDate(@Param("date") LocalDate date);
	
	@Query("SELECT o FROM OrderEntity o ORDER BY o.createdAt DESC")
	List<OrderEntity> findRecentOrder(Pageable pageable);
}
