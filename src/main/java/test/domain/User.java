package test.domain;

import java.math.BigDecimal;

public class User {
    private BigDecimal id;

    private String userName;

    private String password;

    private BigDecimal age;

    public BigDecimal getId() {
        return id;
    }

    public void setId(BigDecimal id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public BigDecimal getAge() {
        return age;
    }

    public void setAge(BigDecimal age) {
        this.age = age;
    }
}