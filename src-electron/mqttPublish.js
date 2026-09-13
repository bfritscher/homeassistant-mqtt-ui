export async function publishToBroker(client, topic, message, options, timeout = 15000) {
  if (!client?.connected) return { success: false, error: 'Not connected' };
  return new Promise((resolve) => {
    const timer = setTimeout(
      () =>
        resolve({
          success: false,
          error: 'Publish confirmation timed out. Reopen the update preview before retrying.',
        }),
      timeout,
    );
    try {
      client.publish(topic, message, options, (error) => {
        clearTimeout(timer);
        resolve(error ? { success: false, error: error.message } : { success: true });
      });
    } catch (error) {
      clearTimeout(timer);
      resolve({ success: false, error: error.message });
    }
  });
}
