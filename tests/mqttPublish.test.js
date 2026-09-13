import assert from 'node:assert/strict';
import { test } from 'node:test';
import { publishToBroker } from '../src-electron/mqttPublish.js';

test('publish waits for the MQTT callback before reporting success', async () => {
  let acknowledge;
  const client = {
    connected: true,
    publish(topic, message, options, callback) {
      assert.deepEqual(
        [topic, message, options],
        ['discovery/config', '{}', { retain: true, qos: 1 }],
      );
      acknowledge = callback;
    },
  };
  let settled = false;
  const result = publishToBroker(client, 'discovery/config', '{}', { retain: true, qos: 1 }).then(
    (value) => {
      settled = true;
      return value;
    },
  );
  await Promise.resolve();
  assert.equal(settled, false);
  acknowledge();
  assert.deepEqual(await result, { success: true });
});

test('publish reports disconnection, broker errors, exceptions and timeouts', async () => {
  assert.equal((await publishToBroker(null)).success, false);
  assert.equal((await publishToBroker({ connected: false })).success, false);
  for (const publish of [
    (_topic, _message, _options, callback) => callback(new Error('Denied')),
    () => {
      throw new Error('Denied');
    },
  ]) {
    assert.deepEqual(await publishToBroker({ connected: true, publish }), {
      success: false,
      error: 'Denied',
    });
  }
  assert.match(
    (await publishToBroker({ connected: true, publish() {} }, 'topic', '{}', {}, 1)).error,
    /timed out/,
  );
});
