package com.mypile.backend.controller;

import com.mypile.backend.entities.BasePileItem;
import com.mypile.backend.entities.MoviePileItem;
import com.mypile.backend.entities.TVPileItem;
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

    @DeleteMapping("/{category}/{id}")
    public void delete(@PathVariable String category, @PathVariable Long id) {
        pileService.delete(category, id);
    }
}