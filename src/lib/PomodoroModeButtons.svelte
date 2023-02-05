<script lang="ts">
  import {onDestroy} from "svelte";
  import {subscribe, setPomodoro} from "$lib/store";

  let currentMode: "POMODORO" | "SHORT_BREAK" | "LONG_BREAK";
  const unsubscribe = subscribe((state) => {
    currentMode = state.mode;
  });
  onDestroy(unsubscribe);

</script>

<div>
  <button 
    class:active={currentMode === "POMODORO"}
    on:click={() => setPomodoro("POMODORO")}
  >
    Pomodoro
  </button>
  <button 
    class:active={currentMode === "SHORT_BREAK"}
    on:click={() => setPomodoro("SHORT_BREAK")}
  >
    Short Break
  </button>
  <button 
    class:active={currentMode === "LONG_BREAK"}
    on:click={() => setPomodoro("LONG_BREAK")}
  >
    Long Break
  </button>
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  button {
    border: 2px solid #ff0057;
    border-radius: 9999px;
    padding: 8px 16px;
    font-weight: 300;
    font-size: 16px;
    font-family: "Ubuntu", sans-serif;
    cursor: pointer;
    color: #ff0057;
    background-color: rgba(255, 0, 87, 0.1);
    transition: all 100ms linear;
  }
  button:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px 0 rgba(255, 0, 87, 0.2);
  }
  button.active {
    background-color: #ff0057;
    color: #fff;
  }
</style>
