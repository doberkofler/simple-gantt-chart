import {Config} from '../config';
import {Timeline} from '../components/Timeline';

describe('the class Timeline', () => {
	it('should generate the markup of the timeline layer', () => {
		expect.hasAssertions();

		const config = new Config();
		const timeline = new Timeline(config, 100);
		const timelineHeader = timeline.getHeader();
		const timelineTable = timeline.getTable();

		expect(timelineHeader).toMatch(/^<div class="gc_timeline_header_view".*<\/div>$/);
		expect(timelineTable).toMatch(/^<div class="gc_timeline_table_view".*<\/div>$/);
	});
});
