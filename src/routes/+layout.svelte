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

</style>

<div id="content-box"><slot></slot></div>