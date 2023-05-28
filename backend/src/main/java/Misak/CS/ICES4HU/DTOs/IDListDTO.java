package Misak.CS.ICES4HU.DTOs;

import java.util.List;

public class IDListDTO {
    private List<Long> ids;

    public Iterable<Long> getIds() {
        return ids;
    }

    public void setIds(List<Long> ids) {
        this.ids = ids;
    }
}

