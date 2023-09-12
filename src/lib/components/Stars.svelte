<script lang="ts">
	import { browser } from "$app/environment";
  import StarTest from "startest2";
	import { onDestroy, onMount } from "svelte";

  export let width: string;
  export let height: string;

  
  let container: HTMLDivElement;

  if (browser) {
    let app = StarTest.new(false, false, 1024.0);
    app.initControls();
    onMount(()=> {
      app.bindContainer(container);
      app.runSimulation();
    });

    onDestroy(() => {
      app.stopSimulation();
    });
  }
</script>

<div bind:this={container} class="star-container" style="width: {width}; height: {height}"></div>