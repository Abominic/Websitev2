<style>
  .flexbox-test {
    width: 100%;
    display: flex;
    background-color: white;
    flex-wrap: wrap;
  }

  .item {
    min-width: 500px;
    height: 250px;
    flex: 1;
  }

  .item:nth-of-type(1) {
    background-color: #ff7f7f;
  }

  .item:nth-of-type(2) {
    background-color: greenyellow;
  }

  .item:nth-of-type(3) {
    background-color: aqua;
  }
</style>

<div class="flexbox-test">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>