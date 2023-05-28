package Misak.CS.ICES4HU.EnrollmentRequest.Service.impl;

import Misak.CS.ICES4HU.EnrollmentRequest.Entity.EnrollmentRequestEntity;
import Misak.CS.ICES4HU.EnrollmentRequest.Repository.EnrollmentRequestRepository;
import Misak.CS.ICES4HU.EnrollmentRequest.Service.EnrollmentRequestService;
import Misak.CS.ICES4HU.User.Entity.UserEntity;
import Misak.CS.ICES4HU.User.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EnrollmentRequestServiceImpl implements EnrollmentRequestService {
    private ModelMapper modelMapper;
    private EnrollmentRequestRepository repository;
    private UserRepository userRepository;
    public EnrollmentRequestEntity createEnrollment(EnrollmentRequestEntity enrollmentRequest){
        return repository.save(enrollmentRequest);
    }

    public void acceptEnrollmentRequest(Iterable<Long> enrollmentRequestIDs){
        Iterable<EnrollmentRequestEntity> enrollmentRequestEntities = repository.findAllById(enrollmentRequestIDs);
        for(EnrollmentRequestEntity e: enrollmentRequestEntities){
            UserEntity user = modelMapper.map(e, UserEntity.class);
            user.setId(null);
            // save new user
            userRepository.save(user);
            repository.delete(e);
        }
    }

    public void rejectEnrollmentRequest(Iterable<Long> enrollmentRequestIDs){
        for(Long id: enrollmentRequestIDs){
            repository.deleteById(id);
        }
    }


    public Iterable<EnrollmentRequestEntity> getEnrollmentRequests(){
        return repository.findAll();
    }
}
