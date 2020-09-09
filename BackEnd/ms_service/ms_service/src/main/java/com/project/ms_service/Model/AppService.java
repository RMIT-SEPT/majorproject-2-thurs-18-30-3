package com.project.ms_service.Model;


import javax.persistence.*;


@Entity
public class AppService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String name;
    @NotBlank(message = "name of service cannot be blank.")
    private String description;
    @NotBlank(message = "Description cannot be blank.")
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
