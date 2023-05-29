package Misak.CS.ICES4HU.Semester.Service;
import java.util.List;

import Misak.CS.ICES4HU.Semester.Entity.SemesterEntity;


public interface SemesterService {
    void createSemester(String startDate, String endDate, String description);
    SemesterEntity getActiveSemester();
    List<SemesterEntity> getAllSemesters();
    SemesterEntity getSemesterById(Long id);
}
