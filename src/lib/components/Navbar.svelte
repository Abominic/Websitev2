<script lang="ts">
	import Logo from "./Logo.svelte";

  export let transparent: boolean = false;
  export let showHome: boolean = false;
</script>

<style>
  .navbar {
    width: 100%;
    height: 5rem;
    color: black;
    background-color: white;
  }

  .navbar > * {
    margin-left: 3em;
    margin-top: auto;
    margin-bottom: auto;
    /* text-decoration: none; */
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: none;
    vertical-align: middle;
    line-height: 5rem;
    font-size: 1em;
  }

  .navbar > .right {
    margin-left: 0;
    margin-right: 3em;
    float: right;
  }

  :global(body.dark) .navbar {
    color: white;
    background-color: #222;
  }

  .navbar.transparent {
    background-color: transparent !important;
    color: white;
    /* border-bottom: 1px solid white; */
  }
</style>

<div class="navbar" class:transparent>
  {#if showHome}
    <a href="/"><Logo forceWhite={transparent} logoType="home"/></a>
  {/if}

  <a href="https://www.github.com/Dominically/"  class="right"><Logo forceWhite={transparent} logoType="github"/></a>
  <a href="/#projects" class="right">Projects</a>
  <!-- <a href="/#about" class="right">About Me</a> -->
</div>