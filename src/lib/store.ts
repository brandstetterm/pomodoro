import {writable} from "svelte/store";

type PomodoroStatus = "IDLE" | "COMPLETED" | "PAUSED" | "RUNNING";
type PomodoroMode = "POMODORO" | "SHORT_BREAK" | "LONG_BREAK";

export type PomodoroStore = {
  status: PomodoroStatus;
  mode: PomodoroMode;
  interval: NodeJS.Timer | undefined;
  time: number;
};

const {subscribe, update} = writable<PomodoroStore>({
  status: "IDLE",
  mode: "POMODORO",
  interval: undefined,
  time: 1500,
});

const resetPomodoroTime = () => {
  update((pomodoro) => {
    switch (pomodoro.mode) {
      case "POMODORO": pomodoro.time = 1500; break;
      case "SHORT_BREAK": pomodoro.time = 300; break;
      case "LONG_BREAK": pomodoro.time = 900; break;
    }
    return pomodoro;
  });
};

const updatePomodoroStatus = (status: PomodoroStatus) => {
  update((pomodoro) => {
    pomodoro.status = status;
    return pomodoro;
  });
};

const updatePomodoroMode = (mode: PomodoroMode) => {
  update((pomodoro) => {
    pomodoro.mode = mode;
    return pomodoro;
  });
};

const startPomodoroInterval = () => {
  update((state) => {
    if (!state.interval) {
      state.interval = setInterval(() => {
        update((pomodoro) => {
          if (pomodoro.time > 0) {
            pomodoro.time = pomodoro.time - 1;
          } else {
            updatePomodoroStatus("COMPLETED");
            clearPomodoroInterval();
            resetPomodoroTime();
          }
          return pomodoro;
        });
      }, 1000);
    }
    return state;
  });
};

const clearPomodoroInterval = () => {
  update((pomodoro) => {
    clearInterval(pomodoro.interval);
    pomodoro.interval = undefined;
    return pomodoro;
  });
};

const start = () => {
  updatePomodoroStatus("RUNNING");
  startPomodoroInterval();
};

const pause = () => {
  updatePomodoroStatus("PAUSED");
  clearPomodoroInterval();
};


const changeMode = (mode: PomodoroMode) => {
  clearPomodoroInterval();
  updatePomodoroStatus("IDLE");
  updatePomodoroMode(mode);
  resetPomodoroTime();
};


export {subscribe, start, pause, changeMode};

