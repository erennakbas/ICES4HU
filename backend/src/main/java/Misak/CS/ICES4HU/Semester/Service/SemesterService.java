package Misak.CS.ICES4HU.Semester.Service;
import java.util.List;

import Misak.CS.ICES4HU.Course.Entity.CourseEntity;
import Misak.CS.ICES4HU.Semester.Entity.SemesterEntity;


public interface SemesterService {
    void createSemester(String startDate, String endDate, String description);
    SemesterEntity getActiveSemester();
    List<SemesterEntity> getAllSemesters();
    SemesterEntity getSemesterById(Long id);
    void addSemesterCourses(Long id, List<CourseEntity> courseList);
    List<CourseEntity> getCoursesByIds(List<Long> ids);
    SemesterEntity deleteSemesterCourseList(Long id, Long courseId);
    SemesterEntity updateSemesterCourse(Long id, CourseEntity courseEntity);
}
