import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, u as validate_each_argument, v as validate_slots, e as element, t as text, a as space, f as claim_element, g as children, h as claim_text, b as detach_dev, c as claim_space, j as attr_dev, k as add_location, l as insert_dev, m as append_dev, z as set_data_dev, q as query_selector_all, n as noop, D as destroy_each } from './client.c2909074.js';

/* src/routes/documentation/index.svelte generated by Svelte v3.21.0 */

const file = "src/routes/documentation/index.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	return child_ctx;
}

// (34:4) {#each posts as post}
function create_each_block(ctx) {
	let article;
	let h2;
	let a0;
	let t0_value = /*post*/ ctx[1].titre + "";
	let t0;
	let a0_href_value;
	let t1;
	let p;
	let t2_value = /*post*/ ctx[1].description + "";
	let t2;
	let t3;
	let a1;
	let t4;
	let a1_title_value;
	let a1_href_value;
	let t5;

	const block = {
		c: function create() {
			article = element("article");
			h2 = element("h2");
			a0 = element("a");
			t0 = text(t0_value);
			t1 = space();
			p = element("p");
			t2 = text(t2_value);
			t3 = space();
			a1 = element("a");
			t4 = text("Lire la suite de la fiche");
			t5 = space();
			this.h();
		},
		l: function claim(nodes) {
			article = claim_element(nodes, "ARTICLE", { class: true, "data-title": true });
			var article_nodes = children(article);
			h2 = claim_element(article_nodes, "H2", { class: true });
			var h2_nodes = children(h2);

			a0 = claim_element(h2_nodes, "A", {
				rel: true,
				class: true,
				"data-title": true,
				href: true
			});

			var a0_nodes = children(a0);
			t0 = claim_text(a0_nodes, t0_value);
			a0_nodes.forEach(detach_dev);
			h2_nodes.forEach(detach_dev);
			t1 = claim_space(article_nodes);
			p = claim_element(article_nodes, "P", { class: true, "data-title": true });
			var p_nodes = children(p);
			t2 = claim_text(p_nodes, t2_value);
			p_nodes.forEach(detach_dev);
			t3 = claim_space(article_nodes);

			a1 = claim_element(article_nodes, "A", {
				class: true,
				title: true,
				"data-title": true,
				href: true
			});

			var a1_nodes = children(a1);
			t4 = claim_text(a1_nodes, "Lire la suite de la fiche");
			a1_nodes.forEach(detach_dev);
			t5 = claim_space(article_nodes);
			article_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(a0, "rel", "prefetch");
			attr_dev(a0, "class", "folderLink svelte-1jrqtgm");
			attr_dev(a0, "data-title", "folderLink");
			attr_dev(a0, "href", a0_href_value = "documentation/" + /*post*/ ctx[1].lien);
			add_location(a0, file, 41, 16, 989);
			attr_dev(h2, "class", "ghTreeTitle svelte-1jrqtgm");
			add_location(h2, file, 40, 12, 948);
			attr_dev(p, "class", "ghTreeExcerpt");
			attr_dev(p, "data-title", "fileExcerpt");
			add_location(p, file, 50, 12, 1265);
			attr_dev(a1, "class", "ghTreeReadmore");
			attr_dev(a1, "title", a1_title_value = "Lire la suite de la fiche : " + /*post*/ ctx[1].titre);
			attr_dev(a1, "data-title", "fileReadmoreLink");
			attr_dev(a1, "href", a1_href_value = "documentation/" + /*post*/ ctx[1].lien);
			add_location(a1, file, 53, 12, 1380);
			attr_dev(article, "class", "ghTreeItem ghTypeFile");
			attr_dev(article, "data-title", "dir");
			add_location(article, file, 39, 8, 879);
		},
		m: function mount(target, anchor) {
			insert_dev(target, article, anchor);
			append_dev(article, h2);
			append_dev(h2, a0);
			append_dev(a0, t0);
			append_dev(article, t1);
			append_dev(article, p);
			append_dev(p, t2);
			append_dev(article, t3);
			append_dev(article, a1);
			append_dev(a1, t4);
			append_dev(article, t5);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*posts*/ 1 && t0_value !== (t0_value = /*post*/ ctx[1].titre + "")) set_data_dev(t0, t0_value);

			if (dirty & /*posts*/ 1 && a0_href_value !== (a0_href_value = "documentation/" + /*post*/ ctx[1].lien)) {
				attr_dev(a0, "href", a0_href_value);
			}

			if (dirty & /*posts*/ 1 && t2_value !== (t2_value = /*post*/ ctx[1].description + "")) set_data_dev(t2, t2_value);

			if (dirty & /*posts*/ 1 && a1_title_value !== (a1_title_value = "Lire la suite de la fiche : " + /*post*/ ctx[1].titre)) {
				attr_dev(a1, "title", a1_title_value);
			}

			if (dirty & /*posts*/ 1 && a1_href_value !== (a1_href_value = "documentation/" + /*post*/ ctx[1].lien)) {
				attr_dev(a1, "href", a1_href_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(article);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(34:4) {#each posts as post}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t0;
	let section;
	let header;
	let h1;
	let t1;
	let t2;
	let each_value = /*posts*/ ctx[0];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			t0 = space();
			section = element("section");
			header = element("header");
			h1 = element("h1");
			t1 = text("Liste des articles");
			t2 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-y1yyjd\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);

			section = claim_element(nodes, "SECTION", {
				id: true,
				class: true,
				"data-title": true
			});

			var section_nodes = children(section);
			header = claim_element(section_nodes, "HEADER", {});
			var header_nodes = children(header);
			h1 = claim_element(header_nodes, "H1", {});
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, "Liste des articles");
			h1_nodes.forEach(detach_dev);
			header_nodes.forEach(detach_dev);
			t2 = claim_space(section_nodes);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(section_nodes);
			}

			section_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			document.title = "Documentation sur les thés";
			add_location(h1, file, 30, 8, 579);
			add_location(header, file, 29, 4, 562);
			attr_dev(section, "id", "ghTree");
			attr_dev(section, "class", "ghTree");
			attr_dev(section, "data-title", "tree");
			add_location(section, file, 28, 0, 503);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, section, anchor);
			append_dev(section, header);
			append_dev(header, h1);
			append_dev(h1, t1);
			append_dev(section, t2);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(section, null);
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*posts*/ 1) {
				each_value = /*posts*/ ctx[0];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(section, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(section);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function preload({ params, query }) {
	return this.fetch(`documentation.json`).then(r => r.json()).then(posts => {
		return { posts };
	});
}

function instance($$self, $$props, $$invalidate) {
	let { posts } = $$props;
	const writable_props = ["posts"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Documentation> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Documentation", $$slots, []);

	$$self.$set = $$props => {
		if ("posts" in $$props) $$invalidate(0, posts = $$props.posts);
	};

	$$self.$capture_state = () => ({ preload, posts });

	$$self.$inject_state = $$props => {
		if ("posts" in $$props) $$invalidate(0, posts = $$props.posts);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [posts];
}

class Documentation extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { posts: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Documentation",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*posts*/ ctx[0] === undefined && !("posts" in props)) {
			console.warn("<Documentation> was created without expected prop 'posts'");
		}
	}

	get posts() {
		throw new Error("<Documentation>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set posts(value) {
		throw new Error("<Documentation>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default Documentation;
export { preload };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguMzZmYzc1OGMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvZG9jdW1lbnRhdGlvbi9pbmRleC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHN0eWxlPlxuICAgIC5naFRyZWVUaXRsZSBhIHtcbiAgICAgICAgY29sb3I6ICM3M2Q1NmI7XG4gICAgfVxuXG4gICAgLmdoVHJlZVRpdGxlIGE6aG92ZXIge1xuICAgICAgICBjb2xvcjogcmdiKDU2LCAxNTMsIDQ3KTtcbiAgICB9XG48L3N0eWxlPlxuXG48c2NyaXB0IGNvbnRleHQ9XCJtb2R1bGVcIj5cbiAgICBleHBvcnQgZnVuY3Rpb24gcHJlbG9hZCh7IHBhcmFtcywgcXVlcnkgfSkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaChgZG9jdW1lbnRhdGlvbi5qc29uYClcbiAgICAgICAgICAgIC50aGVuKHIgPT4gci5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihwb3N0cyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgcG9zdHMgfVxuICAgICAgICAgICAgfSlcbiAgICB9XG48L3NjcmlwdD5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgbGV0IHBvc3RzXG48L3NjcmlwdD5cblxuPHN2ZWx0ZTpoZWFkPlxuICAgIDx0aXRsZT5Eb2N1bWVudGF0aW9uIHN1ciBsZXMgdGjDqXM8L3RpdGxlPlxuPC9zdmVsdGU6aGVhZD5cblxuPHNlY3Rpb24gaWQ9XCJnaFRyZWVcIiBjbGFzcz1cImdoVHJlZVwiIGRhdGEtdGl0bGU9XCJ0cmVlXCI+XG4gICAgPGhlYWRlcj5cbiAgICAgICAgPGgxPkxpc3RlIGRlcyBhcnRpY2xlczwvaDE+XG4gICAgPC9oZWFkZXI+XG5cbiAgICB7I2VhY2ggcG9zdHMgYXMgcG9zdH1cbiAgICAgICAgPCEtLSB3ZSdyZSB1c2luZyB0aGUgbm9uLXN0YW5kYXJkIGByZWw9cHJlZmV0Y2hgIGF0dHJpYnV0ZSB0b1xuXHRcdFx0XHR0ZWxsIFNhcHBlciB0byBsb2FkIHRoZSBkYXRhIGZvciB0aGUgcGFnZSBhcyBzb29uIGFzXG5cdFx0XHRcdHRoZSB1c2VyIGhvdmVycyBvdmVyIHRoZSBsaW5rIG9yIHRhcHMgaXQsIGluc3RlYWQgb2Zcblx0XHRcdFx0d2FpdGluZyBmb3IgdGhlICdjbGljaycgZXZlbnQgLS0+XG5cbiAgICAgICAgPGFydGljbGUgY2xhc3M9XCJnaFRyZWVJdGVtIGdoVHlwZUZpbGVcIiBkYXRhLXRpdGxlPVwiZGlyXCI+XG4gICAgICAgICAgICA8aDIgY2xhc3M9XCJnaFRyZWVUaXRsZVwiPlxuICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgIHJlbD1cInByZWZldGNoXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJmb2xkZXJMaW5rXCJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS10aXRsZT1cImZvbGRlckxpbmtcIlxuICAgICAgICAgICAgICAgICAgICBocmVmPVwiZG9jdW1lbnRhdGlvbi97cG9zdC5saWVufVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7cG9zdC50aXRyZX1cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJnaFRyZWVFeGNlcnB0XCIgZGF0YS10aXRsZT1cImZpbGVFeGNlcnB0XCI+XG4gICAgICAgICAgICAgICAge3Bvc3QuZGVzY3JpcHRpb259XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZ2hUcmVlUmVhZG1vcmVcIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwiTGlyZSBsYSBzdWl0ZSBkZSBsYSBmaWNoZSA6IHtwb3N0LnRpdHJlfVwiXG4gICAgICAgICAgICAgICAgZGF0YS10aXRsZT1cImZpbGVSZWFkbW9yZUxpbmtcIlxuICAgICAgICAgICAgICAgIGhyZWY9XCJkb2N1bWVudGF0aW9uL3twb3N0LmxpZW59XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBMaXJlIGxhIHN1aXRlIGRlIGxhIGZpY2hlXG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvYXJ0aWNsZT5cbiAgICB7L2VhY2h9XG48L3NlY3Rpb24+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7eUJBK0NxQixHQUFJLElBQUMsS0FBSzs7Ozs7eUJBSWQsR0FBSSxJQUFDLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvRUFOUSxHQUFJLElBQUMsSUFBSTs7Ozs7Ozs7b0ZBVUUsR0FBSSxJQUFDLEtBQUs7O29FQUV6QixHQUFJLElBQUMsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0VBVnpCLEdBQUksSUFBQyxLQUFLOzs2RkFGVSxHQUFJLElBQUMsSUFBSTs7OztnRUFNakMsR0FBSSxJQUFDLFdBQVc7OzZHQUltQixHQUFJLElBQUMsS0FBSzs7Ozs2RkFFekIsR0FBSSxJQUFDLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkF4Qm5DLEdBQUs7Ozs7Z0NBQVYsTUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQkFBQyxHQUFLOzs7OytCQUFWLE1BQUk7Ozs7Ozs7Ozs7Ozs7Ozs7b0NBQUosTUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FoQ1UsT0FBTyxHQUFHLE1BQU0sRUFBRSxLQUFLO1FBQzVCLElBQUksQ0FBQyxLQUFLLHVCQUNaLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksSUFDaEIsSUFBSSxDQUFDLEtBQUs7V0FDRSxLQUFLOzs7OztPQUpmLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
