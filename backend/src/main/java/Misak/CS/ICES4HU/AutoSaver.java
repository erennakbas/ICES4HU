package Misak.CS.ICES4HU;

import Misak.CS.ICES4HU.EnrollmentRequest.Entity.EnrollmentRequestEntity;
import Misak.CS.ICES4HU.EnrollmentRequest.Repository.EnrollmentRequestRepository;
import Misak.CS.ICES4HU.User.Entity.UserEntity;
import Misak.CS.ICES4HU.User.Repository.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Component
public class AutoSaver {

    private UserRepository userRepository;
    private EnrollmentRequestRepository enrollmentRequestRepository;

    public AutoSaver(UserRepository userRepository, EnrollmentRequestRepository enrollmentRequestRepository) {
        this.userRepository = userRepository;
        this. enrollmentRequestRepository=enrollmentRequestRepository;
        saveUsers();
        saveEnrollmentRequests();
    }
    public void saveUsers() {

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
    public void saveEnrollmentRequests(){
        // using object mapper read json file and create enrollment entities
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
        TypeReference<List<EnrollmentRequestEntity>> typeReference = new TypeReference<List<EnrollmentRequestEntity>>(){};
        try {
            File file = ResourceUtils.getFile("classpath:enrollments.json");
            // convert file to string
            String content = new String(java.nio.file.Files.readAllBytes(file.toPath()));

            List<EnrollmentRequestEntity> users = mapper.readValue(content, typeReference);
            enrollmentRequestRepository.saveAll(users);
            System.out.println("Enrollments are saved!");
        } catch (IOException e){
            System.out.println("Unable to save enrollments: " + e.getMessage());
        }
    }
}
