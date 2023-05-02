package Misak.CS.ICES4HU.EnrollmentRequest.Controller;

import Misak.CS.ICES4HU.EnrollmentRequest.Entity.EnrollmentRequestEntity;
import Misak.CS.ICES4HU.EnrollmentRequest.Service.EnrollmentRequestService;
import Misak.CS.ICES4HU.Enums.Role;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping(path="/api/enrollment_requests")
public class EnrollmentRequestController {
    @Autowired
    private EnrollmentRequestService enrollmentRequestService;
    @PostMapping(path="/signup")
    public ResponseEntity<EnrollmentRequestEntity> signup(@Valid @RequestBody EnrollmentRequestEntity enrollmentRequest){
        EnrollmentRequestEntity returnObject= enrollmentRequestService.createEnrollment(enrollmentRequest);
        return new ResponseEntity<>(returnObject, HttpStatusCode.valueOf(200));
    }

    @PutMapping(path="/accept")
    public ResponseEntity<EnrollmentRequestEntity> acceptEnrollmentRequest(@Valid @RequestBody EnrollmentRequestEntity enrollmentRequest){
        if(enrollmentRequest.getRole() != Role.ADMIN){
            System.out.println("Only admin can accept enrollment requests");
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(401));
        }
        System.out.println("Accepting enrollment request");
        EnrollmentRequestEntity returnObject= enrollmentRequestService.acceptEnrollmentRequest(enrollmentRequest);
        return new ResponseEntity<>(returnObject, HttpStatusCode.valueOf(200));
    }

    // reject enrollment request
    @DeleteMapping(path="/reject")
    public ResponseEntity<EnrollmentRequestEntity> rejectEnrollmentRequest(@Valid @RequestBody EnrollmentRequestEntity enrollmentRequest){
        if(enrollmentRequest.getRole() != Role.ADMIN){
            System.out.println("Only admin can reject enrollment requests");
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(401));
        }
        System.out.println("Rejecting enrollment request");
        enrollmentRequestService.rejectEnrollmentRequest(enrollmentRequest);
        return new ResponseEntity<>(null, HttpStatusCode.valueOf(200));
    }

}
