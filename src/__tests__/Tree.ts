import {Config} from '../config';
import {Tree} from '../components/Tree';

describe('the class Tree', () => {
	it('should generate the markup of the tree layer', () => {
		expect.hasAssertions();

		const config = new Config();
		const tree = new Tree(config, 100);
		const treeHeader = tree.getHeader();
		const treeTable = tree.getTable();

		expect(treeHeader).toMatch(/^<div class="gc_tree_header_view".*<\/div>$/);
		expect(treeTable).toMatch(/^<div class="gc_tree_table_view".*<\/div>$/);
	});
});
