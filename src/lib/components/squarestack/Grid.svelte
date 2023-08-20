<script lang="ts">
	import { addBorders } from "./ssUtil";
  import "./pixels.css";

  export let width: number;
  export let height: number;
  export let colours: string; //The boolean represents whether the pixel is raised.
  export let bordered: boolean = true; //Whether to add a border to the grid or not.  

  if (colours.length !== width * height) {
    throw "Pixel grid does not correspond to size of pixel array."
  }

  let actualWidth = bordered?width+2:width;

  $: pixels = bordered?addBorders(width,height,colours):colours;
</script>

<style>
  .grid {
    display: grid;
    /* grid-auto-rows: 30px; */
    grid-auto-rows: 1.5em;
  }

  .pixel.raised {
    /* width: 20px; */
    /* height: 20px; */
    /* border-width: 5px; */
    width: 1em;
    height: 1em;
    border-width: .25em;
    border-style: solid;
  }
  
  .pixel {
    /* width: 30px; */
    /* height: 30px; */
    width: 1.5em;
    height: 1.5em;
  }
</style>

<!-- <div class="grid" style="
  grid-template-columns: repeat({actualWidth}, min-content);
  width: {30*actualWidth}px;
"> -->
<div class="grid" style="
grid-template-columns: repeat({actualWidth}, min-content);
width: {1.5*actualWidth}em;
">
  {#each pixels as px}
    <div class:raised={px!=="k"} class="{px} pixel"></div>
  {/each}
</div>


