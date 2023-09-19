<script lang="ts">
	import { browser } from "$app/environment";
	import { page } from "$app/stores";

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

  :global(h1, h2, h3, h4, h5, h6) {
    font-family: Arial, Helvetica, sans-serif;
  }

  :global(a) {
    text-decoration: underline 2px;
  }

  :global(a:visited) {
    color: inherit;
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