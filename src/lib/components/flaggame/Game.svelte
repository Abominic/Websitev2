<script lang="ts">
	import MultipleChoice from "./MultipleChoice.svelte";
import { genCountry, type Country } from "./countries";
  import { Difficulty } from "./flaggame";

  export let diff: Difficulty;
  export let numGames: number;

  let results: FlagResult[] = [];
  interface FlagResult {
    sel: Country,
    ans: Country
  }

  let country = genCountry();
  let nextCountry = genCountry();
  
  let numOptions: number;
  switch (diff) {
    case Difficulty.EASY:
      numOptions = 4;
      break;
    case Difficulty.MEDIUM:
      numOptions = 8;
      break;
    case Difficulty.HARD:
    default:
      numOptions = 12;
  }

  function countryGuess(c: Country){
    results.push({
      sel: c,
      ans: country
    });

    //TODO end game here.
    country = nextCountry;
    nextCountry = genCountry();
  }  
</script>

<style>
  .game {
    width: 15vw;
  }
</style>

<div class="game">
  <h3>What flag is this?</h3>
  <img class="flag-image" src="/flags/{country.code}.svg" alt="some country"/>
  <MultipleChoice {country} easy={diff===Difficulty.EASY} num={numOptions} on:choice={e=>countryGuess(e.detail)}/>
</div>
