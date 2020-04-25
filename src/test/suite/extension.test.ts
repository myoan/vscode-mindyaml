import * as assert from 'assert';
import * as yaml from 'js-yaml';
import {Model} from '../../model';

suite('YAML data suite', () => {
	test('Model test', () => {
		const testCase = [
			{
				input: {},
				expect: []
			},
			{
				input: ["hoge"],
				expect: [{"name": "hoge"}]
			}
		];
		testCase.forEach(tc => {
			const model = new Model(tc['input']);
			assert.equal(JSON.stringify(tc['expect']), JSON.stringify(model.export()));
		});
	});
});