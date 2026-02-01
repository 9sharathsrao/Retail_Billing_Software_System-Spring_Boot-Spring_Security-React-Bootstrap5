package in.rao.retailBillingSoftware.Services;

import java.util.List;

import in.rao.retailBillingSoftware.io.UserRequest;
import in.rao.retailBillingSoftware.io.UserResponse;

public interface UserService {
	UserResponse createUser(UserRequest request);
	
	String getUserRole(String email);
	
	List<UserResponse> readUsers();
	
	void deleteUser(String id);

}
