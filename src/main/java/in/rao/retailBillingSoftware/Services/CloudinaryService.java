 package in.rao.retailBillingSoftware.Services;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    // 📤 Upload file and return both URL and public_id
    public String uploadFile(MultipartFile file) throws IOException {
    	
    	try {
			return (String) cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap()).get("url");
		} catch (IOException e) {
			e.printStackTrace();
			throw e;
		}
    }
    
//    @SuppressWarnings("unchecked")
//    // 🗑️ Delete file using public_id
//    public String deleteFile(String publicId) throws IOException {
//        // 🎯 FIX: Explicitly use Map<String, Object> for the variable declaration
//        Map<String, Object> result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
//        
//        // Safely retrieve the result value
//        Object resultObj = result.get("result");
//        
//        // Check for null just in case
//        return (resultObj != null) ? resultObj.toString() : "Delete result not available"; 
//    }
    
    
    @SuppressWarnings("unchecked")
    public boolean deleteFile(String publicId) throws IOException {
        Map<String, Object> result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());

        Object resultObj = result.get("result");
        String resultStr = (resultObj != null) ? resultObj.toString() : "";

        // Cloudinary returns "ok" if deletion was successful
        return "ok".equalsIgnoreCase(resultStr);
    }

}
