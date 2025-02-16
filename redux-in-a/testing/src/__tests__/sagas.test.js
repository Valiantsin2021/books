import { handleProgressTimer } from "../sagas";
import { delay } from "redux-saga";
import { call, put } from "redux-saga/effects";

// ch[9.1] testing sagas: test that the generator function yields incrementally
// step through the results of the generator function one step at a time, and eventually test that the value of done is true
// (the generator yields the value with iterator.next().value )
// the result of each iterator.next().value should equal to the result of redux-saga/effects (call, put, take, takeLatest)

describe("sagas", () => {
  it("handleProgressTimer", () => {
    // [9.1.1] create the iterator
    const iterator = handleProgressTimer({
      type: "TIMER_STARTED",
      payload: { taskId: 12 },
    });

    const expectedAction = {
      type: "TIMER_INCREMENT",
      payload: { taskId: 12 },
    };

    // [9.1.2] keep ticking the iterator and verifying the result at that tick
    expect(iterator.next().value).toEqual(call(delay, 1000));
    expect(iterator.next().value).toEqual(put(expectedAction));

    expect(iterator.next().value).toEqual(call(delay, 1000));
    expect(iterator.next().value).toEqual(put(expectedAction));
    // 2 rounds is enough
  });

  // [9.1.3] test the end of the saga
  // find the final action of the saga, the result of iterator.next().done should be true
  it("handles the handleProgressTimer sad path", () => {
    const iterator = handleProgressTimer({
      type: "TIMER_STOPPED",
    });

    expect(iterator.next().done).toBe(true);
  });
});
