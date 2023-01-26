package com.sofka.bingo.controller;

import com.sofka.bingo.services.BingoService;
import com.sofka.bingo.utility.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;


/**
 * @author Manuel Aguilera
 */
@RestController
@CrossOrigin
@RequestMapping("/bingo/users")
public class UsersController {
    @Autowired
    private Response response;

    @Autowired
    private BingoService bingoService;



    @GetMapping(path = "/id/{id}")
    @Operation(summary = "Get user by id",
            description = "this operation connect with node js bingo users api for the query")
    @Parameter(description = "An Object Id", required = true, example = "63a8eb1fbd3258c58f326f2d")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ok",
                            content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Response.class))
            ),
            @ApiResponse(responseCode = "404", description = "Not Found",
                            content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Response.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                            content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Response.class)))
    })
    public String getById(
            @PathVariable("id") String id){
        return bingoService.getUserById(id);
    }

    @GetMapping(path = "/email/{email_address}")
    @Operation(summary = "Get user by email address",
            description = "this operation connect with node js bingo users api for the query")
    @Parameter(description = "An Email", required = true, example = "mail@example.com")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ok",
                            content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Response.class))
            ),
            @ApiResponse(responseCode = "404", description = "Not Found",
                            content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Response.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                            content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Response.class)))

    })
    public String getUserByEmail(
            @PathVariable("email_address") String email){
       return bingoService.getUserByEmail(email);
    }
}
