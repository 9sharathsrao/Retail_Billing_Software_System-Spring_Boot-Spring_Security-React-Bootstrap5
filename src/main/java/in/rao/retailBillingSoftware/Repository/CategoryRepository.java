package in.rao.retailBillingSoftware.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import in.rao.retailBillingSoftware.entity.CategoryEnitity;

public interface CategoryRepository extends JpaRepository<CategoryEnitity, Long> {
	 Optional<CategoryEnitity> findByCategoryId(String categoryId);
}
