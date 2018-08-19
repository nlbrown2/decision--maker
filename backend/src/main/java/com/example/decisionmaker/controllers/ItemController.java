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
import java.util.Optional;

@RestController
//@CrossOrigin //TODO: fix this
public class ItemController {
    @Autowired
    private ItemService itemService;

//    @GetMapping("/list")
//    @ResponseBody
//    @ResponseStatus(HttpStatus.OK)
//    @JsonView(Views.Public.class)
//    List<Item> getAll() {
//        List<Item> all = itemService.getAll();
//        return all;
//    }

    @PostMapping("/create")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    Item create(@RequestBody Item item) {
        return itemService.create(item);
    }

    @GetMapping(value = {"/list", "/list/{id}"})
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    @JsonView(Views.Private.class)
    List<Item> getAllByParentId(@PathVariable("id") Optional<Integer> id) {
        Integer result = id.isPresent() ? id.get() : null;
        List<Item> resultList = itemService.getAllById(result);
        return  resultList == null ? new ArrayList<>() : resultList;
    }
}
