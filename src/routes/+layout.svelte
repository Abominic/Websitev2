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
  #content-box {
    margin: auto;
    display: flex;
    justify-content: center;
  }

  :global(body) {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  :global(a) {
    text-decoration: underline 2px;
  }

  :global(a:visited) {
    color: inherit;
  }
</style>

<a href="/"><h1>Dom's Website</h1></a>
<div id="content-box"><slot></slot></div>