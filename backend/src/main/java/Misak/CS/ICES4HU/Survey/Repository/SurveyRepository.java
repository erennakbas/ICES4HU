package Misak.CS.ICES4HU.Survey.Repository;

import Misak.CS.ICES4HU.Survey.Entity.SurveyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepository extends JpaRepository<SurveyEntity, Long> {
}
