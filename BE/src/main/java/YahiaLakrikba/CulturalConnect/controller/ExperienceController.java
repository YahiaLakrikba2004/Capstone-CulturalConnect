package YahiaLakrikba.CulturalConnect.controller;

import YahiaLakrikba.CulturalConnect.entities.Experience;
import YahiaLakrikba.CulturalConnect.services.ExperienceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/experiences")
public class ExperienceController {
    private ExperienceService experienceService;

    @GetMapping
    public List<Experience> getAllExperiences() {
        return experienceService.getAllExperiences();
    }

    @GetMapping("/{id}")
    public Experience getExperiencesById(@PathVariable Long id) {
        return experienceService.getExperienceById(id);
    }

    @PostMapping
    public Experience createExperience(@RequestBody Experience experience) {
        return experienceService.saveExperience(experience);
    }

    @DeleteMapping("/{id}")
    public void deleteExperience(@PathVariable Long id) {
        experienceService.deleteExperience(id);
    }
}

