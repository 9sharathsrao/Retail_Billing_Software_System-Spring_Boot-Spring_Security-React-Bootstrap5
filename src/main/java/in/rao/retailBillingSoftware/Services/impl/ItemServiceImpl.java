package in.rao.retailBillingSoftware.Services.impl;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import in.rao.retailBillingSoftware.Repository.CategoryRepository;
import in.rao.retailBillingSoftware.Repository.ItemRepository;
import in.rao.retailBillingSoftware.Services.CloudinaryService;
import in.rao.retailBillingSoftware.Services.ItemService;
import in.rao.retailBillingSoftware.entity.CategoryEnitity;
import in.rao.retailBillingSoftware.entity.ItemEntity;
import in.rao.retailBillingSoftware.io.ItemRequest;
import in.rao.retailBillingSoftware.io.ItemResponse;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService{
	
	private final CloudinaryService fileUploadService;
	
	private final CategoryRepository categoryRepository;
	
	private final ItemRepository itemRepository;
	

	@Override
	public ItemResponse add(ItemRequest request, MultipartFile file){
		 try {
			 String imgUrl = fileUploadService.uploadFile(file);
			 
			 ItemEntity newItem = convertToEntity(request);
			 CategoryEnitity existingCategory = categoryRepository.findByCategoryId(request.getCategoryId())
			 	.orElseThrow(() -> new RuntimeException("Category Not Found: " + request.getCategoryId()));
			 
			 newItem.setCategory(existingCategory);
			 newItem.setImgUrl(imgUrl);
			 newItem = itemRepository.save(newItem);
			 return convertToResponse(newItem);
			
		} catch (IOException e) {
			 throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Image upload failed", e);
		}
	}

	private ItemResponse convertToResponse(ItemEntity newItem) {
		 return ItemResponse.builder()
				 .itemId(newItem.getItemId())
				 .name(newItem.getName())
				 .description(newItem.getDescription())
				 .price(newItem.getPrice())
				 .imgUrl(newItem.getImgUrl())
				 .categoryName(newItem.getCategory().getName())
				 .categoryId(newItem.getCategory().getCategoryId())
				 .createdAt(newItem.getCreatedAt())
				 .updatedAt(newItem.getUpdatedAt())
				 .build();
	}

	private ItemEntity convertToEntity(ItemRequest request) {
		 return ItemEntity.builder()
		 	.itemId(UUID.randomUUID().toString())
		 	.name(request.getName())
		 	.description(request.getDescription())
		 	.price(request.getPrice())
		 	.build();
	}

	@Override
	public List<ItemResponse> fetchItems() {
		return itemRepository.findAll()
			.stream()
			.map(itemEntity -> convertToResponse(itemEntity))
			.collect(Collectors.toList());
	}

	@Override
	public void deleteItem(String itemId){
		//For this there are 2 things
		//Delete the image from cloudinary and then
		//Remove the Item
		ItemEntity existingItem = itemRepository.findByItemId(itemId)
					.orElseThrow(() -> new RuntimeException("Item not found: "+itemId));
		
		try {
			boolean isFileDelete = fileUploadService.deleteFile(existingItem.getImgUrl());
			
			if(isFileDelete) {
				itemRepository.delete(existingItem);
			}else {
				throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to delete the image");
			}
		} catch (IOException e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "File detection failed", e);
		}
	}
}
