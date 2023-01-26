package com.sofka.bingo.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.OneToMany;
import jakarta.persistence.FetchType;
import jakarta.persistence.CascadeType;
import lombok.Data;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;


/**
 * @author Manuel Aguilera
 */
@Data
@Entity
@Table(name = "juego")
public class Game implements Serializable {

    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id_juego", nullable = false)
    private Integer gameId;

    @Column(name = "id_jugador", nullable = false)
    private String playerId;

    @Column(name = "ganador")
    private Boolean winner;

    @Column(name = "fecha_juego")
    private Instant gameDate;

    @Column(name = "activo")
    private Boolean active;

    @Column(name = "finalizado")
    private Boolean finished;


    @JsonManagedReference
    @OneToMany(
            mappedBy = "game",
            fetch = FetchType.EAGER,
            cascade = CascadeType.REMOVE,
            targetEntity = Record.class
    )
    private List<Record> records;

    @JsonManagedReference
    @OneToMany(
            mappedBy = "game",
            fetch = FetchType.EAGER,
            cascade = CascadeType.REMOVE,
            targetEntity = Result.class
    )
    private List<Result> results;

}
