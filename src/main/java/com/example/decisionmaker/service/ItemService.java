package com.example.decisionmaker.service;

import com.example.decisionmaker.entity.Item;
import com.example.decisionmaker.repository.GroupRepository;
import com.example.decisionmaker.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class ItemService {
    @Autowired
    private ItemRepository repository;

    @Autowired
    private GroupRepository groupRepository;

    public Item create(Item item) {
        if(item.getGroup().getId() != null && groupRepository.existsById(item.getGroup().getId())) {
            return repository.save(item);
        }
        groupRepository.save(item.getGroup());
        return repository.save(item);
    }

    public List<Item> getAll() {
        return repository.findAllWithGroup();
    }

    public List<Item> getAllById(Integer id) {
        return repository.findAllWithParentId(Collections.singletonList(id));
    }
}
