import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero, Attribute } from './hero';

@Injectable()
export class InMemoryDataService implements InMemoryDataService {

  createDb() {
    const heroes = [];

    let antiMage = new Hero(1, "Anti-Mage", "Magina, the Anti-Mage", Attribute.Agility);
    antiMage.setRankedWinRates([0.4479, 0.4620, 0.4762, 0.4744, 0.4742]);
    antiMage.setFarmPriorityWinRates([0.514, 0.354, 0.242, 0.178, 0.198]);
    heroes.push(antiMage);

    let axe = new Hero(2, "Axe", "Mogul Khan, the Axe", Attribute.Strength);
    axe.setRankedWinRates([0.5341, 0.5315, 0.5247, 0.5126, 0.5154]);
    axe.setFarmPriorityWinRates([0.416, 0.495, 0.553, 0.562, 0.529]);
    heroes.push(axe);

    let bane = new Hero(3, "Bane", "Atropos, the Bane", Attribute.Intelligence);
    bane.setRankedWinRates([0.4918, 0.4983, 0.5179, 0.5253, 0.5473]);
    bane.setFarmPriorityWinRates([0.356, 0.381, 0.423, 0.496, 0.486]);
    heroes.push(bane);

    let bloodseeker = new Hero(4, "Bloodseeker", "Strygwyr, the Bloodseeker", Attribute.Agility);
    bloodseeker.setRankedWinRates([0.5292, 0.5299, 0.5185, 0.5200, 0.4996]);
    bloodseeker.setFarmPriorityWinRates([0.534, 0.515, 0.496, 0.471, 0.426]);
    heroes.push(bloodseeker);

    let crystalMaiden = new Hero(5, "Crystal Maiden", "Rylai, the Crystal Maiden", Attribute.Intelligence);
    crystalMaiden.setRankedWinRates([0.5585, 0.5395, 0.5267, 0.5205, 0.5026]);
    crystalMaiden.setFarmPriorityWinRates([0.430, 0.433, 0.476, 0.540, 0.537]);
    heroes.push(crystalMaiden);

    return { heroes };
  }
}
