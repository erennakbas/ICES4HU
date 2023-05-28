package Misak.CS.ICES4HU.Semester.Controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Misak.CS.ICES4HU.Semester.Entity.SemesterEntity;
import Misak.CS.ICES4HU.Semester.Service.SemesterService;
import jakarta.validation.Valid;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping(path="/api/semester")
public class SemesterController {
    @Autowired
    private SemesterService semesterService;

    @GetMapping(path = "/active")
    public ResponseEntity<SemesterEntity> getActiveSemester(){
        System.out.println("Getting semester");
        SemesterEntity entity= semesterService.getActiveSemester();
        return new ResponseEntity<>(entity, HttpStatusCode.valueOf(200));
    }

    @PostMapping(path = "/create")
    public ResponseEntity<String> createSemester(@Valid @RequestBody SemesterEntity semester){
        System.out.println("Creating semester");
        semesterService.createSemester(semester.startDate, semester.endDate);
        return new ResponseEntity<>("Semester is succesfully created", HttpStatusCode.valueOf(200));
    }

    @GetMapping(path = "")
    public ResponseEntity<List<SemesterEntity>> getAllSemesters(){
        System.out.println("Getting all semesters");
        List<SemesterEntity> entities= semesterService.getAllSemesters();
        return new ResponseEntity<>(entities, HttpStatusCode.valueOf(200));
    }
    

}
