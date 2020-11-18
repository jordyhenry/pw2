import Jimp from 'jimp'
import { isArrayBuffer, bufferFromArrayBuffer} from './utils'
import RESIZING_MODES from './resizingModes.js'
import { 
  getNearestPOW2Value, 
  getNextPOW2Value, 
  getPreviousPOW2Value,
} from './PW2ValueConverter.js'

type Pw2AllowedInputs = string | Buffer | ArrayBuffer

interface Ipw2 {
  resizeAndGetBuffer(file: string | Buffer, resizingMode: RESIZING_MODES): Promise<Buffer>,
  resizeAndGetBase64(file: string | Buffer, resizingMode: RESIZING_MODES): Promise<string>
}

const createPw2 = (): Ipw2 => {
  async function getFile(file: Pw2AllowedInputs): Promise<Jimp> {
    if (Buffer.isBuffer(file)) return await Jimp.read(file)
    else if (isArrayBuffer(file)) return await Jimp.read(bufferFromArrayBuffer(file as ArrayBuffer))
    else if (typeof file === 'string') return await Jimp.read(file)
    else throw new Error('Input file should be Buffer or string!');
  }

  async function resize(file: Jimp, resizingMode: RESIZING_MODES): Promise<Jimp> {
    const { width, height } = getNewDimensions(resizingMode, file.getWidth(), file.getHeight()) 
    return await file.resize(width, height)
  }

  function getNewDimensions(resizingMode: RESIZING_MODES, inputWidth: number, inputHeight: number) {
    let newWidth = 0
    let newHeight = 0
    switch (resizingMode) {
      case RESIZING_MODES.PREVIOW_PW2:
        newWidth = getPreviousPOW2Value(inputWidth)
        newHeight = getPreviousPOW2Value(inputHeight)
        break;
      
      case RESIZING_MODES.NEXT_PW2:
        newWidth = getNextPOW2Value(inputWidth)
        newHeight = getNextPOW2Value(inputHeight)
        break;
      
      default:
        newWidth = getNearestPOW2Value(inputWidth)
        newHeight = getNearestPOW2Value(inputHeight)
        break;
    }

    return {
      width: newWidth,
      height: newHeight,
    }
  }

  async function resizeAndGetBuffer(file: Pw2AllowedInputs, resizingMode: RESIZING_MODES = RESIZING_MODES.NEAREST_PW2): Promise<Buffer> {
    const jimpFile = await getFile(file)
    const resizedFile = await resize(jimpFile, resizingMode)
    
    return await resizedFile.getBufferAsync(jimpFile.getMIME())
  }

  async function resizeAndGetBase64(file: Pw2AllowedInputs, resizingMode: RESIZING_MODES = RESIZING_MODES.NEAREST_PW2): Promise<string> {
    const jimpFile = await getFile(file)
    const resizedFile = await resize(jimpFile, resizingMode)
    
    return await resizedFile.getBase64Async(jimpFile.getMIME())
  }

  return {
    resizeAndGetBuffer,
    resizeAndGetBase64
  }
}

export default createPw2
