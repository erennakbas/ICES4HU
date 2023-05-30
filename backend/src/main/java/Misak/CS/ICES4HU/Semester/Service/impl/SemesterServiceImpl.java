package Misak.CS.ICES4HU.Semester.Service.impl;

import lombok.AllArgsConstructor;

import java.sql.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import Misak.CS.ICES4HU.Semester.Repository.SemesterRepository;
import Misak.CS.ICES4HU.Semester.Service.SemesterService;
import Misak.CS.ICES4HU.Course.Entity.CourseEntity;
import Misak.CS.ICES4HU.Course.Repository.CourseRepository;
import Misak.CS.ICES4HU.Semester.Entity.SemesterEntity;



@Service
@AllArgsConstructor
public class SemesterServiceImpl implements SemesterService{
    SemesterRepository semesterRepository;
    CourseRepository courseRepository;
    

    public void createSemester(String startDate, String endDate, String description){
        SemesterEntity semesterEntity = new SemesterEntity();
        Date startDate1 = Date.valueOf(startDate);
        Date endDate1 = Date.valueOf(endDate);

        // check all semesters if new entities date is collapse with start and end date of any semester entity in database 
        // if it is collapse throw exception
        // else save new entity
        for (SemesterEntity semester : semesterRepository.findAll()) {
            // convert string to date
            Date startDate2 = Date.valueOf(semester.getStartDate());
            Date endDate2 = Date.valueOf(semester.getEndDate());

            // check if new entity start date is between any start and end date of any semester entity in database
            if (startDate1.after(startDate2) && startDate1.before(endDate2)) {
                throw new IllegalArgumentException("Start date is between another semester start and end date");
            }

            // check if new entity end date is between any start and end date of any semester entity in database
            if (endDate1.after(startDate2) && endDate1.before(endDate2)) {
                throw new IllegalArgumentException("End date is between another semester start and end date");
            }

            


            


            
        }
        // check if new entity end date is before current date
        if ( endDate1.before(new Date(System.currentTimeMillis()))) {
            throw new IllegalArgumentException("Start date and end date is before current date");
        }

        // check if new entity start date is after end date
        if (startDate1.after(endDate1)) {
            throw new IllegalArgumentException("Start date is after end date");
        }

        // create new entity
        semesterEntity.setStartDate(startDate);
        semesterEntity.setEndDate(endDate);
        semesterEntity.setDescription(description);
        semesterRepository.save(semesterEntity);
    }


    public SemesterEntity getActiveSemester(){
        // get current date
        Date currentDate = new Date(System.currentTimeMillis());
        // check all semesters if current date is between start and end date of any semester entity in database 
        // if it is return that entity
        // else throw exception
        for (SemesterEntity semester : semesterRepository.findAll()) {
            // convert string to date
            Date startDate = Date.valueOf(semester.getStartDate());
            Date endDate = Date.valueOf(semester.getEndDate());

            // check if current date is between any start and end date of any semester entity in database
            if (currentDate.after(startDate) && currentDate.before(endDate)) {
                return semester;
            }
        }
        throw new IllegalArgumentException("There is no active semester");
    }

    public List<SemesterEntity> getAllSemesters(){
        return semesterRepository.findAll();
    }

    public SemesterEntity getSemesterById(Long id){
        return semesterRepository.findSemesterEntityById(id);
    }
    
    public void updateSemesterCourseList(Long id, List<CourseEntity> courseList){
        SemesterEntity semesterEntity = semesterRepository.findSemesterEntityById(id);
        List<CourseEntity> courseList1 = semesterEntity.getCourseList();
        for (CourseEntity course : courseList) {
            CourseEntity courseEntity ;
            try {
                if(courseRepository.findCourseEntityByCode(course.getCode()).equals(courseRepository.findCourseEntityById(course.getId()))){
                    courseEntity = courseRepository.findCourseEntityByCode(course.getCode());
                    courseList1.remove(courseEntity);
                }else{
                    courseEntity = new CourseEntity();
                }
            } catch (Exception e) {
                courseEntity = new CourseEntity();
            }
            
            courseEntity.setName(course.getName());
            courseEntity.setCode(course.getCode());
            courseEntity.setCredit(course.getCredit());
            courseEntity.setInstructor(course.getInstructor());
            courseEntity.setDepartment(course.getDepartment());
            courseRepository.save(courseEntity);

            courseList1.add(courseEntity);
        }
        semesterEntity.setCourseList(courseList1);
        semesterRepository.save(semesterEntity);
    }

    public List<CourseEntity> getCoursesByIds(List<Long> ids){
        return courseRepository.findAllById(ids);
    }

    public SemesterEntity deleteSemesterCourseList(Long id, List<CourseEntity> courseList){
        SemesterEntity semesterEntity = semesterRepository.findSemesterEntityById(id);
        List<CourseEntity> courseList1 = semesterEntity.getCourseList();
        for (CourseEntity course : courseList) {
            CourseEntity courseEntity = courseRepository.findCourseEntityById(course.getId());
            courseList1.remove(courseEntity);
        }
        semesterEntity.setCourseList(courseList1);
        semesterRepository.save(semesterEntity);
        return semesterEntity;
    }
}
