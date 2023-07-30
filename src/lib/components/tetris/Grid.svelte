<script lang="ts">
	import { addBorders } from "./util";
  import "./pixels.css";

  export let width: number;
  export let height: number;
  export let colours: string; //The boolean represents whether the pixel is raised.
  export let bordered: boolean = true; //Whether to add a border to the grid or not.  

  if (colours.length !== width * height) {
    throw "Pixel grid does not correspond to size of pixel array."
  }

  let actualWidth = bordered?width+2:width;

  let pixels: string;
  if (bordered) {
    pixels = addBorders(width, height, colours);
  } else {
    pixels = colours;
  }

</script>

<style>
  .grid {
    display: grid;
    grid-auto-rows: 30px;
  }

  .pixel.raised {
    width: 20px;
    height: 20px;
    border-width: 5px;
    border-style: solid;
  }
  
  .pixel {
    width: 30px;
    height: 30px;
  }
</style>

<div class="grid" style="
  grid-template-columns: repeat({actualWidth}, min-content);
  width: {30*actualWidth}px;
">
  {#each pixels as px}
    <div class:raised={px!=="k"} class="{px} pixel"></div>
  {/each}
</div>


