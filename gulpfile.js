const { src, dest, parallel } = require('gulp');

function buildIcons() {
	return src('nodes/**/*.{png,svg}')
		.pipe(dest('dist/nodes'));
}

function buildCredentialIcons() {
	return src('credentials/**/*.{png,svg}')
		.pipe(dest('dist/credentials'));
}

function buildCodex() {
	return src('nodes/**/*.json')
		.pipe(dest('dist/nodes'));
}

const build = parallel(buildIcons, buildCredentialIcons, buildCodex);

exports['build:icons'] = build;
exports.default = build;
