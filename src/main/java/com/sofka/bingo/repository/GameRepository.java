package com.sofka.bingo.repository;

import com.sofka.bingo.domain.Game;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Manuel Aguilera
 */
@Repository
public interface GameRepository extends CrudRepository<Game, Integer> {
}
