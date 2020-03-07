import {Config} from '../config';
import {TimelineScrollbar} from '../components/TimelineScrollbar';

describe('the class TimelineScrollbar', () => {
	it('should generate the markup of the timeline scrollbar', () => {
		expect.hasAssertions();

		const config = new Config();
		const scrollbar = new TimelineScrollbar(config, 10, 100, 200, 300);

		expect(scrollbar.getMarkup()).toMatch(/^<div class="gc_tree_scrollbar_cell".*<\/div>$/);
	});
});
