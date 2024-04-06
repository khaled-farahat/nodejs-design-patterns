# Revealing Module Pattern

One of the bigger problems with JavaScript in the browser is the lack of namespacing. Every script runs in the global scope; therefore, internal application code or third-party dependencies can pollute the scope while exposing their own pieces of functionality.

so if there is a variable or function with the same name in two different scripts, this will cause a conflict.

to overcome this problem, we can use the revealing module pattern.

example:

```javascript
const myModule = (() => {
  const privateFoo = () => {};
  const privateBar = [];
  const exported = {
    publicFoo: () => {},
    publicBar: () => {},
  };
  return exported;
})(); // once the parenthesis here are parsed, the function
// will be invoked
console.log(myModule);
console.log(myModule.privateFoo, myModule.privateBar);
```

we use Immediately Invoked Function Expression (IIFE) and it is used to create a private scope, exporting only the parts that are meant to be public.

by this way we only export only public facing api, and keep our data private.

```bash
{ publicFoo: [Function: publicFoo],
publicBar: [Function: publicBar] }
undefined undefined
```

this pattern is the base of CommonJS module system
