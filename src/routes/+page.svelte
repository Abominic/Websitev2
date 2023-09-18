<script>
	import Navbar from "$lib/components/Navbar.svelte";
import Stars from "$lib/components/Stars.svelte";

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

  /* img {
    max-height: 30em;
    max-width: 100%;
  }

  .link {
    display: inline-block;
    border: 2px solid black;
    border-radius: 5px;
    margin: .5em;
  }

  :global(body.dark) .link {
    border: 2px solid white;
  } */

  .welcome {
    overflow: auto;
    width: 100%;
    height: 100vh;
    background-color: black;
    color: white;
    position: relative
  }

  .welcome-stars, .welcome-navbar, .welcome-title {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .welcome-stars {
    overflow:hidden;
  }

  .header {
    text-align: center;
  }

  .welcome-title {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
  }

  .welcome-title-inner {
    text-align: center;
  }

  .welcome-title-inner > h1 {
    font-size: 5em;
  }

  /* Shamelessly stolen from https://stackoverflow.com/questions/56418763/creating-the-perfect-rainbow-gradient-in-css*/
  .rainbow-box {
    background: linear-gradient(
      90deg,
      rgba(255, 0, 0, 1) 0%,
      rgba(255, 154, 0, 1) 10%,
      rgba(208, 222, 33, 1) 20%,
      rgba(79, 220, 74, 1) 30%,
      rgba(63, 218, 216, 1) 40%,
      rgba(47, 201, 226, 1) 50%,
      rgba(28, 127, 238, 1) 60%,
      rgba(95, 21, 242, 1) 70%,
      rgba(186, 12, 248, 1) 80%,
      rgba(251, 7, 217, 1) 90%,
      rgba(255, 0, 0, 1) 100%
    );
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }

  .section {
    width: 100%;
  }

  .project-list {
    display: flex;
    flex-wrap: wrap;
  }

  .project {
    flex: 1;
    min-width: min(650px, calc(100% - 2em)); /* Includes the margin amount. */
    height: 450px;
    padding: 3em;
    margin:1em;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .projlink {
    display: inline-block;
    text-decoration: none;
    padding: 1em;
    background-color: white;
    color: black;
    border-radius: 5px;
  }

  #squarestack {
    background-image: linear-gradient(35deg, rgba(0,255,255, 0.75), rgba(0,0,255,0.75)), url("/screenshots/ssdemo.png");
  }

  #flaggame {
    background-image: linear-gradient(35deg, rgba(255, 63, 0, 0.75), rgba(255,255, 0,0.75)), url("/screenshots/flaggame.png");
  }

  #domcraft {
    background-image: linear-gradient(35deg, rgba(0, 255, 255, 0.75), rgba(255,255, 0,0.75)), url("/screenshots/domcraft.png");
  }
</style>
<div>
  <div class="welcome">
    <div class="welcome-stars">
      <Stars width="100%" height="100vh"></Stars>
    </div>
    <div class="welcome-title">
      <div class="welcome-title-inner">
      <h1 class="rainbow-box">Dom's Website</h1>
      <p>This is my place where I occasionally post my recent projects (big and small) as well as other things that I find interesting...</p>
      </div>
    </div>
    <div class="welcome-navbar">
      <Navbar transparent></Navbar>
    </div>
  </div>
  <div class="header" id="about">
    <h2>About Me</h2>
  </div>
  <div class="section">
    <p>My name is Dom and I have recently graduated from university with a degree in Computer Science!</p>
  </div>

  <div class="header" id="projects">
    <h2>Projects</h2>
  </div>
  <div class="section project-list">
    <div class="project" id="squarestack">
      <h3>Stack the Squares</h3>
      <p>A clone of a <span class="italic">certain</span> game written using Svelte. Only works with a keyboard (for now).</p>
      <br>
      <a href={SQUARESTACK_LINK} class="projlink">Game</a>
      <a href="https://github.com/Abominic/Websitev2" class="projlink">GitHub</a>
    </div>
    <div class="project" id="flaggame">
      <h3>Flag Game</h3>
      <p>A simple flag-guessing game, written for the purpose of learning more about web development.</p>
      <br>
      <a href={FLAGGAME_LINK} class="projlink">Game</a>
      <a href="https://github.com/Abominic/Websitev2" class="projlink">GitHub</a>
    </div>
    <div class="project" id="domcraft">
      <h3>Domcraft</h3>
      <p>Proceduraly-generated (with multithreading) voxel engine (Minecraft-like) written in Rust. It will melt your laptop.</p>
      <br>
      <a href={DOMCRAFT_LINK} class="projlink">GitHub</a>
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <!-- <a href={DOMCRAFT_LINK} class="link"><img src="/screenshots/domcraft.png" alt="Domcraft preview image."/></a> -->
    </div>
  </div>
</div>