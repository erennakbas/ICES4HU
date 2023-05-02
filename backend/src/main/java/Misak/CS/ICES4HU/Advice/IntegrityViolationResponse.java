package Misak.CS.ICES4HU.Advice;

import java.time.LocalDateTime;
import java.util.Map;

public class IntegrityViolationResponse extends ExceptionResponse{
    public Map<String, String> fields;
    public IntegrityViolationResponse(LocalDateTime timestamp, int status, String error, String message, Map<String,String> fields) {
        super(timestamp, status, error, message);
        this.fields = fields;

    }
}