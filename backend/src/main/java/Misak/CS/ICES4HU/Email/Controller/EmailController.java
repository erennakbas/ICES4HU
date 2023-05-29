package Misak.CS.ICES4HU.Email.Controller;

import Misak.CS.ICES4HU.Email.Service.EmailService;
import Misak.CS.ICES4HU.User.Entity.UserEntity;
import Misak.CS.ICES4HU.User.Service.UserService;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@AllArgsConstructor
@RequestMapping(path="/api/email")
public class EmailController {
    private EmailService emailService;
    private UserService userService;
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody HashMap<String, String> emailBody){
        String email = emailBody.get("email");
        UserEntity user = userService.getUserByEmail(email);
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?";
        String newPassword = RandomStringUtils.random( 10, characters );
        user.setPassword(newPassword);
        emailService.sendEmail(email, "Password Reset", "Your password is reset. New password is: "+ newPassword);
        userService.saveUser(user);
        return ResponseEntity.ok("Password is successfully reset");
    }
}
