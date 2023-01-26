package com.sofka.bingo.controller;

import com.sofka.bingo.domain.Record;
import com.sofka.bingo.domain.Game;
import com.sofka.bingo.domain.Result;
import com.sofka.bingo.services.BingoService;
import com.sofka.bingo.utility.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


/**
 * @author Manuel Aguilera / @aguileradev
 */
@RestController
@CrossOrigin
@RequestMapping("/bingo")
public class GameController {

    // Inyección de dependencias
    @Autowired
    private Response response;

    @Autowired
    private BingoService bingoService;

    @GetMapping(path = "/all")
    @Operation(summary = "Get all game data")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "500", description = "Internal server error")

    })
    public ResponseEntity<Response> getAll() {
        response.restart();
        try {
            response.data = bingoService.getAll();
        } catch (DataAccessException accessDataException) {
            response.error = true;
            response.data = null;
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(path = "/new")
    @Operation(summary = "Create a new game" ,
               description = "need a playerId on the body for example playerId: 63a8eb1fbd3258c58f326f2d")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Created"),
            @ApiResponse(responseCode = "500", description = "Internal server error")

    })
    public ResponseEntity<Response> newGame(@RequestBody Game game) {

        response.restart();
        try {

            response.data = bingoService.save(game);
        } catch (DataAccessException accessDataException) {
            response.error = true;
            response.data = null;
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping(path = "/cardboard/game/all/{id}")
    @Operation(summary = "Get all tokens or records by game id")
    @Parameter(description = "Game id", required = true, example = "1")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "500", description = "Internal server error")

    })
    public ResponseEntity<Response> getAllRecordsByGame(
            @PathVariable("id") Integer id) {
        response.restart();
        try {
            response.data = bingoService.findAllByGame(id);

        } catch (DataAccessException accessDataException) {
            response.error = true;
            response.data = null;
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(path = "/cardboard/game")
    @Operation(summary = "Create a random cardboard for a game according to the id" ,
               description = "example {game: {gameId: 1} }")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "500", description = "Internal server error")

    })
    public ResponseEntity<Response> generateCardboard(@RequestBody Record record) {
        response.restart();
        try {
            response.data = bingoService.saveAll(record);

        } catch (DataAccessException accessDataException) {
            response.error = true;
            response.data = null;
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(path = "/result/save")
    @Operation(summary = "saves a numeric value as a result linked to a game id",
            description = "game in json format {game: {gameId: 1}, value: 25 }" )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "500", description = "Internal server error")

    })
    public ResponseEntity<Response> saveResult(@RequestBody Result result) {
        response.restart();
        try {
            response.data = bingoService.save(result);

        } catch (DataAccessException accessDataException) {
            response.error = true;
            response.data = null;
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "/result/game/{id}")
    @Operation(summary = "Get all results for a game by the id")
    @Parameter(description = "A game id and body on json format", required = true, example = "{game: {gameId: 1} }")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "500", description = "Internal server error")

    })
    public ResponseEntity<Response> getResultsByGame(
            @PathVariable("id") Integer id) {
        response.restart();
        try {
            response.data = bingoService.findResultsByGame(id);

        } catch (DataAccessException accessDataException) {
            response.error = true;
            response.data = null;
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping(path = "/game/{id}/winner")
    @Operation(summary = "Change winner status")
    @Parameter(description = "A game ID to mark the user's win", required = true, example = "1")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "500", description = "Internal server error")

    })
    public ResponseEntity<Response> wonGame(
            @PathVariable("id") Integer id) {
        response.restart();
        try {
            response.data = bingoService.won(id);

        } catch (DataAccessException accessDataException) {
            response.error = true;
            response.data = null;
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping(path = "/game/{id}/finish")
    @Operation(summary = "Finish a game")
    @Parameter(description = "A game id for finish", required = true, example = "1")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "500", description = "Internal server error")

    })
    public ResponseEntity<Response> finishGame(
            @PathVariable("id") Integer id) {
        response.restart();
        try {
            response.data = bingoService.finish(id);

        } catch (DataAccessException accessDataException) {
            response.error = true;
            response.data = null;
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
