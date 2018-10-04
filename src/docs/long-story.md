# The Long Story

This project's DocViewer implementation is derived from the official
[Angular documentation](https://angular.io)
whose DocViewer is in
[Angular DocViewer](https://github.com/angular/angular/tree/master/aio)

This page describes every embedded component in this project.

## Contents

[Fortune Cookie: injected embedded service](long-story/#fortune-cookie-injected-embedded-service)

[Current Location: injected app-wide service](long-story/#current-location-injected-app-wide-service)

[Awesome: the content tag](long-story/#awesome-the-content-tag)

[Hero Form: an embedded interactive component](long-story/#hero-form-an-embedded-interactive-component)

[CodeExample: pretty-printing code snippets](long-story/#codeexample-pretty-printing-code-snippets)

[CodeTabs: tabbed code snippets](long-story/#codetabs-tabbed-code-snippets)

[Questionnaire: metadata driven form](long-story/#questionnaire-metadata-driven-form)

---

## Fortune Cookie: injected embedded service

An embedded component may rely upon an injected service that is provided by the embedded module.

This one injects the <code>FortuneCookieService</code> which delivers a new fortune with every request.

1. "<i><fortune></fortune></i>"
2. "<i><fortune></fortune></i>"
3. "<i><fortune></fortune></i>"

While this is a trivial example, imagine multiple embedded modules instead of just one,
each dedicated to a substantial business function, each loaded on-demand,
each rich in its own services that are only created when needed.

This component is introduced on the [home page]().

---

## Current Location: injected app-wide service

An embedded component may rely upon an injected application-wide service that is provided in the root <code>AppModule</code>.

In this way, embedded components can communicate with each other and with regular components. They can share the capabilities of the entire app, such as data access service, cached values, logging, error handling, etc.

The <code>CurrentLocationComponent</code> injects the app's <code>LocationService</code> so it can report the current document's id (which is its location).
<aside>
	This doc is located at "<current-location></current-location>".
</aside>

The DocViewer passes its own injector to the Angular <code>ComponentFactory</code>
when it creates embedded components;
that injector becomes the parent of the embedded component's injector,
giving it access to all ancestor injectors.

This component is introduced on the [Tutorial Intro page](tutorial/toh-intro).

---

## Awesome: the content tag

An embedded component may consume and manipulate the HTML between its open and close tag.

The DocViewer grabs that HTML and assigns it to a property of the embedded component's host element. The property name is derived from the component's <i>selector</i> and suffixed with the word, "Content".

The embedded component may read that property and do what it wants.
The <code>AwesomeComponent</code> follows every "<i>the</i>" or  "<i>The</i>"with "<i>awesome</i>",
it precedes every  "<i>The</i>" with  "<i><b>OMG!</b></i>",
and finally stuffs the revised HTML back into the element.

This is a candidate for the most annoying component <i>ever created</i>.
<aside>
	<awesome>
		The DocViewer grabs that HTML and assigns it to a property of the embedded component's host element. The property name is derived from the component's <i>selector</i> and suffixed with the word, "Content".
	</awesome>
</aside>

<b>Security is a critical consideration.</b>
You'll be working directly with the DOM, by-passing Angular's
<a href="https://angular.io/api/platform-browser/DomSanitizer" target="_blank">DomSanitizer</a>
which guards against injection attacks.
You can't use Angular content projection with the <code>ng-content</code> tag.
So <i>be careful</i> and mark your code with a comment that
supports your security audit policies.

This component is introduced on the <a href="tutorial/toh-intro">Tutorial Intro page</a>.


The <a href="long-story/#code-example">code snippet prettifiers</a> also consume the embedded component's content property.

---

## Hero Form: an embedded interactive component

Form components can be complex with lots of validation rules and services to fetch and save data.
You can mix arbitrary content and embedded form components on the same page.

You might start with some instructions and then present the form.
<hero-form></hero-form>
Then tell the user about other stuff and present another form.
<hero-form></hero-form>
And conclude with more stuff.

This component is introduced on the <a href="hero-form">Hero Form page</a>.

---

## CodeExample: pretty-printing code snippets

The template of an embedded component can include a non-embedded component.
<aside>
	You may even be able embed embedded components within the template of an embedded component.
	It depends on whether the embedded component is designed to run as a regular component.
	The current implementation doesn't support embedded components within the projected content of an embedded component.
</aside>

The <code>CodeExampleComponent</code> component delegates to the
<code>CodeComponent</code> which colorizes code snippets with Google's "prettify" library.
It also frames the snippets in an optional header and adds a "Copy" button.
<code-example title="hero.ts">
	export class Hero {
		constructor(
			public id: number,
			public name: string,
			public power: string,
			public alterEgo?: string
		) { }
	}
</code-example>

Many more options await your study.

This version of <i>CodeExample</i> is almost identical to the one
in the Angular Documentation app
where it collaborates with <i>dgeni</i> transformations that make it easy for
authors to reference snippets from working code samples and trust <i>dgeni</i>
to project them into the docs automatically.

This component is introduced on the <a href="tutorial/toh-pt1">Tutorial Editor page</a>.

---

## CodeTabs: tabbed code snippets

The <code>CodeTabsComponent</code> also delegates to the
<code>CodeComponent</code> several times within an
<i>Angular Material Design <code>MatTabsComponent</code></i>

<code-tabs>
<code-pane title="hero.ts">
	export class Hero {
		constructor(
			public id: number,
			public name: string,
			public power: string,
			public alterEgo?: string
		) { }
	}
</code-pane>
<code-pane title="hero.service.ts" linenums="false">
	import { Injectable } from '@angular/core';
	import { of } from 'rxjs/observable/of';

	const HEROES: Hero[] = [
		{id: 1, name: 'Mr. Nice', power: 'Really sweet', alterEgo: 'Stuart Smalley'},
		{id: 2, name: 'Narco',    power: 'Ultra sleepy'},
		{id: 3, name: 'Bombasto', power: 'Blow hard', alterEgo: 'Foghorn Leghorn'}
	];

	@Injectable()
	export class HeroService {
		getHeroes() { return of(HEROES); }
	}
</code-pane>

	<code-pane
	path="bad.service.avoid.ts"
	title="bad.service.ts">
	export class BadService {
		myBad() { return 'Oops. I forgot @Injectable().'; }
	}
</code-pane>
</code-tabs>

It's our most complex embedded component example and also derives from the
<i>CodeTabs</i> in the Angular Documentation app.

This component is introduced on the <a href="tutorial/toh-pt2">Tutorial Master/Detail page</a>.

---

## Questionnaire: metadata driven form

The <a href="questionnaire">Questionnaire page</a> demonstrates an entirely different strategy for composing a page with metadata.

It constructs a <i>Reactive Form</i> out of questionnaire metadata and
populates it  with values from answers to that questionnaire.

This example turns a <i>conventional component</i>
into an <i>embedded component</i> by registering it as such in its own <code>QuestionnaireModule</code>.

### How it works

The questionnaire metadata describe characteristics of each question such as
the question name ("key"), a label, its data type, the options if it is multiple-choice, and whether it's required.

Most important is the question's <i>type</i>.
The type determines the HTML control that presents the question.

The <code>QuestionnaireComponent</code> then assembles the form and manages the user interactions (including save).

While this sample is naive, one can imagine a more robust solution with more sophisticated metadata, visual controls, and layout.

There is no DOM manipulation with this approach.
You stay entirely within the conventional Angular process and
are protected from injection attacks by its native DOM sanitization.

	On the other hand, you're more constrained by the complexity and limitations
	of your metadata schema and its much less flexible than the free-form approach demonstrated elsewhere in this project.

<aside>
	<i>
		The Questionnaire sample derives from the
		"<a href="https://angular.io/guide/dynamic-form" target="_blank">Dynamic Forms</a>"
		page in the Angular documentation.
	</i>
</aside>

[Top of page](long-story/#top-of-page)
