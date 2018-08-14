package com.example.decisionmaker.repository;

import com.example.decisionmaker.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    @Query("SELECT item FROM Item item JOIN FETCH item.group")
    List<Item> findAllWithGroup();
}
