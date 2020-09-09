package com.project.ms_service.ms_service.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import javax.persistence.*;


@Entity
public class AppService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String name;

    private String description;

    private String photo;

    public AppService() {

    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getPhoto() {
        return photo;
    }



}
