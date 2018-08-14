package com.example.decisionmaker.controllers;

import com.example.decisionmaker.Views;
import com.example.decisionmaker.entity.Item;
import com.example.decisionmaker.service.ItemService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ItemController {
    @Autowired
    private ItemService itemService;

    @GetMapping("/list")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    @JsonView(Views.Public.class)
    List<Item> getAll() {
        List<Item> all = itemService.getAll();
        return all;
    }

    @PostMapping("/create")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    Item create(@RequestBody Item item) {
        return itemService.create(item);
    }

    @GetMapping("/list/{id}")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    @JsonView(Views.Private.class)
    List<Item> getAllByParentId(@PathVariable("id") Integer id) {
        List<Item> resultList = itemService.getAllById(id);
        return  resultList == null ? new ArrayList<>() : resultList;
    }
}
