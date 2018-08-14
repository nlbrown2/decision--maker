package com.example.decisionmaker.repository;

import com.example.decisionmaker.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    @Query("SELECT item FROM Item item JOIN FETCH item.group")
    List<Item> findAllWithGroup();

    @Query("SELECT item FROM Item item JOIN FETCH item.group JOIN FETCH item.parent WHERE item.parentId = :ids")
    List<Item> findAllWithParentId(@Param("ids") List<Integer> ids);
}
