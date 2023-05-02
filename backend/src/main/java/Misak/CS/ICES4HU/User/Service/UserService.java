package Misak.CS.ICES4HU.User.Service;

import Misak.CS.ICES4HU.User.Entity.UserEntity;

import java.util.List;

public interface UserService {
   List<UserEntity> getUsers();
   UserEntity saveUser(UserEntity user);
   void initUsers();
   UserEntity login(String email, String password);
}
