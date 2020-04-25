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
				expect: [{name: "hoge"}]
			},
			{
				input: ["hoge", "fuga"],
				expect: [{name: "hoge"}, {name: "fuga"}]
			},
			{
				input: ["hoge", {"foo": ["bar"]}],
				expect: [{name: "hoge"}, {name: "foo", children: [{name: "bar"}]}]
			},
			{
				input: ["hoge", {"foo": ["bar", "piyo"]}],
				expect: [{name: "hoge"}, {name: "foo", children: [{name: "bar"}, {name: "piyo"}]}]
			},
			{
				input: ["hoge", {"foo": ["bar", "piyo"]}, "fuga"],
				expect: [{name: "hoge"}, {name: "foo", children: [{name: "bar"}, {name: "piyo"}]}, {name: "fuga"}]
			}
		];
		testCase.forEach(tc => {
			const model = new Model(tc['input']);
			assert.equal(JSON.stringify(tc['expect']), JSON.stringify(model.export()));
		});
	});
});