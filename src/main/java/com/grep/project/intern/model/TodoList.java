package com.grep.project.intern.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "todoList")
public class TodoList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NonNull
    private String title;

    @NonNull
    private String content;

    @NonNull
    private int sequence;

    @NonNull
    private Date dueDate;

    @NonNull
    private boolean done;

    @Builder
    public TodoList(String title, String content, int sequence, Date dueDate) {
        this.title = title;
        this.content = content;
        this.sequence = sequence;
        this.done = false;
        this.dueDate = dueDate;
    }

    @Override
    public String toString() {
        return "ID = " + id + ", title = " + title;
    }
}
