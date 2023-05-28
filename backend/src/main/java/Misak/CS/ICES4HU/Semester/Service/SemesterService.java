package Misak.CS.ICES4HU.Semester.Service;
import java.util.List;

import Misak.CS.ICES4HU.Semester.Entity.SemesterEntity;


public interface SemesterService {
    void createSemester(String startDate, String endDate);
    SemesterEntity getActiveSemester();
    List<SemesterEntity> getAllSemesters();
}
