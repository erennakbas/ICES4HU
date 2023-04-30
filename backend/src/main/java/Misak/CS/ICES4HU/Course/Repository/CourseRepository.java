package Misak.CS.ICES4HU.Course.Repository;

import Misak.CS.ICES4HU.Course.Entity.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<CourseEntity, Long> {
}
