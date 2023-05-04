package Misak.CS.ICES4HU.User.Controller;

import Misak.CS.ICES4HU.User.Entity.UserEntity;
import Misak.CS.ICES4HU.User.Service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@AllArgsConstructor
@RequestMapping(path="/api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(path="/users")
    public ResponseEntity<List<UserEntity>> getUsers(){
        return ResponseEntity.ok(userService.getUsers());
    }
    @PostMapping(path="/users")
    public ResponseEntity<UserEntity> saveUser(@RequestBody UserEntity user){
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @PostMapping(path="/login")
    public ResponseEntity<UserEntity> login( @RequestBody UserEntity user){
        UserEntity userEntity = userService.login(user.getSchoolId(), user.getPassword());

        return ResponseEntity.ok(userEntity);

    }

}
