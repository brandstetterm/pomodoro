<script lang="ts">
  const POMODORO_TIME = 30 * 60;
  const SHORT_BREAK_TIME = 10 * 60;
  const LONG_BREAK_TIME = 30 * 60;

  const padWithZeros = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${padWithZeros(minutes)}:${padWithZeros(seconds)}`;
  };
  let time = POMODORO_TIME;
  let active = false;
  let currentDuration = POMODORO_TIME;
  let interval: NodeJS.Timer | undefined;

  const startTimer = () => {
    if (!interval) {
      active = true;
      interval = setInterval(() => {
        time--;
        if (time === 0) {
          completeTimer();
        }
      }, 1000);
    }
  };

  const completeTimer = () => {
    active = false;
    clearInterval(interval);
    interval = undefined;
  };

  const setTimer = (newTime: number) => {
    active = false;
    clearInterval(interval);
    interval = undefined;
    time = newTime;
    currentDuration = newTime;
  };

  const cancelTimer = () => {
    setTimer(currentDuration);
  };
</script>

<svelte:head>
  <title>{formatTime(time)} | Pomodoro</title>
</svelte:head>

<div>
  <button on:click={() => setTimer(POMODORO_TIME)}>Pomodoro</button>
  <button on:click={() => setTimer(SHORT_BREAK_TIME)}>Short Break</button>
  <button on:click={() => setTimer(LONG_BREAK_TIME)}>Long Break</button>
</div>

<time>{formatTime(time)}</time>

<div>
  <button on:click={() => active ? cancelTimer() : startTimer()}>{active ? "Cancel" : "Start"}</button>
</div>

<style>
  button {
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    background: #fff;
    cursor: pointer;
  }

  time {
    font-size: 3rem;
    font-weight: bold;
  }
</style>

