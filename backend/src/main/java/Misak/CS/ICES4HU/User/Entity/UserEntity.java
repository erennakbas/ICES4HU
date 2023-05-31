package Misak.CS.ICES4HU.User.Entity;

import java.util.ArrayList;
import java.util.List;

import Misak.CS.ICES4HU.Base.Entity.BaseUserEntity;
import Misak.CS.ICES4HU.Course.Entity.CourseEntity;
import Misak.CS.ICES4HU.Enums.UserStatus;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity(name="users")
public class UserEntity extends BaseUserEntity {
    @Column(nullable = false)
    public boolean isBanned=false;
    @Column(nullable = false)
    public UserStatus status = UserStatus.ACTIVE;

    @OneToMany(cascade = CascadeType.ALL)
    public List<CourseEntity> takenCourseList = new ArrayList<>();

}
