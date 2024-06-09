---
title: Magic "key" prop in React
tags:
  - frontend
  - react
category: programming
date: 2021-04-08T00:00:00.000Z
aliases: []
---
# Magic "key" prop in React

Sometimes a familiar tool can have some special use-cases you have never thought about. **React** is an extremely lightweight library (oh, ok, maybe it was before introducing **hooks**), but still, it has tons of handy secrets. Learning those React superpowers is your key to becoming a more professional developer and solving different types of tasks with much cleaner and less hacky implementations.

`key` prop is a well-known React attribute that is usually used with iterators inside JSX code. Thanks to [react/jsx-key eslint rule](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md), we can be sure that this rule is never violated and no iterators are used without the `key` prop causing significant performance issues on huge amounts of data. 

{{< padawans-playground >}}

I believe [React official documentation](https://reactjs.org/docs/lists-and-keys.html#keys) covers this topic well enough, but let's have a look at a small cheat sheet:

```tsx
import Bar from 'components/Bar'; // Bar does NOT have `key` listed in its props

const Foo = ({ inputs }) => inputs.map((input, index /* do NOT use index as a key */) => (
  <Bar key={`${input.type}-${input.name}`}>{/* id is the best, if non avail try to generate any unique string, which will be the same for the same item */}
  </Bar>
)));

/*
  if `inputs` prop was `[{type: 'file', name: 'file'}, { type: 'number', name: 'price' }]`
  and then has been changed to `[{type: 'file', name: 'file'}, { type: 'text', name: 'title' }]`
  Only the second <Bar> component will be rerendered. First element's key stays the same, so React does not rerender it.
*/
```

{{< /padawans-playground >}}

But what is this `key` attribute on its own? What exactly does it do? Remember one simple rule
> if `key` prop is changed, the element is rerendered

Nothing special, ha? I believe you've used the `key` attribute thousands of times during your career. What additional value can I provide you with? 

I have created two problem use cases, which can be solved by using the `key` attribute. Let's go and learn how the `key` attribute can help ya, when you do not have any iterators at all!

### An input[type="file"] problem

You are working on the following file uploader component:

<div class="wide__container">
<iframe src="https://codesandbox.io/embed/key-input-project-9ye38?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="key-input-project"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
</div>

You believe the component works nicely: you can select a photo and click a button to upload it. After the photo is submitted, you can upload the next one. What can go wrong here? You have sent the ticket to review, and you are sure that this ticket is almost closed. But suddenly a following bug is found by the QA team:

----
**Steps to reproduce**:

1. Select a photo
1. Click "Approve"
1. Select **the same** photo again

**Expected**:
Photo preview to be visible and the "Approve" button to be enabled.

**Actual**:
No photo preview, "Approve" button is not visible

----

Wow! The good thing about this bug is that it is pretty easy to reproduce. **Try it yourself in the preview on the top!** _(And don't worry, your photos are not uploaded anywhere)_

But what's going on? The code is pretty basic. Why the hell isn't it working properly?

To resolve bugs in general, I suggest using [Devide & Conquer methodology](https://css-tricks.com/heres-how-i-solved-a-weird-bug-using-tried-and-true-debugging-strategies/) and build a minimal representation of the problem. Just get rid of the photo submission and custom UI elements. Leave the only things that matter.

```tsx
const Form = () => {
  const [file, setFile] = useState<File>();
  const handleFileChange = useCallback((ev) => {
    alert("File chosen!");
    setFile(ev.currentTarget.files[0]);
  });
  return (
    <>
      <input type="file" onChange={handleFileChange} />
    </>
  );
};
```
*[Interactive playground](https://codesandbox.io/s/key-input-problem-ej8vm)*

Let's do small research together: 

- `<input>` element had been rendered once on the page and it was not rerendered (you can check by using `debug` or `console.log` statement inside render)
- `input[type="file"]` [is always an uncontrolled component](https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag)
- bug happens only when the same image is selected, a different image works well

Everica! The bug happens only because `<input>` still has the previous photo as a value. In case you select the same image, the value is not changed, and the `onChange` function is not being called at all! 

Ha, the mystery is solved! Here comes the most interesting part: how should we cope with this bug? The solution is pretty straightforward: we need to somehow "reset" the `<input />` element after the file is selected, but how can you do it?

{{< hackermans-tip >}}

You can think of using `onInput` instead of `onChange`. But it does not work at all: if the same photo is selected twice, the `onInput` event is not getting fired at all, same as `onChange`.

{{< /hackermans-tip >}}

So here is when the `key` prop comes to rescue! If `key` prop is changed, the element is rerendered, remember? So, the only thing we need to do is to generate the `key` prop somehow.

#### Idea I. 
Use `file.name` as a `key`.

```tsx
const Form = () => {
  const [file, setFile] = useState<File>();
  const handleFileChange = useCallback((ev) => {
    alert("File chosen!");
    setFile(ev.currentTarget.files[0]);
  });
  return (
    <>
      <input /* !!- */ key={file.name} /* -!! */ type="file" onChange={handleFileChange} />
    </>
  );
};
```
*[Interactive playground](https://codesandbox.io/s/key-input-fix-1-q760w)*

In this case, after the file is selected, the `key` is changed, and the `<input />` element is rerendered, so its value is being reset. But, if you select the same image the third time in a row, then the bug occurs again.

#### Idea II.
Reset it every time any file is selected with a counter.

```tsx
const Form = () => {
  const [inputCounter, incrementInputCounter] = useReducer((c: number) => c + 1, 0);
  const [file, setFile] = useState<File>();
  const handleFileChange = useCallback((ev) => {
    alert("File chosen!");
    incrementInputCounter();
    setFile(ev.currentTarget.files[0]);
  });
  return (
    <>
      <input /* !!- */ key={inputCounter} /* -!! */ type="file" onChange={handleFileChange} />
    </>
  );
};
```

This way the input is rerendered after any file is selected.

{{< hackermans-tip >}}

TDD is perfect to resolve this kind of bugs, and [@testing-library](https://testing-library.com) is a great tool, which is usually helpful. But, unfortunately, this bug can not be reproduced in jest because [jsdom](https://github.com/jsdom/jsdom) implementation of `input[type="file"]` is incomplete and `<input />` does not store file as the value internally.

{{< /hackermans-tip >}}

### Scroll reset problem

While working on another task, you have created the following component:

<div class="wide__container">
<iframe src="https://codesandbox.io/embed/scrollable-divs-bug-4s02n?fontsize=14&hidenavigation=1&module=%2Fsrc%2FCatalogue%2FCatalogue.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="scrollable-divs bug"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
</div>

Nice component, you suppose. You are starting to happily pack your belonging, 'cause it is the last business day of the week, but suddenly a new bug ticket is sent to you:

----
**Steps to reproduce**:

1. Select an item at the 1st column
1. Scroll 2nd column to the bottom
1. Select any other item at the 1st column

**Expected**:
The 2nd column scroll is to be reset

**Actual**:
The 2nd column scroll stays the same

----

There are two different ways to solve this problem:

1. Straightforward bug resolution: create a `ref` for the second div, and use it to reset `scrollTop` of the `div` element in the `handleClick` function.
1. `key` solution: use `key` prop on the div element to reset it

Let's go and try each of those two hypothetical problem resolution plans.

#### Plan A. Scroll each div manually.

Before we begin to implement something, it is always a good idea to start with a short plan:

1. Create an array of refs, which will hold `ref` objects for each scrollable div
2. Add an `onClicked` prop to the `CatalogueRow` component
3. Inside `Catalogue` implement a `handleClicked` event handler, which will scroll each of the divs to top

<div class="wide__container">
<iframe src="https://codesandbox.io/embed/scrollable-divs-manual-fixed-evirk?fontsize=14&hidenavigation=1&module=%2Fsrc%2FCatalogue%2FCatalogue.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="scrollable-divs manual-fixed"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
</div>

*The bug is resolved! [Here is the GitHub PR](https://github.com/goooseman/key-magic-scrollable-divs/pull/1/files), check it out! But was it not too difficult?*


<div class="wide__container" style="background-color: white; " >
<iframe  style="width:100%; height: 1160px; border:1px solid black; padding: 5px; overflow:hidden;" src="https://blog-assets.goooseman.ru/2021/08-04-key-magic/manual-fix-diff.html"></iframe>
</div>


#### Plan B. Use "key" to reset divs.

Sometimes you need to think about the problem from a different perspective. You can just reset the `<div>` element to its default state to reset the scroll. And it is easy to do by using the `key` prop. When the `key` prop is changed, the elements get reset. 
But what key should we use for the second column to reset it after the item is chosen in the first column? We can simply use `activeId` of the first column as the key of the second! Let's try it out!

<div class="wide__container">
<iframe src="https://codesandbox.io/embed/scrollable-divs-manual-fixed-evirk?fontsize=14&hidenavigation=1&module=%2Fsrc%2FCatalogue%2FCatalogue.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="scrollable-divs manual-fixed"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
</div>
  
*Ohhh, this one is much simpler and does not use refs! [Here is the GitHub PR](https://github.com/goooseman/key-magic-scrollable-divs/pull/2/files), one line change only!*

<div class="wide__container" style="background-color: white; ">
<iframe  style="width:100%; height: 260px; border:1px solid black; padding: 5px; overflow:hidden;"  src="https://blog-assets.goooseman.ru/2021/08-04-key-magic/key-fix-diff.html"></iframe>
</div>

{{< hackermans-tip >}}

There is one disadvantage about this solution though: it is implicit, so it can accidentally be removed in the future by another developer working on another feature. So, it is always better to write an integration test that will provide you with confidence that no regressions are going to be created. Unfortunately, `jsdom` (which is used inside `jest` to provide a browser-similar environment) is a simple browser implementation, which does not render any elements for real. So, it is difficult to use it to test such functionalities, but it is possible. Anyway, it is a matter of a separate article, stay tuned!

{{< /hackermans-tip >}}

# Conclusion

Sometimes you can believe that you know the tool, but it can happen that you know only one of the use-cases of this tool. When you are researching a new instrument, it is vital to understand how the tool works internally. This way it is going to be much easier for you to find new interesting use-cases to the well-known tools and to become a better developer.
