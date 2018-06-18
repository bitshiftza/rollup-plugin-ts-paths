import fs from 'fs';
import path from 'path';
import stripBom from 'strip-bom';
import stripComments from 'strip-json-comments';
import { Options } from './options';

function readTsConfig(directory: string) {
	const tsConfigPath = path.join(directory, 'tsconfig.json');
	if (!fs.existsSync(tsConfigPath)) {
		throw new Error(`[rollup-plugin-ts-paths] Cannot find TS config in "${directory}"`);
	}

	const contents = fs.readFileSync(tsConfigPath, 'utf-8');
	const data = stripComments(stripBom(contents))

	// A tsconfig.json file is permitted to be completely empty.
	if (/^\s*$/.test(data)) {
		return {}
	}

	return JSON.parse(data);
}

function findTsConfig() {
	let root = process.cwd();

	do {
		const tsConfigPath = path.join(root, 'tsconfig.json');
		if (fs.existsSync(tsConfigPath)) {
			return root;
		}

		root = path.normalize(path.join(root, '..'));
	} while (root !== '/');

	return undefined;
}

export interface Paths {
	[key: string]: string;
}

export function getPathsFromTsConfig(options: Options): Paths {
	const baseDirectory = options.tsConfigDirectory || findTsConfig();
	if (!baseDirectory) {
		throw new Error('[rollup-plugin-ts-paths] Cannot resolve TS config file');
	}

	const config = {
		baseDirectory,
		tsConfig: readTsConfig(baseDirectory)
	};

	const outDir = path.join(config.baseDirectory, config.tsConfig.compilerOptions.outDir);
	const tsConfigPaths = config.tsConfig.compilerOptions.paths || {};
	const paths: Paths = {};

	Object.keys(tsConfigPaths).forEach(key => {
		paths[key] = path.join(outDir, tsConfigPaths[key][0].replace('.ts', '.js'))
	});

	return paths;
}
