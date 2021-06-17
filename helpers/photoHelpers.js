const sharp = require('sharp');
const uuid = require('uuid');
const { ensureDir, unlink } = require('fs-extra');
const path = require('path');

const { UPLOADS_USERS_DIRECTORY, USERS_IMAGE_MAX_WIDTH } = process.env;
const uploadsUsersDir = path.join(__dirname, '../.', UPLOADS_USERS_DIRECTORY);

const { UPLOADS_SPACES_CENTERS_DIRECTORY, SPACES_CENTERS_IMAGE_MAX_WIDTH } =
	process.env;
const uploadsSpacesCentersDir = path.join(
	__dirname,
	'../.',
	UPLOADS_SPACES_CENTERS_DIRECTORY
);

async function saveUserPhoto(imageBuffer) {
	await ensureDir(uploadsUsersDir);
	const image = sharp(imageBuffer.data);
	const imageInfo = await image.metadata();
	const maxSize = Number(USERS_IMAGE_MAX_WIDTH);

	if (imageInfo.width > maxSize) {
		image.resize(maxSize);
	}

	const savedImageName = `${uuid.v4()}.jpg`;
	const imagePath = path.join(uploadsUsersDir, savedImageName);
	await image.toFile(imagePath);
	return savedImageName;
}

async function saveSpacesCentersPhoto(imageBuffer) {
	console.log(uploadsSpacesCentersDir);
	await ensureDir(uploadsSpacesCentersDir);
	const image = sharp(imageBuffer.data);
	const imageInfo = await image.metadata();
	const maxSize = Number(SPACES_CENTERS_IMAGE_MAX_WIDTH);

	if (imageInfo.width > maxSize) {
		image.resize(maxSize);
	}

	const savedImageName = `${uuid.v4()}.jpg`;
	const imagePath = path.join(uploadsSpacesCentersDir, savedImageName);
	await image.toFile(imagePath);
	return savedImageName;
}

async function removeUserPhoto(photoName) {
	if (photoName) {
		const photoPath = path.join(uploadsUsersDir, photoName);
		await unlink(photoPath);
	}
}
async function removeSpacesCentersPhoto(photoName) {
	if (photoName) {
		const photoPath = path.join(uploadsSpacesCentersDir, photoName);
		await unlink(photoPath);
	}
}

module.exports = {
	saveUserPhoto,
	saveSpacesCentersPhoto,
	removeUserPhoto,
	removeSpacesCentersPhoto,
};
