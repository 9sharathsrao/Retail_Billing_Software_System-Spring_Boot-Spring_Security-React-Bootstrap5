package in.rao.retailBillingSoftware.Services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import in.rao.retailBillingSoftware.io.CategoryRequest;
import in.rao.retailBillingSoftware.io.CategoryResponse;

public interface CategoryService {
	//add method accepts addCate
	//returns CateResp
	CategoryResponse add(CategoryRequest request, MultipartFile file);
	
	List<CategoryResponse> read();
	
	void delete(String categoryId);

	
}
 