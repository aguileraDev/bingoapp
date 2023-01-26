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

/**
 * @author Manuel Aguilera
 */
@Data
@Entity
@Table(name = "fichas")
public class Record implements Serializable {

    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ficha")
    private Integer tokenId;

    @Column( name = "valor")
    private Integer value;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_juego")
    private Game game;

    public Record(){

    }
    public Record(Game game, Integer value) {
        this.value = value;
        this.game = game;
    }
}
