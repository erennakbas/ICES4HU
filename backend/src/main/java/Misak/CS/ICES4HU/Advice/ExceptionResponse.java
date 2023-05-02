package Misak.CS.ICES4HU.Advice;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class ExceptionResponse {
    private LocalDateTime time;
    private int status;
    private String error;
    private String message;
    public ExceptionResponse(LocalDateTime time, int status, String error, String message) {
        this.time = time;
        this.status = status;
        this.error = error;
        this.message = message;
    }
}
