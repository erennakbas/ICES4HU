package Misak.CS.ICES4HU.Semester.Controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Misak.CS.ICES4HU.Course.Entity.CourseEntity;
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
    public ResponseEntity<String> createSemester(@RequestBody SemesterEntity semester){
        System.out.println("Creating semester");
        semesterService.createSemester(semester.startDate, semester.endDate, semester.description);
        return new ResponseEntity<>("Semester is succesfully created", HttpStatusCode.valueOf(200));
    }

    @GetMapping(path = "")
    public ResponseEntity<List<SemesterEntity>> getAllSemesters(){
        System.out.println("Getting all semesters");
        List<SemesterEntity> entities= semesterService.getAllSemesters();
        return new ResponseEntity<>(entities, HttpStatusCode.valueOf(200));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<SemesterEntity> getSemesterById(@PathVariable Long id){
        System.out.println("Getting semester by id");
        SemesterEntity entity= semesterService.getSemesterById(id);
        System.out.println(entity.courseList);
        return new ResponseEntity<>(entity, HttpStatusCode.valueOf(200));
    }
    
    @PutMapping(path = "/{id}")
    public ResponseEntity<String> updateSemesterCourseList(@PathVariable Long id, @RequestBody List<CourseEntity> courseList){
        System.out.println("Updating semester");
        System.out.println(courseList.get(0));
        semesterService.updateSemesterCourseList(id, courseList);
        return new ResponseEntity<>("Semester is succesfully updated", HttpStatusCode.valueOf(200));
    }

}
