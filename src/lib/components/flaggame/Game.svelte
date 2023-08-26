<script lang="ts">
	import CountrySearch from "./CountrySearch.svelte";
  import MultipleChoice from "./MultipleChoice.svelte";
  import { genCountry, type Country, Difficulty, genCountryEasy, type FlagResult } from "./flaggame";

  export let diff: Difficulty;
  export let numGames: number;
  export let end: (res: FlagResult[])=>void;

  let results: FlagResult[] = [];
  let country: Country;

  function randomCountry(): Country {
    let tempCountry: Country;
    do {
      tempCountry = (diff===Difficulty.EASY)?genCountryEasy():genCountry();
    } while (results.some(c => c.ans === tempCountry) || tempCountry===country);

    return tempCountry;
  }

  country = randomCountry();
  let nextCountry = randomCountry();
  
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
    results = [...results, {
      usr: c,
      ans: country
    }];

    if (results.length === numGames) {
      end(results);
    }

    country = nextCountry;
    nextCountry = randomCountry();
  }  
</script>

<style>
  .game {
    width: 15em;
  }

  .preload-img {
    display: none;
  }
</style>

<div class="game">
  <h3>What flag is this?</h3>
  <p>Question {results.length+1}/{numGames}</p>
  <img class="flag-image" src="/flags/{country.code}.svg" alt="some country" placeholder="loading..."/>
  <img class="preload-img" src="/flags/{nextCountry.code}.svg" alt="preload"/>
  {#if diff <= Difficulty.MEDIUM}
    <MultipleChoice {country} easy={diff===Difficulty.EASY} num={numOptions} on:choice={e=>countryGuess(e.detail)}/>
  {:else}
    <CountrySearch on:choice={e=>countryGuess(e.detail)}/>
  {/if}
</div>
