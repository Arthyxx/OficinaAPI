package OficinaAPI.service;

import OficinaAPI.model.Usuario;
import OficinaAPI.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public Usuario create(Usuario usuario){
        return repository.save(usuario);
    }

    public Usuario findById(Long id){
        Usuario entity = repository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("User not found!")
        );

        return entity;
    }

    public List<Usuario> findAll(){
        return repository.findAll();
    }
}
