package com.example.decisionmaker.entity;

import com.example.decisionmaker.Views;
import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;

@Entity
@Table(name = "items")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonView(Views.Public.class)
    private Integer id;

    @JsonView(Views.Public.class)
    @Column(name = "name")
    private String name;

    @JsonView(Views.Private.class)
    @Column(name = "parent")
    private Integer parentId;

//    @JsonBackReference
//    @JsonView(Views.Public.class)
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "group_id", referencedColumnName = "id")
//    private Group group;

    @JsonIgnore
    @JoinColumn(name="parent", referencedColumnName="id", insertable = false, updatable = false)
    @ManyToOne(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
    private Item parent;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

//    public Group getGroup() {
//        return group;
//    }
//
//    public void setGroup(Group group) {
//        this.group = group;
//    }

    public Item getParent() {
        return parent;
    }

    public void setParent(Item parent) {
        this.parent = parent;
    }
}
