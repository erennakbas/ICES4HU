package Misak.CS.ICES4HU.User.Service.impl;

import Misak.CS.ICES4HU.Enums.UserStatus;
import Misak.CS.ICES4HU.User.Entity.UserEntity;
import Misak.CS.ICES4HU.User.Repository.UserRepository;
import Misak.CS.ICES4HU.User.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    public List<UserEntity> getUsers(){
        return userRepository.findAll();
    }
    public UserEntity saveUser(UserEntity user){
        return userRepository.save(user);
    }
//    public void deleteUser(Long id){
//        Optional<UserEntity> userr = userRepository.findById(id);
//        if (userr.isPresent()){
//            UserEntity user = userr.get();
//            if (user.getStatus() == UserStatus.ACTIVE){
//                throw new Exception("silemezsin");
//            }
//        }
//    }
}
