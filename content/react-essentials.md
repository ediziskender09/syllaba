---
slug: react-essentials
title: "React Essentials"
summary: "A complete foundation in React—components, props, state, lists, forms, effects, hooks mindset, and interactive quizzes that explain wrong answers."
category: "Development"
type: course
level: beginner
tier: deep
price: 4
minutes: 210
tags: [react, javascript, components, hooks, frontend]
featured: true
publishedAt: "2026-03-23"
---

## What You'll Learn

By the end of this lesson, you will understand how React builds user interfaces from components, how data flows with props and state, and how to handle events, lists, forms, and simple side effects with hooks. You will create function components, lift state thoughtfully, render collections safely, avoid common rendering pitfalls, and structure small apps that stay understandable as they grow. You will also learn mistakes that cause confusing re-renders, broken forms, and fragile effects.

React is a library for building interactive UIs with a component model. Instead of manually updating the DOM for every change, you describe what the UI should look like for a given state, and React updates the page to match. That shift—from imperative instructions to declarative views—is the heart of React thinking.

This course emphasizes fundamentals over fashion. APIs evolve, but the habits of clear components, predictable state, and honest effects remain. Your goal is to write interfaces that are easy to reason about, not just screens that happen to work once.

## Why React Exists

Classic DOM scripting works for small interactions and becomes hard to maintain as screens grow. You query elements, attach listeners, and push updates in many places. State ends up scattered across the page. React concentrates UI around components that receive data and return a description of the view.

React became popular because it scales mental models: one component tree, unidirectional data flow, and a large ecosystem for routing, data fetching, and design systems. You can learn React without adopting every adjacent tool on day one. Start with components, props, state, and events.

## Mental Model: UI as a Function of State

A useful slogan is: UI = f(state). Given the current data, React components return what should appear. When state changes, React re-renders the affected parts and reconciles the DOM.

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

You do not write “find the h1 and replace its text” as your primary approach. You write “the heading shows the current name.” That declarative style reduces a whole class of update bugs—if you keep state trustworthy.

## JSX Without Mystery

JSX looks like HTML inside JavaScript, but it is syntax that compiles to function calls. In JSX:

- Use `className` instead of `class`
- Use `htmlFor` instead of `for`
- Embed expressions in curly braces: `{user.name}`
- Close tags properly, including self-closing tags like `<img />`

```jsx
const title = "React Essentials";
return <h2 className="lesson-title">{title}</h2>;
```

JSX expressions can include numbers, strings, elements, arrays of elements, and conditionals. They should not include raw objects as children. If you see an error about objects as React children, you probably tried to render an object directly.

## Components: Building Blocks

A component is a function that returns React elements.

```jsx
function LessonCard({ title, minutes }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{minutes} minutes</p>
    </article>
  );
}
```

Name components with PascalCase. Keep one clear responsibility per component when possible: a card, a form, a list, a layout region. Beginners often create one giant App component. Extract pieces when a section has its own data needs or becomes hard to scan.

Components can nest:

```jsx
function Catalog() {
  return (
    <section>
      <LessonCard title="React Essentials" minutes={210} />
      <LessonCard title="TypeScript for Beginners" minutes={200} />
    </section>
  );
}
```

Composition beats inheritance for typical UI structure. Pass children when a wrapper should not know its inner content:

```jsx
function Panel({ children }) {
  return <div className="panel">{children}</div>;
}
```

## Props: Data From Parent to Child

Props are inputs. They flow downward. A child should not mutate props; treat them as read-only snapshots from the parent.

```jsx
function Price({ value }) {
  return <span>{value} credits</span>;
}
```

Destructure props for readability. Provide defaults when useful:

```jsx
function Badge({ label = "New" }) {
  return <span className="badge">{label}</span>;
}
```

If many components need the same data, lift that data to a common ancestor and pass it down. Later you may meet context for cross-cutting concerns; beginners should first master explicit props.

<!-- quiz:react-checkpoint-1 -->

## State: Data That Changes Over Time

State is component-owned data that can change in response to events. In function components, `useState` provides state.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

`useState` returns the current value and a setter. Calling the setter schedules a re-render with the new value. Do not mutate state in place and expect React to notice; replace state with a new value.

```jsx
// Avoid mutating arrays/objects directly when updating state
setTags([...tags, "hooks"]);
setLesson({ ...lesson, featured: true });
```

State updates may be asynchronous in the sense that reading state immediately after setting it can still show the old value in the same event handler. When the next value depends on the previous value, prefer the functional updater:

```jsx
setCount((current) => current + 1);
```

## Events in React

React events use camelCase props: `onClick`, `onChange`, `onSubmit`. Pass a function, not the result of calling a function, unless you intentionally need that pattern with an inline arrow.

```jsx
<button type="button" onClick={handleSave}>Save</button>
<button type="button" onClick={() => handleSave(id)}>Save</button>
```

For forms, `preventDefault` stops full page reloads:

```jsx
function onSubmit(event) {
  event.preventDefault();
  // read controlled values and submit
}
```

Keep handlers focused. If a handler grows large, extract helpers that transform data; leave the handler as the orchestration layer.

## Conditional Rendering

Show UI based on state with JavaScript expressions.

```jsx
{isLoading && <p>Loading…</p>}
{error && <p role="alert">{error}</p>}
{user ? <Profile user={user} /> : <LoginPrompt />}
```

Prefer clear branches over nested ternaries. Early variables help:

```jsx
let content;
if (isLoading) content = <p>Loading…</p>;
else if (error) content = <p role="alert">{error}</p>;
else content = <LessonList lessons={lessons} />;
return <main>{content}</main>;
```

Avoid rendering `0` accidentally with patterns like `{count && <Badge />}` when `count` can be zero; use explicit boolean checks when needed.

## Lists and Keys

Rendering lists is common.

```jsx
function TagList({ tags }) {
  return (
    <ul>
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}
```

`key` helps React identify which item is which across updates. Prefer stable unique ids from your data. Avoid using array index as a key when the list can reorder, insert, or delete—index keys can confuse component state tied to positions.

If each item is an object, key off `id` or `slug`:

```jsx
{lessons.map((lesson) => (
  <LessonCard key={lesson.slug} title={lesson.title} minutes={lesson.minutes} />
))}
```

## Controlled Forms

In controlled components, React state is the source of truth for input values.

```jsx
function EmailForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(email.trim());
      }}
    >
      <label htmlFor="email">Email</label>
      <input
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button type="submit">Continue</button>
    </form>
  );
}
```

Controlled inputs make validation, disabling, and derived UI straightforward because the value always lives in state. For many fields, store an object or use multiple `useState` calls—start with whatever stays clearest.

## Derived Values vs Extra State

If a value can be computed from existing state or props, usually compute it during render instead of storing a second synchronized state.

```jsx
const trimmed = email.trim();
const isValid = trimmed.includes("@");
```

Extra mirrored state drifts. Derived values stay honest. Store state only for values that cannot be computed from what you already have: user input, server responses you are editing, toggles, and similar.

## Lifting State Up

When two children need the same changing data, move state to their closest shared parent and pass values plus setters or callbacks downward.

```jsx
function SearchPage() {
  const [query, setQuery] = useState("");
  return (
    <>
      <SearchInput query={query} onChange={setQuery} />
      <Results query={query} />
    </>
  );
}
```

This keeps a single source of truth. Beginners sometimes duplicate state in both siblings and then struggle to synchronize. Lift early when sharing appears.

<!-- quiz:react-checkpoint-2 -->

## useEffect for Side Effects

Rendering should be pure: given props and state, return UI. Side effects—fetching, subscriptions, manual DOM work, logging to analytics—belong in `useEffect` or event handlers.

```jsx
import { useEffect, useState } from "react";

function LessonTitle({ slug }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const response = await fetch(`/api/lessons/${slug}`);
      const data = await response.json();
      if (!cancelled) setTitle(data.title);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return <h1>{title || "Loading…"}</h1>;
}
```

The dependency array lists reactive values the effect uses. If `slug` changes, the effect re-runs. Cleanup runs before the next effect or when the component unmounts. The cancelled flag avoids setting state after unmount or after a stale response.

Do not use effects to transform data that could be derived during render. Do not fetch in ways that ignore race conditions when inputs change quickly. Start simple, then harden.

## Hook Rules

Hooks like `useState` and `useEffect` must be called at the top level of a function component (or custom hook), not inside conditions or loops. This preserves a stable call order between renders.

```jsx
// Good: unconditional
const [open, setOpen] = useState(false);

// Bad: conditional hook call
if (ready) {
  const [open, setOpen] = useState(false);
}
```

Custom hooks are functions starting with `use` that call other hooks. Extract them when multiple components share stateful logic. Keep custom hooks focused and named after behavior: `useToggle`, `useLesson`, `useLocalStorage`.

## Component Design Habits

Keep props lists short when possible. If a component needs twelve unrelated props, it may be doing too much—or you may need to pass a structured object that represents one domain concept.

Prefer children and composition for layout. Prefer explicit callbacks like `onSave` over reaching upward through hacks. Keep side effects near the data they own. Name event handlers after user intent: `handleSubmit`, `handleDismiss`.

Accessibility is part of essentials: label inputs, use button elements for actions, manage focus thoughtfully in dialogs later, and do not rely on color alone for meaning.

## Common Mistakes and How to Avoid Them

Mistake 1: Mutating state arrays and objects directly. Copy first, then set.

Mistake 2: Using array index keys on dynamic lists, causing weird input state bugs.

Mistake 3: Putting all logic in one App component until the file is unreadable.

Mistake 4: Fetching without cleanup or race protection when parameters change.

Mistake 5: Storing derived values in state and forgetting to update them.

Mistake 6: Calling hooks conditionally.

Mistake 7: Passing `onClick={handleClick()}` and running the handler during render.

Mistake 8: Prop-drilling endlessly without first asking whether state lives too high or too low.

## Practice Projects

Practice 1 — Counter with step: Build a counter with buttons for +1, +5, and reset. Use functional updates.

Practice 2 — Filterable list: Render lessons from a local array. Filter by search text with a controlled input.

Practice 3 — Signup form: Controlled fields for name and email, inline validation messages, disabled submit until valid.

Practice 4 — Accordion: One open section at a time. Lift open id state to the parent.

Practice 5 — Fetch on select: Dropdown of slugs; fetch and display details; handle loading and error states.

Write the data model first as plain objects. Then wrap UI around it. That order keeps logic testable.

## Reading React Code Like a Professional

When you open a component, ask:

1. What props enter?
2. What state lives here?
3. What is derived during render?
4. Which handlers change state?
5. Which effects talk to the outside world?

Trace one user action: click → handler → setState → re-render → new UI. If you cannot complete that chain, the component is not yet understood.

## Style and Readability

Colocate styles however your project prefers, but keep class names meaningful. Extract subcomponents when JSX blocks repeat or nest deeply. Prefer early returns for guard states: loading, error, empty.

```jsx
if (isLoading) return <p>Loading…</p>;
if (error) return <p role="alert">{error}</p>;
return <LessonList lessons={lessons} />;
```

Keep files focused. A 400-line component can be valid, but beginners usually benefit from smaller pieces sooner.

## From Essentials to the Ecosystem

After these essentials, natural next steps include React Router for multi-page flows, a data library for caching and mutations, TypeScript for typed props, and testing libraries that render components. Do not rush into a complex state manager while `useState` and lifting still cover your needs. Complexity should follow pain.

Build a few complete tiny apps end to end. Shipping a filterable list with a form teaches more than watching another abstract hooks video.

## Glossary

**Component:** A function describing a piece of UI.

**Props:** Read-only inputs passed from parent to child.

**State:** Data owned by a component that can change over time.

**Render:** Computing the UI description for current props and state.

**Reconciliation:** React’s process of updating the DOM to match the latest render output.

**Hook:** A function like `useState` that adds React features to function components.

**Controlled input:** An input whose value is driven by React state.

**Key:** A stable identity hint for list items during updates.

**Side effect:** Interaction with systems outside pure rendering, such as network or storage.

## Quality Bar for Completion

You are ready to move on when you can build components with props and state, render lists with proper keys, handle controlled forms, lift shared state, explain what belongs in `useEffect`, and debug a UI bug by tracing data flow. Being able to recite hook names is not enough. Predicting what re-renders and why is the real signal.

## Summary

React essentials are about components, props, state, events, lists, forms, and careful effects. Describe UI from state. Keep props immutable. Update state immutably. Give lists stable keys. Control form values when you need validation and derived UI. Use effects for external synchronization, not for basic calculations. Compose small components and keep data flow visible.

If you carry those habits forward, libraries and frameworks around React become optional tools rather than requirements for basic competence. That is the foundation of confident frontend development with React.

<!-- quiz:react-final -->

## Appendix: Mental Models for Beginners

Mental model 1 — Photo album: Each render is a snapshot of the UI for the current state. Changing state requests a new snapshot.

Mental model 2 — Assembly instructions: JSX is a description of parts and nesting, not a list of manual screwdriver steps on the live DOM.

Mental model 3 — Single notebook: Shared state belongs in one notebook (parent) instead of two siblings keeping conflicting copies.

Mental model 4 — Mailbox for effects: Event handlers respond to user mail immediately; effects handle background mail like network deliveries and subscriptions.

Use models as temporary scaffolding. Discard them when the data-flow story feels natural.

## Appendix: Mini Reference Cheatsheet

```jsx
const [value, setValue] = useState(initial);
setValue(next);
setValue((prev) => prev + 1);
useEffect(() => {
  // subscribe or fetch
  return () => {
    // cleanup
  };
}, [dependency]);
{items.map((item) => <Row key={item.id} {...item} />)}
```

Revisit this sheet after each practice session. Retrieval practice beats passive rereading.

## Appendix: Debugging Checklist

When UI is wrong, ask: Is state actually updating? Am I mutating state? Is the key unstable? Am I rendering the wrong branch? Did I fetch but set state after unmount? Am I deriving from stale props? Did I call a handler during render by mistake? Is the parent passing the data I think it is?

Log state at the top of the component body carefully, or use React DevTools to inspect props and state. Fix one assumption at a time.

## Appendix: Props vs State Decision Guide

Use props when the parent owns the value and the child only displays or notifies. Use state when the component needs to remember something across renders because of local interaction. Lift state when siblings must stay synchronized. Derive values when calculation from existing data is enough.

If you are unsure, start local. Lift when sharing pain appears. That path usually beats premature global state.

## Final Encouragement

Every fluent React developer once mutated an array in state, chose index keys badly, or put a fetch in the wrong place. Progress is learning to see UI as a projection of data and to keep that data honest. Stay curious about why a screen re-rendered. Stay disciplined about small components and clear handlers. Stay humble when the UI disagrees with your mental model—then update the model. With that posture, React becomes a reliable craft instead of a pile of hooks trivia.
