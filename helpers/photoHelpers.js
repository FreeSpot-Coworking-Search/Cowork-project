const sharp = require('sharp');
const uuid = require('uuid');
const { ensureDir, unlink } = require('fs-extra');
const path = require('path');

const { UPLOADS_DIRECTORY } = process.env;
const uploadsDir = path.join(
	'/Volumes/INTERCAMBIO/Programacion/coworking_HAB',
	UPLOADS_DIRECTORY
);

async function savePhoto(imageBuffer) {
	await ensureDir(uploadsDir);
	const image = sharp(imageBuffer.data);
	const imageInfo = await image.metadata();
	const IMAGE_MAX_WIDTH = 300;

	if (imageInfo.width > IMAGE_MAX_WIDTH) {
		image.resize(IMAGE_MAX_WIDTH);
	}

	const savedImageName = `${uuid.v4()}.jpg`;
	const imagePath = path.join(uploadsDir, savedImageName);
	await image.toFile(imagePath);
	return savedImageName;
}

async function removePhoto(photoName) {
	if (photoName) {
		const photoPath = path.join(uploadsDir, photoName);
		await unlink(photoPath);
	}
}

module.exports = { savePhoto, removePhoto };
