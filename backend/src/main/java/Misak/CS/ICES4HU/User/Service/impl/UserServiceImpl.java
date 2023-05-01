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

    public void initUsers() {

        // using object mapper read json file and create userentities
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
        TypeReference<List<UserEntity>> typeReference = new TypeReference<List<UserEntity>>(){};
        try {
            File file = ResourceUtils.getFile("classpath:tempUsers.json");
            // convert file to string
            String content = new String(java.nio.file.Files.readAllBytes(file.toPath()));

            List<UserEntity> users = mapper.readValue(content, typeReference);
            userRepository.saveAll(users);
            System.out.println("Users Saved!");
        } catch (IOException e){
            System.out.println("Unable to save users: " + e.getMessage());
        }

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
