package in.rao.retailBillingSoftware.Services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import in.rao.retailBillingSoftware.io.ItemRequest;
import in.rao.retailBillingSoftware.io.ItemResponse;

public interface ItemService {
	
	ItemResponse add(ItemRequest request, MultipartFile file);
	
	List<ItemResponse> fetchItems();
	
	void deleteItem(String itemId);

}
