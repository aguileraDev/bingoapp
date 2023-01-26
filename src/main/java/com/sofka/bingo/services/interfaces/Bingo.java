package com.sofka.bingo.services.interfaces;

import com.sofka.bingo.domain.Record;
import com.sofka.bingo.domain.Game;
import com.sofka.bingo.domain.Result;

import java.util.List;

/**
 * @author Manuel Aguilera / @aguileradev
 */
public interface Bingo {

    // La interfaz del servicio.
    public List<Record> saveAll(Record record);
    public List<Game> getAll();

    public Result save(Result result);

    public Game finish(Integer id);

    public Game won(Integer id);
    public List<Result> findResultsByGame(Integer id);

    public List<Record> findAllByGame(Integer gameId);

    public Game save(Game game);

    public String getUserById(String id);

    public String getUserByEmail(String email);

}
