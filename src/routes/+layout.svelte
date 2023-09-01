<script lang="ts">
	import { browser } from "$app/environment";

  if (browser) {
    function setDarkMode(val: boolean){
      let cl = window.document.body.classList;
      if (val && !cl.contains("dark")) {
        cl.add("dark");
      } else if (!val && cl.contains("dark")) {
        cl.remove("dark");
      }
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e=>{
      setDarkMode(e.matches);
    });
  }
</script>

<style>
  /* h1 {
    text-align: center;
  }

  #content-box {
    margin: auto;
    display: flex;
    justify-content: center;
  } */

  :global(body) {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin: 0;
  }

  :global(a) {
    text-decoration: underline 2px;
  }

  :global(a:visited) {
    color: inherit;
  }

  :global(button) {
    border: 2px solid black;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }

  :global(body.dark button) {
    color: white;
    border-color: white;
    background-color: inherit;
  }

  :global(.green) {
    color: darkgreen;
    border-color: darkgreen;
  }

  :global(body.dark .green) {
    color: lightgreen;
    border-color: lightgreen;
  }

  :global(a) {
    color: inherit;
  }
</style>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>
<!-- 
<h1><a href="/">Dom's Website</a></h1> -->
<!-- <div id="content-box"><slot></slot></div> -->
<slot></slot>