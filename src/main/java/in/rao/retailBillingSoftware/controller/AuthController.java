package in.rao.retailBillingSoftware.controller;

import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import in.rao.retailBillingSoftware.Services.UserService;
import in.rao.retailBillingSoftware.Services.impl.AppUserDetailsService;
import in.rao.retailBillingSoftware.io.AuthRequest;
import in.rao.retailBillingSoftware.io.AuthResponse;
import in.rao.retailBillingSoftware.util.JwtUtil;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AuthController {
	
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final AppUserDetailsService appUserDetailsService;
	private final JwtUtil jwtUtil;
	private final UserService userService;
	
	@PostMapping("/login")
	public AuthResponse login(@RequestBody AuthRequest request) throws Exception {
		authenticate(request.getEmail(), request.getPassword());
		final UserDetails userDetails = appUserDetailsService.loadUserByUsername(request.getEmail());
		final String jwtToken = jwtUtil.generateToken(userDetails);
		//To get the role you need the user service.
		//TODO: Fetch the role from repository
		String role = userService.getUserRole(request.getEmail());
		return new AuthResponse(request.getEmail(), jwtToken, role);
		
	}
	
	private void authenticate(String email, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
		} catch (DisabledException e) {
			throw new Exception("User disabled");
		}catch(BadCredentialsException e) {
			throw new ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "Incorrect Email or Password");
		}
	}

	//This end point which helps or is just used to encode the password.To generate admin password
	@PostMapping("/encode")
	public String encodePassword(@RequestBody Map<String, String> request) {
		return passwordEncoder.encode(request.get("password"));
	}
}
