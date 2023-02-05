<script lang="ts">
  import {onDestroy} from "svelte";
  import {subscribe, updateSettings} from "$lib/store";
  export let onClose: () => void;

  let settings: {
    pomodoroDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
  };
  const unsubscribe = subscribe((state) => {
    settings = state.settings;
  });
  onDestroy(() => {
    unsubscribe();
  });
</script>

<svelte:window on:keydown={(e) => {
  if (e.key === 'Escape') {
    onClose();
  }
}} />


<div class="modal__background" />

<div class="modal" role="dialog" aria-modal="true">
  <button class="modal__close" on:click={onClose}>
    <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
  </button>

  <div>
    <label for="settings__pomodoro-duration">Pomodoro</label>
    <input 
      id="settings__pomodoro-duration" 
      type="number"
      min="1"
      value={Math.floor(settings.pomodoroDuration / 60)}
      on:change={(e) => {
        updateSettings({
          // @ts-ignore
          pomodoroDuration: parseInt(e.target.value) * 60
        });
      }}
    />
    <label for="settings__pomodoro-duration">minutes</label>
  </div>

  <div>
    <label for="settings__short-break-duration">Short break</label>
    <input 
      id="settings__short-break-duration" 
      type="number" 
      min="1" 
      value={Math.floor(settings.shortBreakDuration / 60)} 
      on:change={(e) => {
        updateSettings({
          // @ts-ignore
          shortBreakDuration: parseInt(e.target.value) * 60
        });
      }}
    />
    <label for="settings__short-break-duration">minutes</label>
  </div>

  <div>
    <label for="settings__long-break-duration">Long break</label>
    <input 
      id="settings__long-break-duration" 
      type="number" 
      min="1" 
      value={Math.floor(settings.longBreakDuration / 60)}
      on:change={(e) => {
        updateSettings({
          // @ts-ignore
          longBreakDuration: parseInt(e.target.value) * 60
        });
      }}
    />
    <label for="settings__long-break-duration">minutes</label>
  </div>
</div>


<style>
  .modal__background {
    position: fixed;
    inset: 0;
    background-color: rgba(255, 0, 87, 0.1);
    backdrop-filter: blur(4px);
  }

  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid #ff0057;
    border-radius: 16px;
    background-color: #242c3d;
    padding: 16px;
    width: 300px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .modal__close {
    height: 36px;
    width: 36px;
    border: 2px solid #ff0057;
    border-radius: 999px;
    background-color: #242c3d;
    position: absolute;
    right: -18px;
    top: -18px;
    cursor: pointer;
    transition: all 100ms linear;
    color: #ff0057;
  }
  .modal__close:hover {
    background-color: #ff0057;
    color: #fff;
  }

  svg {
    height: 100%;
    width: 100%;
  }

  label:first-of-type {
    color: #fff;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.5px;
  }
  label:last-of-type {
    color: #D3D3D3;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0.5px;
    margin-left: 8px;
  }

  input {
    margin-top: 8px;
    margin-bottom: 8px;
    border: 1px solid #ff0057;
    border-radius: 8px;
    background-color: #242c3d;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0.5px;
    padding: 8px;
    width: 100px;
  }

  input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .settings__duration-setting {
    display: flex;
    flex-direction: column;
  }
</style>
