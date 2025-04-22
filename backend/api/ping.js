export default function ping(data) {
    const start = data?.start || 0;
    const received = Date.now();
    const time = Math.abs(received - start);

    return { message: `pong: ${time}ms!` };
}
