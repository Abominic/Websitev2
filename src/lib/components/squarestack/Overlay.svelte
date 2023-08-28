<script>
  
</script>

<style>
  .overlay-main {
    background-color: #7f7f7fbf;
    width: 100%;
    height: 100vh;
    z-index: 2;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
  }

  .overlay-inner {
    margin: auto;
    padding: 30px;
    background-color: #3f3f3f;
    color: white;
    width: 15em;
    border-radius: 5px;
  }
</style>

<div class="overlay-main">
  <div></div>
  <div class="overlay-inner">
    <slot/>
  </div>
  <div></div>
</div>