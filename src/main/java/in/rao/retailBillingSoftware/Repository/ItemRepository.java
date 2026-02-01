package in.rao.retailBillingSoftware.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import in.rao.retailBillingSoftware.entity.ItemEntity;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {
	
	Optional<ItemEntity> findByItemId(String id);
	
	Integer countByCategoryId(Long id);

}
