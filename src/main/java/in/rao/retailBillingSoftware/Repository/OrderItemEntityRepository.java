package in.rao.retailBillingSoftware.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.rao.retailBillingSoftware.entity.OrderItemEntity;

public interface OrderItemEntityRepository extends JpaRepository<OrderItemEntity, Long> {
}
