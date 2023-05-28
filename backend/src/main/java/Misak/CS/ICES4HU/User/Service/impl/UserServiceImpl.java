package Misak.CS.ICES4HU.User.Service.impl;

import Misak.CS.ICES4HU.Enums.UserStatus;
import Misak.CS.ICES4HU.User.Entity.UserEntity;
import Misak.CS.ICES4HU.User.Repository.UserRepository;
import Misak.CS.ICES4HU.User.Service.UserService;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;


import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


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



    public UserEntity login(String schoolId, String password){
        UserEntity userEntity = userRepository.findUserEntityBySchoolId(schoolId);
        if (userEntity != null){
            if (userEntity.getPassword().equals(password)){
                return userEntity;
            }
        }

        throw new IllegalArgumentException("School Id or password is incorrect");
    }

    public void banUsers(List<UserEntity> users) {
        for (UserEntity user : users) {
            UserEntity userEntity = userRepository.findUserEntityBySchoolId(user.getSchoolId());
            if (userEntity != null) {
                userEntity.setBanned(true);
                userRepository.save(userEntity);
            } else {
                throw new IllegalArgumentException("School Id is incorrect for user: " + user.getFirstName());
            }
        }
    }

    public void deleteUsers(List<UserEntity> users) {
        for (UserEntity userEntity : users) {
            UserEntity user = userRepository.findUserEntityBySchoolId(userEntity.getSchoolId());
            if (user != null) {
                if (!user.getStatus().equals(UserStatus.ACTIVE)) {
                    userRepository.delete(user);
                } else {
                    throw new IllegalArgumentException("User cannot be deleted as their status is ACTIVE");
                }
            } else {
                throw new IllegalArgumentException("User not found");
            }
        }
    }
}
