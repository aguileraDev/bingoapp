package com.sofka.bingo.services;

import com.sofka.bingo.domain.Record;
import com.sofka.bingo.domain.Game;
import com.sofka.bingo.domain.Result;
import com.sofka.bingo.repository.RecordsRepository;
import com.sofka.bingo.repository.GameRepository;
import com.sofka.bingo.repository.ResultsRepository;
import com.sofka.bingo.services.interfaces.Bingo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.time.Instant;
import java.util.List;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Collections;
import java.util.Optional;
import java.util.Arrays;



/**
 * @author Manuel Aguilera / @aguileradev
 */
@Service
public class BingoService implements Bingo {


    // Inyectando las dependencias de la clase.
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private RecordsRepository recordsRepository;

    @Autowired
    private ResultsRepository resultsRepository;

    @Autowired
    private GameRepository gameRepository;

    /**
     * La función guarda un juego en la base de datos.
     * se establece la fecha del juego en el momento actual mediante la llamada al método Instant.now().
     * Luego, se establece el estado de juego en activo y no terminado.
     * Por último, se guarda el objeto Game en la base de datos y se devuelve el objeto guardado.
     * @param game El objeto del juego que se está guardando.
     * @return Juego
     */
    @Override
    @Transactional
    public Game save(Game game) {
        game.setGameDate(Instant.now());
        game.setActive(true);
        game.setWinner(false);
        game.setFinished(false);
        return gameRepository.save(game);
    }

    /**
     * Devuelve una lista de todos los juegos en la base de datos.
     *
     * @return Una lista de todos los juegos en la base de datos.
     */
    @Override
    @Transactional
    public List<Game> getAll(){
        return (List<Game>) gameRepository.findAll();
    }
    /**
     * Esta función genera una lista de números del 1 al 75, luego divide la lista en 5 columnas
     * luego agrega los números de cada columna a una nueva lista de forma ordenada para un carton
     * de bingo de 25 espacios y por ultimo guarda la nueva lista en la base de datos.
     *
     * @param record el objeto que se pasa desde el controlador
     * @return Una lista de registros.
     */
    @Override
    @Transactional
    public List<Record> saveAll(Record record) {
        int temp = 0;

        List<Integer> columnB = new ArrayList<>();
        List<Integer> columnI = new ArrayList<>();
        List<Integer> columnN = new ArrayList<>();
        List<Integer> columnG = new ArrayList<>();
        List<Integer> columnO = new ArrayList<>();
        List<Integer> allDataColumns = new ArrayList<>();

        List<Record> cardboard = new ArrayList<>();

        columnB = generateColumn(1, 15);
        columnI = generateColumn(16, 30);
        columnN = generateColumn(31, 45);
        columnG = generateColumn(46, 60);
        columnO = generateColumn(61, 75);

        for (int i = 0; i < 5; i++) {
           allDataColumns.add(columnB.get(i));
           allDataColumns.add(columnI.get(i));
           allDataColumns.add(columnN.get(i));
           allDataColumns.add(columnG.get(i));
           allDataColumns.add(columnO.get(i));

        }

        for (int num : allDataColumns) {
            Record valid = new Record(record.getGame(), num);
            cardboard.add(valid);
        }

        return (List<Record>) recordsRepository.saveAll(cardboard);

    }
    /**
     * Genera una lista de 5 números aleatorios entre los valores mínimo y máximo dados
     * y asegura que la lista no contenga duplicados
     *
     * @param numberMin El número mínimo que se puede generar.
     * @param numberMax El número máximo que se puede generar.
     * @return Una lista de 5 enteros aleatorios entre los valores mínimo y máximo.
     */
    public List<Integer> generateColumn(int numberMin, int numberMax) {
        int temp = 0;

        HashSet<Integer> values = new HashSet<>();
        for (int i = 0; i < 5; i++) {
            temp = (int) (Math.random() * (numberMax + 1 - numberMin)) + numberMin;
            values.add(temp);
            if (i == 4 && values.size() != 5) {
                i--;
            }
        }

        return values.stream().toList();
    }
    /**
     * Toma una lista de registros o fichas y devuelve una lista de enteros
     *
     * @param id la identificación del juego
     * @return Una lista de números enteros
     */
    @Override
    @Transactional
    public List<Record> findAllByGame(Integer id) {
        List<Record> allData = recordsRepository.findAllByGame(id);

        return allData;

    }

    /**
     * La función guarda un valor como ficha de resultado para un juego en la base de datos.
     *
     * @param result El objeto de resultado que se está guardando.
     * @return Un objeto de resultado
     */
    @Override
    @Transactional
    public Result save(Result result) {
        result.setResultDate(Instant.now());
        return resultsRepository.save(result);
    }

    /**
     * Devuelve una lista de fichas o resultados para un juego determinado.
     *
     * @param id la identificación del juego
     * @return Una lista de resultados.
     */
    @Override
    @Transactional
    public List<Result> findResultsByGame(Integer id) {
        Optional<List<Result>> results = resultsRepository.findResultsByGame(id);

        return results.orElse(Collections.emptyList());

    }

    /**
     * Si el juego existe, establezca el ganador en verdadero y guarde el juego.
     *
     * @param id El id del juego que quieres actualizar.
     * @return Un objeto de juego
     */
    @Override
    @Transactional
    public Game won(Integer id) {
        Optional<Game> game = gameRepository.findById(id);
        if (game.isEmpty()) {
            return null;
        }
        game.get().setWinner(true);
        return gameRepository.save(game.get());
    }
    /**
     * Finaliza un juego
     * Si el juego existe, configúralo como terminado e inactivo, y guárdalo.
     *
     * @param id El id del juego para terminar.
     * @return Juego
     */

    @Override
    @Transactional
    public Game finish(Integer id) {
        Optional<Game> game = gameRepository.findById(id);
        if (game.isEmpty()) {
            return null;
        }
        game.get().setFinished(true);
        game.get().setActive(false);
        return gameRepository.save(game.get());
    }

    /**
     * Llama al servicio de usuario en Node.js para obtener el usuario por id.
     *
     * @param id El id del usuario que desea recuperar en formato string
     * @return Una cadena JSON
     */
    @Override
    @Transactional
    public String getUserById(String id) {
        String uri = String.format("http://localhost:9091/api/1.0/findBy/id/%s", id);
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<String>(headers);
        return restTemplate.exchange(uri, HttpMethod.GET, entity, String.class).getBody();
    }

    /**
     * Realiza una solicitud GET al servicio de usuario en Node.js,
     * pasa la dirección de correo electrónico como una variable de ruta
     * y devuelve el cuerpo de la respuesta como un json en formato Response.
     *
     * @param email El email del usuario que quieres encontrar
     * @return Un JSON
     */
    @Override
    @Transactional
    public String getUserByEmail(String email) {
        String uri = String.format("http://localhost:9091/api/1.0/findBy/email/%s", email);
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<String>(headers);

        return restTemplate.exchange(uri, HttpMethod.GET, entity, String.class).getBody();
    }
}
