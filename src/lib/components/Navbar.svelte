<script lang="ts">
  export let transparent: boolean = false;
</script>

<style>
  .navbar {
    width: 100%;
    height: 3rem;
    color: black;
    background-color: white;
    text-align: right;
  }

  .navbar > * {
    margin-right: 3em;
    margin-top: auto;
    margin-bottom: auto;
    /* text-decoration: none; */
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: none;
    vertical-align: middle;
    line-height: 5rem;
    font-size: 1.5em;
  }

  :global(body.dark) .navbar {
    color: white;
    background-color: #222;
  }

  .navbar.transparent {
    background-color: transparent !important;
    /* border-bottom: 1px solid white; */
  }

  .other-logo {
    height: 1em;
  }
</style>

<div class="navbar" class:transparent>
   <a href="/#about">About Me</a>
   <a href="/#projects">Projects</a>
   <a href="https://www.github.com/Abominic/"><img src="/github-mark-white.svg" alt="GitHub logo" class="other-logo"/></a>
</div>