import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, e as element, t as text, a as space, f as claim_element, g as children, h as claim_text, b as detach_dev, c as claim_space, k as add_location, j as attr_dev, l as insert_dev, m as append_dev, n as noop } from './client.797cf213.js';

/* src/routes/nous-contacter.svelte generated by Svelte v3.21.0 */

const file = "src/routes/nous-contacter.svelte";

function create_fragment(ctx) {
	let h20;
	let t0;
	let t1;
	let p0;
	let t2;
	let t3;
	let h21;
	let t4;
	let t5;
	let h30;
	let t6;
	let t7;
	let h31;
	let t8;
	let t9;
	let p1;
	let t10;
	let a0;
	let t11;
	let t12;
	let p2;
	let t13;
	let a1;
	let t14;
	let t15;

	const block = {
		c: function create() {
			h20 = element("h2");
			t0 = text("Nous contacter");
			t1 = space();
			p0 = element("p");
			t2 = text("Tu peux nous poser des questions par mail On pourra par la suite soit se\n    rencontrer en présentiel ou bien en visio-conférence");
			t3 = space();
			h21 = element("h2");
			t4 = text("Par email");
			t5 = text("\nAu choix : - [Stéphane](mailto:stephane@scopyleft.fr) -\n[Thaïs](mailto:thais.e@hotmail.fr) - [Ya-Lin](mailto:bizienyalin@gmail.com)\n");
			h30 = element("h3");
			t6 = text("Sur Mastodon");
			t7 = text("\n- [Stéphane](https://eldritch.cafe/@pntbr) C'est quoi\n[mastodon](https://fr.wikipedia.org/wiki/Mastodon_(r%C3%A9seau_social)) ?\n");
			h31 = element("h3");
			t8 = text("Avec Slack");
			t9 = space();
			p1 = element("p");
			t10 = text("Tu peux aussi demander à nous rejoindre pour échanger avec nous :\n    ");
			a0 = element("a");
			t11 = text("oisiflorus.slack.com");
			t12 = space();
			p2 = element("p");
			t13 = text("C'est quoi\n    ");
			a1 = element("a");
			t14 = text("slack");
			t15 = text("\n    ?");
			this.h();
		},
		l: function claim(nodes) {
			h20 = claim_element(nodes, "H2", {});
			var h20_nodes = children(h20);
			t0 = claim_text(h20_nodes, "Nous contacter");
			h20_nodes.forEach(detach_dev);
			t1 = claim_space(nodes);
			p0 = claim_element(nodes, "P", {});
			var p0_nodes = children(p0);
			t2 = claim_text(p0_nodes, "Tu peux nous poser des questions par mail On pourra par la suite soit se\n    rencontrer en présentiel ou bien en visio-conférence");
			p0_nodes.forEach(detach_dev);
			t3 = claim_space(nodes);
			h21 = claim_element(nodes, "H2", {});
			var h21_nodes = children(h21);
			t4 = claim_text(h21_nodes, "Par email");
			h21_nodes.forEach(detach_dev);
			t5 = claim_text(nodes, "\nAu choix : - [Stéphane](mailto:stephane@scopyleft.fr) -\n[Thaïs](mailto:thais.e@hotmail.fr) - [Ya-Lin](mailto:bizienyalin@gmail.com)\n");
			h30 = claim_element(nodes, "H3", {});
			var h30_nodes = children(h30);
			t6 = claim_text(h30_nodes, "Sur Mastodon");
			h30_nodes.forEach(detach_dev);
			t7 = claim_text(nodes, "\n- [Stéphane](https://eldritch.cafe/@pntbr) C'est quoi\n[mastodon](https://fr.wikipedia.org/wiki/Mastodon_(r%C3%A9seau_social)) ?\n");
			h31 = claim_element(nodes, "H3", {});
			var h31_nodes = children(h31);
			t8 = claim_text(h31_nodes, "Avec Slack");
			h31_nodes.forEach(detach_dev);
			t9 = claim_space(nodes);
			p1 = claim_element(nodes, "P", {});
			var p1_nodes = children(p1);
			t10 = claim_text(p1_nodes, "Tu peux aussi demander à nous rejoindre pour échanger avec nous :\n    ");
			a0 = claim_element(p1_nodes, "A", { href: true });
			var a0_nodes = children(a0);
			t11 = claim_text(a0_nodes, "oisiflorus.slack.com");
			a0_nodes.forEach(detach_dev);
			p1_nodes.forEach(detach_dev);
			t12 = claim_space(nodes);
			p2 = claim_element(nodes, "P", {});
			var p2_nodes = children(p2);
			t13 = claim_text(p2_nodes, "C'est quoi\n    ");
			a1 = claim_element(p2_nodes, "A", { href: true });
			var a1_nodes = children(a1);
			t14 = claim_text(a1_nodes, "slack");
			a1_nodes.forEach(detach_dev);
			t15 = claim_text(p2_nodes, "\n    ?");
			p2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(h20, file, 0, 0, 0);
			add_location(p0, file, 2, 0, 25);
			add_location(h21, file, 7, 0, 169);
			add_location(h30, file, 10, 0, 320);
			add_location(h31, file, 13, 0, 470);
			attr_dev(a0, "href", "https://oisiflorus.slack.com");
			add_location(a0, file, 16, 4, 568);
			add_location(p1, file, 14, 0, 490);
			attr_dev(a1, "href", "https://fr.wikipedia.org/wiki/Slack");
			add_location(a1, file, 20, 4, 660);
			add_location(p2, file, 18, 0, 637);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h20, anchor);
			append_dev(h20, t0);
			insert_dev(target, t1, anchor);
			insert_dev(target, p0, anchor);
			append_dev(p0, t2);
			insert_dev(target, t3, anchor);
			insert_dev(target, h21, anchor);
			append_dev(h21, t4);
			insert_dev(target, t5, anchor);
			insert_dev(target, h30, anchor);
			append_dev(h30, t6);
			insert_dev(target, t7, anchor);
			insert_dev(target, h31, anchor);
			append_dev(h31, t8);
			insert_dev(target, t9, anchor);
			insert_dev(target, p1, anchor);
			append_dev(p1, t10);
			append_dev(p1, a0);
			append_dev(a0, t11);
			insert_dev(target, t12, anchor);
			insert_dev(target, p2, anchor);
			append_dev(p2, t13);
			append_dev(p2, a1);
			append_dev(a1, t14);
			append_dev(p2, t15);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(h20);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(p0);
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(h21);
			if (detaching) detach_dev(t5);
			if (detaching) detach_dev(h30);
			if (detaching) detach_dev(t7);
			if (detaching) detach_dev(h31);
			if (detaching) detach_dev(t9);
			if (detaching) detach_dev(p1);
			if (detaching) detach_dev(t12);
			if (detaching) detach_dev(p2);
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

function instance($$self, $$props) {
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Nous_contacter> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Nous_contacter", $$slots, []);
	return [];
}

class Nous_contacter extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Nous_contacter",
			options,
			id: create_fragment.name
		});
	}
}

export default Nous_contacter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm91cy1jb250YWN0ZXIuM2U0ZTIwNDUuanMiLCJzb3VyY2VzIjpbXSwic291cmNlc0NvbnRlbnQiOltdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
