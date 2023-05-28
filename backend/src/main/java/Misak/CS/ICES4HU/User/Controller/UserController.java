package Misak.CS.ICES4HU.User.Controller;

import Misak.CS.ICES4HU.DTOs.IDListDTO;
import Misak.CS.ICES4HU.User.Entity.UserEntity;
import Misak.CS.ICES4HU.User.Service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PutMapping(path="/users/ban")
    public ResponseEntity<String> banUser(@RequestBody IDListDTO dto){
        userService.banUsers(dto.getIds());
        return ResponseEntity.ok("Users banned successfully");
    }

    @PutMapping(path="/users/delete")
    public ResponseEntity<String> deleteUsers(@RequestBody IDListDTO dto){
        userService.deleteUsers(dto.getIds());
        return ResponseEntity.ok("Users deleted successfully");
    }
}
