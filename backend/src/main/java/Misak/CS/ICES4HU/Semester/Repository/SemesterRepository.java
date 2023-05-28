package Misak.CS.ICES4HU.Semester.Repository;

import Misak.CS.ICES4HU.Semester.Entity.SemesterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SemesterRepository extends JpaRepository<SemesterEntity, Long> {
}
