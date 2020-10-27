
# pw²

> An easy tool to re-scale your images for the right power of two dimensions.

## Install

```bash
npm i pw2
```

## Usage

### In nodejs applications
```javascript
const {createPw2, RESIZING_MODES} = require('pw2')
const  pw2 = createPw2()

// async usage 
async function main() {
	const inputFile = await fs.readFileSync(inputPath)
	const nearestBuffer = await pw2.resizeAndGetBuffer(inputFile, RESIZING_MODES.NEAREST_PW2)
	fs.writeFileSync(path.resolve(mainPath, 'nearest.png'), nearestBuffer)
}
main()

// Promise usage
pw2.resizeAndGetBuffer('/path/image.png', RESIZING_MODES.PREVIOW_PW2)
.then(resizedFile => {
	fs.writeFileSync('/path/rescaled-image.png', resizedFile)
})
```

### In web and ReactJs applications
```javascript
import {createPw2, RESIZING_MODES} from 'pw2'
const  pw2 = createPw2()

const fileUploadInput = document.getElementById('fileUpload')
fileUploadInput.addEventListener('change', handleFileUpload, false)

async function handleFileUpload() {
	const file = fileUploadInput .files[0]
	const fileReader = new  FileReader()

	fileReader.onload = async() => {
		// async usage
		const  asyncResizedImage = await  pw2.resizeAndGetBase64(fileReader.result, RESIZING_MODES.NEAREST_PW2)
		
		// Promise usage
		pw2.resizeAndGetBase64(fileReader.result, RESIZING_MODES.PREVIOW_PW2)
		.then(promiseResizedImage => {
			console.log(promiseResizedImage)
		})
	}

	fileReader.readAsArrayBuffer(file)
}
```

## Motivation
Games and real-time applications, in general, tend to prefer images and textures with power-of-two dimensions, they make it easier to generate eventual mipmaps, consume less GPU memory, and increase the overall performance.

But it's time-consuming to find the right power-of-two dimensions for that 1200x612 texture and resize it yourself, that's where pw² comes in handy.

pw² uses [Jimp](https://github.com/oliver-moran/jimp/) to get your texture current dimensions and rescaled it to the right power-of-two dimensions automatically.

This project was done for the cs50  Final Project assignment.

## License

[MIT](https://github.com/jordyhenry/pw2/blob/master/LICENSE)