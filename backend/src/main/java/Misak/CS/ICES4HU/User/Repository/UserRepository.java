package Misak.CS.ICES4HU.User.Repository;

import Misak.CS.ICES4HU.User.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findUserEntityByEmail(String email);
    UserEntity findUserEntityBySchoolId(String schoolId);
    List<UserEntity> findUserEntitiesByFirstName(String firstName);
}
