import {writable} from "svelte/store";

type PomodoroStore = {
  status: "IDLE" | "COMPLETED" | "PAUSED" | "RUNNING";
  interval: NodeJS.Timer | undefined;
  time: number;
};

enum PomodoroMode {
  POMODORO = 25 * 60,
  SHORT_BREAK = 5 * 60,
  LONG_BREAK = 15 * 60,
};

const {subscribe, update} = writable<PomodoroStore>({
  status: "IDLE",
  interval: undefined,
  time: PomodoroMode.POMODORO,
});

const setPomodoro = (minutes: number) => {
  update((pomodoro) => {
    pomodoro.time = minutes * 60;
    return pomodoro;
  });
};

const startPomodoro = () => {
  update((pomodoro) => {
    if (!pomodoro.interval) {
      pomodoro.status = "RUNNING";
      pomodoro.interval = setInterval(() => {
        update((pomodoroState) => {
          if (pomodoroState.time > 0) {
            pomodoroState.time = pomodoroState.time - 1;
          } else {
            pomodoroState.status = "COMPLETED";
            clearInterval(pomodoroState.interval);
            pomodoroState.interval = undefined;
          }
          return pomodoroState;
        });
      }, 1000);
      return pomodoro;
    }
    return pomodoro;
  });
};

const pausePomodoro = () => {
  update((state) => {
    state.status = "PAUSED";
    clearInterval(state.interval);
    state.interval = undefined;
    return state;
  })
};

const completePomodoro = () => {
  update((state) => {
    state.status = "COMPLETED";
    clearInterval(state.interval);
    state.interval = undefined;
    return state;
  })
};

export {subscribe, setPomodoro, startPomodoro, pausePomodoro, completePomodoro};

