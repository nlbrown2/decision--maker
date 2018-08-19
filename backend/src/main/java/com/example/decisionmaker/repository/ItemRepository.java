package com.example.decisionmaker.repository;

import com.example.decisionmaker.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    @Query("SELECT item FROM Item item")
    List<Item> findAllWithGroup();

    @Query("SELECT item FROM Item item WHERE item.parentId = :ids")
    List<Item> findAllWithParentId(@Param("ids") List<Integer> ids);

    @Query("SELECT item FROM Item item WHERE item.parentId IS NULL")
    List<Item> findAllRootItems();
}
