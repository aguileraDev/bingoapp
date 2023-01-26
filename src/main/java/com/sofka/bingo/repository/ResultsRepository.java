package com.sofka.bingo.repository;

import com.sofka.bingo.domain.Result;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * @author Manuel Aguilera
 */
@Repository
public interface ResultsRepository extends CrudRepository<Result, Integer> {

    /**
     * Encuentre todos los resultados en los que gameId sea igual a la id pasada como parámetro.
     *
     * @param id La identificación del juego para el que desea encontrar resultados.
     * @return Una lista de resultados para un juego determinado.
     */
    @Query("SELECT r FROM Result r WHERE game.gameId=:id")
    Optional<List<Result>> findResultsByGame(
            @Param("id") Integer id
    );
}
