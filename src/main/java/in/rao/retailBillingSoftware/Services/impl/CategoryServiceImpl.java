package in.rao.retailBillingSoftware.Services.impl;

import java.io.IOException;
import java.util.List;
import java.util.UUID; 
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.utils.StringUtils;

import in.rao.retailBillingSoftware.Repository.CategoryRepository;
import in.rao.retailBillingSoftware.Repository.ItemRepository;
import in.rao.retailBillingSoftware.Services.CategoryService;
import in.rao.retailBillingSoftware.Services.CloudinaryService;
import in.rao.retailBillingSoftware.entity.CategoryEnitity;
import in.rao.retailBillingSoftware.io.CategoryRequest;
import in.rao.retailBillingSoftware.io.CategoryResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{
	
	
	private final CategoryRepository categoryRepository;
	
	private final CloudinaryService cloudinaryService;
	
	private final ItemRepository itemRepository;
	
	
	 @Override
	    public CategoryResponse add(CategoryRequest request, MultipartFile file){
	        // 1. Convert request object into entity obj (without image URL yet)
	        CategoryEnitity newCategory = convertToEntity(request);
	        
	        String imgUrl = null;
	        try {
	            // 2. Upload file to Cloudinary
	            imgUrl = cloudinaryService.uploadFile(file);
 	        } catch (IOException e) {
	            // Log the error for better debugging
	        	e.printStackTrace(); 
	            throw new RuntimeException("Failed to upload image to Cloudinary.", e);
	            // Optional: throw a custom exception or a runtime exception
	            // throw new RuntimeException("Image upload failed.", e); 
	        }
	        
	        // 3. Set the image URL on the entity
	        newCategory.setImgUrl(imgUrl); 

	        // 4. Save the entity to the database (This saves all fields, including the imgUrl)
	        newCategory = categoryRepository.save(newCategory);

	        // 5. Return the response
	        return convertToResponse(newCategory);		
	    }

	private CategoryResponse convertToResponse(CategoryEnitity newCategory) {
		Integer itemsCount = itemRepository.countByCategoryId(newCategory.getId());
		 return CategoryResponse.builder()
				 	.categoryId(newCategory.getCategoryId())
				 	.name(newCategory.getName())
				 	.description(newCategory.getDescription())
				 	.bgColor(newCategory.getBgColor())
				 	.imgUrl(newCategory.getImgUrl())
				 	.createdAt(newCategory.getCreatedAt())
				 	.updatedAt(newCategory.getUpdatedAt())
				 	.items(itemsCount)
				 	.build();
	}

	private CategoryEnitity convertToEntity(CategoryRequest request) {
		//builder pattern to copy all the values from request object to the categoryEntity
		//The builder() method, in the context of the Builder design pattern, serves as the entry point for constructing a complex object step-by-step.
		//It typically initiates the building process by returning an instance of a "Builder" class
		return CategoryEnitity.builder()
				.categoryId(UUID.randomUUID().toString())
				.name(request.getName())
				.description(request.getDescription())
				.bgColor(request.getBgColor())
				.build();
	}

	@Override
	public List<CategoryResponse> read() {
		 return categoryRepository.findAll()
		 .stream()
		 .map(categoryEntity -> convertToResponse(categoryEntity))
		 .collect(Collectors.toList());

	}

	@Override
	public void delete(String categoryId) {
		CategoryEnitity existingCategory = categoryRepository.findByCategoryId(categoryId)
		 .orElseThrow(() -> new RuntimeException("Category not found: " + categoryId));
		categoryRepository.delete(existingCategory);
	}
}
