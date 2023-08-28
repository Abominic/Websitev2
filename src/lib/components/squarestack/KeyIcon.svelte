<style>
  .key-button {
    background-color: lightgray;
    box-shadow: 0px 3px #7f7f7f;
    color: black;
    border-radius: 5px;
    width: 1.5em;
    height: 1.5em;
    display: inline-block;
    align-content: center;
    margin: 5px;
    font-weight: bold;
    text-align: center;
  }

  :global(body.dark) .key-button {
    color: white;
    background-color: gray;
    box-shadow: 0px 3px #3f3f3f;
  }
</style>

<div class="key-button">
  <slot />  
</div>