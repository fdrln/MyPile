package com.mypile.backend.controller;

import com.mypile.backend.entities.*;
import com.mypile.backend.service.PileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pile")
public class PileController {

    @Autowired
    private PileService pileService;

    @GetMapping("/{category}")
    public List<? extends BasePileItem> getAll(@PathVariable String category) {
        return pileService.getAll(category);
    }

    @PostMapping("/movies")
    public BasePileItem addMovie(@RequestBody MoviePileItem item) {
        return pileService.addMovie(item);
    }

    @PostMapping("/tv")
    public BasePileItem addTV(@RequestBody TVPileItem item) {
        return pileService.addTV(item);
    }

    @PostMapping("/games")
    public BasePileItem addGame(@RequestBody GamePileItem item) {
        return pileService.addGame(item);
    }

    @PostMapping("/books")
    public BasePileItem addBook(@RequestBody BookPileItem item) {
        return pileService.addBook(item);
    }

    @DeleteMapping("/{category}/{id}")
    public void delete(@PathVariable String category, @PathVariable Long id) {
        pileService.delete(category, id);
    }
}