<script>
  export let green = false;
  export let highlight = false;
</script>

<style>
  button {
    border: 2px solid #222;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    color: #222;
    transition: background-color .5s, color .5s;
  }

  :global(body.dark) button {
    color: white;
    border-color: white;
    background-color: #222;
  }

  .green {
    color: darkgreen;
    border-color: darkgreen;
  }

  :global(body.dark) .green {
    color: lightgreen;
    border-color: lightgreen;
  }

  .highlight {
    background-color: #222;
    color: white;
  }
  

  :global(body.dark) .highlight {
    background-color: white;
    color: #222;
  }
</style>

<button on:click class:green class:highlight><slot></slot></button>