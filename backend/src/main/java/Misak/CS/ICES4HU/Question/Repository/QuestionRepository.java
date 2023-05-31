package Misak.CS.ICES4HU.Question.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Misak.CS.ICES4HU.Question.Entity.QuestionEntity;


@Repository
public interface QuestionRepository extends JpaRepository<QuestionEntity, Long> {
    
}
