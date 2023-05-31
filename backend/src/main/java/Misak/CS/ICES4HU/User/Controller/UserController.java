package Misak.CS.ICES4HU.User.Controller;

import Misak.CS.ICES4HU.DTOs.AccountDetailsDTO;
import Misak.CS.ICES4HU.DTOs.IDListDTO;
import Misak.CS.ICES4HU.DTOs.PasswordDTO;
import Misak.CS.ICES4HU.DTOs.PictureDTO;
import Misak.CS.ICES4HU.User.Entity.UserEntity;
import Misak.CS.ICES4HU.User.Service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@AllArgsConstructor
@RequestMapping(path="/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping(path="")
    public ResponseEntity<List<UserEntity>> getUsers(){
        return ResponseEntity.ok(userService.getUsers());
    }
    @GetMapping(path="/{id}")
    public ResponseEntity<UserEntity> getUser(@PathVariable Long id){
        return ResponseEntity.ok(userService.getUser(id));
    }
    @PostMapping(path="")
    public ResponseEntity<UserEntity> saveUser(@RequestBody UserEntity user){
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @PostMapping(path="/login")
    public ResponseEntity<UserEntity> login( @RequestBody UserEntity user){
        UserEntity userEntity = userService.login(user.getSchoolId(), user.getPassword());

        return ResponseEntity.ok(userEntity);

    }

    @PutMapping(path="/ban")
    public ResponseEntity<String> banUser(@RequestBody IDListDTO dto){
        userService.banUsers(dto.getIds());
        return ResponseEntity.ok("Users banned successfully");
    }

    @PutMapping(path="/delete")
    public ResponseEntity<String> deleteUsers(@RequestBody IDListDTO dto){
        userService.deleteUsers(dto.getIds());
        return ResponseEntity.ok("Users deleted successfully");
    }
    @PatchMapping(path="/myself/account-details")
    public ResponseEntity<UserEntity> updateMyAccountDetails(@RequestBody AccountDetailsDTO dto){
        UserEntity user = userService.updateMyAccountDetails(dto);
        return ResponseEntity.ok(user);
    }
    @PatchMapping(path="/myself/password")
    public ResponseEntity<UserEntity> updateMyPassword(@RequestBody PasswordDTO dto){
        UserEntity user = userService.updateMyPassword(dto);
        return ResponseEntity.ok(user);
    }
    @PostMapping(path="/myself/upload-image",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadMyImage(
            MultipartFile image, @RequestParam Long id) {
            PictureDTO dto = new PictureDTO();
            dto.setImage(image);
            dto.setId(id);
            userService.updateMyPicture(dto);
            return ResponseEntity.ok("Image uploaded successfully.");
    }

    @PatchMapping(path="/courselist")
    public ResponseEntity<UserEntity> updateCourseList( @RequestBody List<CourseEntity> courseList){
        UserEntity user = userService.updateCourseList();
        return ResponseEntity.ok(user);
    }
}
