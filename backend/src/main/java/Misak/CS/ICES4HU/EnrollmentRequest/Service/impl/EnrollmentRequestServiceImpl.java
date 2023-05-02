package Misak.CS.ICES4HU.EnrollmentRequest.Service.impl;

import Misak.CS.ICES4HU.EnrollmentRequest.Entity.EnrollmentRequestEntity;
import Misak.CS.ICES4HU.EnrollmentRequest.Repository.EnrollmentRequestRepository;
import Misak.CS.ICES4HU.EnrollmentRequest.Service.EnrollmentRequestService;
import Misak.CS.ICES4HU.User.Entity.UserEntity;
import Misak.CS.ICES4HU.User.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EnrollmentRequestServiceImpl implements EnrollmentRequestService {
    private EnrollmentRequestRepository repository;
    private UserRepository userRepository;
    public EnrollmentRequestEntity createEnrollment(EnrollmentRequestEntity enrollmentRequest){
        return repository.save(enrollmentRequest);
    }

    public EnrollmentRequestEntity acceptEnrollmentRequest(EnrollmentRequestEntity enrollmentRequest){
        // create new user from enrollment request
        UserEntity newUser = new UserEntity();
        newUser.setFirstName(enrollmentRequest.getFirstName());
        newUser.setLastName(enrollmentRequest.getLastName());
        newUser.setEmail(enrollmentRequest.getEmail());
        newUser.setPassword(enrollmentRequest.getPassword());
        newUser.setRole(enrollmentRequest.getRole());
        newUser.setSchoolId(enrollmentRequest.getSchoolId());

        // save new user
        userRepository.save(newUser);

        // delete enrollment request
        repository.delete(enrollmentRequest);

        return enrollmentRequest;
    }

    public void rejectEnrollmentRequest(EnrollmentRequestEntity enrollmentRequest){
        repository.delete(enrollmentRequest);
    }

}
