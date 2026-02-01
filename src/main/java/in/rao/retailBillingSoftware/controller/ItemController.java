package in.rao.retailBillingSoftware.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import in.rao.retailBillingSoftware.Services.ItemService;
import in.rao.retailBillingSoftware.io.ItemRequest;
import in.rao.retailBillingSoftware.io.ItemResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ItemController {
	
	//Inject ItemService coz to make call to service
	private final ItemService itemService;
	
	//End-point for adding the item
	//Accessible only by Admins
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/admin/items")
	public ItemResponse addItem(@RequestPart("item") String itemString, @RequestPart("file") MultipartFile file) {
		ObjectMapper objectMapper = new ObjectMapper();
		ItemRequest itemRequest = null;
		try {
			itemRequest = objectMapper.readValue(itemString, ItemRequest.class);
			return itemService.add(itemRequest, file);			
		} catch (JsonProcessingException ex) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error occured while processing the json");
		}
	}
	
	
	//To fetch the items. Accessible by both users and admin
	@GetMapping("/items")
	public List<ItemResponse> readItems(){
		return itemService.fetchItems();
	}
	
	
	//The items must be deleted only by Admins
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@DeleteMapping("/admin/items/{itemId}")
	public void removeItem(@PathVariable String itemId) {
		try {
			itemService.deleteItem(itemId);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found");
		}
	}

}
