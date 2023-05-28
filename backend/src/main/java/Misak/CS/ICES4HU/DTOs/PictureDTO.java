package Misak.CS.ICES4HU.DTOs;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PictureDTO {
    private Long id;
    MultipartFile image;
}
