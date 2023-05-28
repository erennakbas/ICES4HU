package Misak.CS.ICES4HU.User.Service.impl;

import Misak.CS.ICES4HU.DTOs.AccountDetailsDTO;
import Misak.CS.ICES4HU.DTOs.PasswordDTO;
import Misak.CS.ICES4HU.DTOs.PictureDTO;
import Misak.CS.ICES4HU.EnrollmentRequest.Entity.EnrollmentRequestEntity;
import Misak.CS.ICES4HU.Enums.UserStatus;
import Misak.CS.ICES4HU.User.Entity.UserEntity;
import Misak.CS.ICES4HU.User.Repository.UserRepository;
import Misak.CS.ICES4HU.User.Service.UserService;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.apache.catalina.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private ModelMapper modelMapper;
    public List<UserEntity> getUsers(){
        userRepository.findAll();
        return userRepository.findAll();
    }
    public UserEntity saveUser(UserEntity user){
        return userRepository.save(user);
    }
    public UserEntity getUser(Long id) {
        Optional<UserEntity> opt = userRepository.findById(id);
        if (opt.isPresent()){
            return opt.get();
        }
        throw new IllegalArgumentException("Id doesn't match");
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

    public void banUsers(Iterable<Long> userIDs) {
        Iterable<UserEntity> users = userRepository.findAllById(userIDs);
        for (UserEntity user : users) {
            user.setBanned(true);
            userRepository.save(user);

        }
    }

    public void deleteUsers(Iterable<Long> userIDs) {
        Iterable<UserEntity> users = userRepository.findAllById(userIDs);
        for (UserEntity user : users) {
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
    public UserEntity updateMyAccountDetails(AccountDetailsDTO dto){
        UserEntity user = userRepository.findById(dto.getId()).get();
        modelMapper.map(dto, user);
        return userRepository.save(user);


    }
    public UserEntity updateMyPassword(PasswordDTO dto){
        UserEntity user = userRepository.findById(dto.getId()).get();
        if (!dto.getConfirmPassword().equals(dto.getPassword()))
            throw new IllegalArgumentException("Passwords doesn't match");
        modelMapper.map(dto, user);
        return userRepository.save(user);
    }
    public UserEntity updateMyPicture(PictureDTO dto){
        UserEntity user = userRepository.findById(dto.getId()).get();
        try {
            user.setImage(dto.getImage().getBytes());
        }
        catch(IOException e){
            throw new IllegalArgumentException("IO Exception Happened while uploading the image");
        }
        return userRepository.save(user);
    }
}
