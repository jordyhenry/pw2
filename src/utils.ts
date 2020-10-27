export function bufferFromArrayBuffer(arrayBuffer: ArrayBuffer) {
  const buffer = Buffer.alloc(arrayBuffer.byteLength);
  const view = new Uint8Array(arrayBuffer);

  for (let i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }

  return buffer;
}

export function isArrayBuffer(test: any) {
  return (
    Object.prototype.toString
      .call(test)
      .toLowerCase()
      .indexOf('arraybuffer') > -1
  );
}