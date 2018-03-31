package com.javen.model;

public class User {
    private String id;

    private String userName;

    private String pictureId;

    private Integer age;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    public String getPictureId() {
        return pictureId;
    }

    public void setPictureId(String password) {
        this.pictureId = pictureId == null ? null : pictureId.trim();
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", userName=" + userName + ", pictureId="
                + pictureId + ", age=" + age + "]";
    }
    
    
}