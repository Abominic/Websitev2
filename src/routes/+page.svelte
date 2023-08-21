<script>
  const SQUARESTACK_LINK = "/squarestack";
  const FLAGGAME_LINK = "/flaggame";
  const DOMCRAFT_LINK = "https://github.com/Abominic/Domcraft";
</script>

<svelte:head>
  <meta name="description" content="Dom's personal website."/>
  <meta name="keywords" content="Abominic">
  <meta name="author" content="Dominic Munn">
  <title>Dom's Website</title>
</svelte:head>

<style>
  .italic {
    font-style: italic;
  }

  img {
    max-height: 30em;
  }

  .link {
    display: inline-block;
    border: 2px solid black;
    border-radius: 5px;
    margin: .5em;
  }

  :global(body.dark) .link {
    border: 2px solid white;
  }
</style>

<div class="home-page">
  <h2>Home</h2>
  <p>This is my place where I occasionally post my recent projects (big and small) as well as other things. There's more content coming soon now that I've finished university...</p>

  <h3>Stack the Squares</h3>
  A clone of a <span class="italic">certain</span> game written using Svelte. Only works with a keyboard (for now).
  [<a href={SQUARESTACK_LINK}>Game</a>]
  [<a href="https://github.com/Abominic/Websitev2">GitHub</a>]
  <br>
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <a href={SQUARESTACK_LINK} class="link"><img src="/screenshots/ssdemo.png" alt="SquareStack demo image."/></a>

  <h3>Flag Game</h3>
  Guess the flag.
  [<a href={FLAGGAME_LINK}>Game</a>]
  [<a href="https://github.com/Abominic/Websitev2">GitHub</a>]
  <br>
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <a href={FLAGGAME_LINK} class="link"><img src="/screenshots/flaggame.png" alt="Flag Game demo image."/></a>

  <h3>Domcraft</h3>
  <p>Proceduraly-generated (with multithreading) voxel engine (Minecraft-like) written in Rust. It will melt your laptop.</p>
  [<a href={DOMCRAFT_LINK}>GitHub</a>]
  <br>
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <a href={DOMCRAFT_LINK} class="link"><img src="/screenshots/domcraft.png" alt="Domcraft preview image."/></a>
</div>