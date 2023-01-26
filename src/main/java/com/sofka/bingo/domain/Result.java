package com.sofka.bingo.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import lombok.Data;

import java.io.Serializable;
import java.time.Instant;

/**
 * @author Manuel Aguilera
 */

@Data
@Entity
@Table(name = "resultados")
public class Result implements Serializable {

    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_resultado")
    private Integer resultID;

    @Column(name = "valor")
    private Integer value;

    @Column(name = "fecha")
    private Instant resultDate;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_juego")
    private Game game;
}
