package Misak.CS.ICES4HU.User.Service;

import Misak.CS.ICES4HU.Course.Entity.CourseEntity;
import Misak.CS.ICES4HU.DTOs.AccountDetailsDTO;
import Misak.CS.ICES4HU.DTOs.PasswordDTO;
import Misak.CS.ICES4HU.DTOs.PictureDTO;
import Misak.CS.ICES4HU.User.Entity.UserEntity;
import org.apache.catalina.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
   List<UserEntity> getUsers();
   UserEntity saveUser(UserEntity user);
   UserEntity login(String schoolId, String password);
   void banUsers(Iterable<Long> userIDs);
   void deleteUsers(Iterable<Long> userIDs);
   UserEntity updateMyAccountDetails(AccountDetailsDTO dto);
   UserEntity updateMyPassword(PasswordDTO dto);
   UserEntity getUser(Long id);
   UserEntity updateMyPicture(PictureDTO dto);
   UserEntity getUserByEmail(String email);
   List<CourseEntity> updateCourseList(AccountDetailsDTO dto,List<CourseEntity> courseList);
}
