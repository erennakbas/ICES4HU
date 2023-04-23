package Misak.CS.ICES4HU.User.Entity;

import Misak.CS.ICES4HU.Base.Entity.BaseUserEntity;
import Misak.CS.ICES4HU.Enums.UserStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity(name="users")
public class UserEntity extends BaseUserEntity {
    @Column(nullable = false)
    public boolean isBanned=false;
    @Column(nullable = false)
    public UserStatus status = UserStatus.ACTIVE;

}
