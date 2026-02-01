package in.rao.retailBillingSoftware.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import in.rao.retailBillingSoftware.Services.CategoryService;
import in.rao.retailBillingSoftware.io.CategoryRequest;
import in.rao.retailBillingSoftware.io.CategoryResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
// REMOVED the "/api/v1.0" from here because your application.properties 
// already handles the context path. Spring will automatically add it.
public class CategoryController {

    // IMPORTANT: 'final' is required for Lombok @RequiredArgsConstructor to work
    private final CategoryService categoryService;

    // URL: http://localhost:8080/api/v1.0/admin/categories
    @PostMapping("/admin/categories")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(
            @RequestPart("category") String categoryString, 
            @RequestPart("file") MultipartFile file) {
        
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            CategoryRequest request = objectMapper.readValue(categoryString, CategoryRequest.class);
            return categoryService.add(request, file);
        } catch (JsonProcessingException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "JSON parsing error");
        }       
    }

    // URL: http://localhost:8080/api/v1.0/categories
    @GetMapping("/categories")
    public List<CategoryResponse> fetchCategories() {
        return categoryService.read();
    }

    // URL: http://localhost:8080/api/v1.0/admin/categories/{categoryId}
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/admin/categories/{categoryId}")
    public void remove(@PathVariable String categoryId) {
        try {
            categoryService.delete(categoryId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}