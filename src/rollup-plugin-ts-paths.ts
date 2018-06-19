
import { Plugin } from 'rollup';
import { Options } from './options';
import { getPathsFromTsConfig } from './tsconfig';

export default function rollupPluginTsPaths(options: Options = {}): Plugin {
	const paths = getPathsFromTsConfig(options);

	return {
		name: 'rollup-plugin-ts-paths',
		resolveId(importee: string) {
			return paths[importee];
		}
	};
}