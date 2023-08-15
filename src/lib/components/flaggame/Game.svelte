<script lang="ts">
	import { genCountry, type Country } from "./countries";
	import type { Difficulty } from "./flaggame";

  export let diff: Difficulty;
  export let numGames: number;

  let results: FlagResult[] = [];
  interface FlagResult {
    sel: Country,
    ans: Country
  }

  let country = genCountry();
  let nextCountry = genCountry();
  

  const countryGuess = (c: Country)=>{
    results.push({
      sel: c,
      ans: country
    });

    //TODO end game here.
    country = nextCountry;
    nextCountry = genCountry();
  };
</script>

<div class="game">
  <img src="/flags/{country.code}.svg" alt="some country"/>
</div>
