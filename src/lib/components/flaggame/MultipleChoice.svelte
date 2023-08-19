<script lang="ts">
  import { genOptions, type Country } from "./flaggame";
	import AnswerButtons from "./AnswerButtons.svelte";

  export let country: Country;
  export let num: number;
  export let easy: boolean;

  $: options = genOptions(country, num, easy);
</script>

<AnswerButtons {options} on:choice/>