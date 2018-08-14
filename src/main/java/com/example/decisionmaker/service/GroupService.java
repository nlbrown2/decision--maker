package com.example.decisionmaker.service;

import com.example.decisionmaker.entity.Group;
import com.example.decisionmaker.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {
    @Autowired
    private GroupRepository repository;

    public Group getById(Integer id) {
        return repository.getOne(id);
    }

    public List<Group> getAll() {
        return repository.findAll();
    }
}
