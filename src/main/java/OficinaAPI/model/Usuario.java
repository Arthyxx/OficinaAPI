package OficinaAPI.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "usuarios")
public class Usuario implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 50)
    private String password;

    @JsonProperty("number_phone")
    @Column(name = "number_phone", nullable = false, length = 11)
    private String numberPhone;

    @Column(nullable = false)
    private String type;

    public Usuario() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNumberPhone() {
        return numberPhone;
    }

    public void setNumberPhone(String numberPhone) {
        this.numberPhone = numberPhone;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Usuario usuario = (Usuario) o;
        return Objects.equals(getId(), usuario.getId()) && Objects.equals(getName(), usuario.getName()) && Objects.equals(getPassword(), usuario.getPassword()) && Objects.equals(getNumberPhone(), usuario.getNumberPhone()) && Objects.equals(getType(), usuario.getType());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getPassword(), getNumberPhone(), getType());
    }
}
