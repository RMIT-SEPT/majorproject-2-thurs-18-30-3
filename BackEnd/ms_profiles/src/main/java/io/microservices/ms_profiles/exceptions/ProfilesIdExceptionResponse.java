package io.microservices.ms_profiles.exceptions;

public class ProfilesIdExceptionResponse {
    private String profileUsername;

    public ProfilesIdExceptionResponse(String username) { this.profileUsername = username; }

    public String getProfileUsername() {
        return profileUsername;
    }

    public void setProfileUsername(String profileUsername) {
        this.profileUsername = profileUsername;
    }
}
