package com.sofka.bingo.repository;

import com.sofka.bingo.domain.Record;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * @author Manuel Aguilera
 */
@Repository
public interface RecordsRepository extends CrudRepository<Record, Integer> {

    /**
     * Esta función devuelve una lista de fichas que están asociados con un juego
     *
     * @param id la identificación del juego
     * @return Una lista de fichas que están asociados con un juego.
     */
    @Query(value = "SELECT r FROM Record r WHERE game.gameId=:id")
    List<Record> findAllByGame(
            @Param("id") Integer id);
}
