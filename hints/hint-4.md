## Hint #4 : GPT is strong

### Try to ask to ChatGPT :

I have the following code

```ts
  const { mutateAsync } = useMutation(['event'], client.postPatientEvent, {
    onError: () => toast(`Error occured`, { type: 'error' }),
    onSuccess: () => toast(`Event added`, { type: 'success' }),
  });
```

This caused an error because I forgot to bind client like this

```ts
  const { mutateAsync } = useMutation(['event'], client.postPatientEvent.bind(client), {
    onError: () => toast(`Error occured`, { type: 'error' }),
    onSuccess: () => toast(`Event added`, { type: 'success' }),
  });
```

Do you have an idea to never do this mistake anymore ?

### GPT-4 told me

Yes, it's a common mistake to forget binding the this context when passing methods around. To avoid making this mistake, you can use arrow functions to automatically bind the this context or you can create a wrapper function to handle the binding for you. Here are two approaches:

1. Use arrow functions:
   You can modify your client class to use arrow functions, which automatically bind the this context. Here's an example:

```ts
class Client {
  // ...

  postPatientEvent = async (data) => {
    // Your implementation here
  }
}
```

Now, you can use it without needing to bind the client:

```ts
const { mutateAsync } = useMutation(['event'], client.postPatientEvent, {
  onError: () => toast(`Error occured`, { type: 'error' }),
  onSuccess: () => toast(`Event added`, { type: 'success' }),
});
```

2. Create a wrapper function:
   If you don't have control over the client implementation or don't want to change it, you can create a wrapper function that takes care of the binding:

```ts
const postPatientEventWrapper = (data) => client.postPatientEvent(data);

const { mutateAsync } = useMutation(['event'], postPatientEventWrapper, {
  onError: () => toast(`Error occured`, { type: 'error' }),
  onSuccess: () => toast(`Event added`, { type: 'success' }),
});
```

By using either of these methods, you won't need to remember to bind the client every time you pass the method around.

Avatar of the person chatting
That's a nice idea, can I do it with typing or a custom eslint rule ?

Yes, you can use TypeScript and ESLint to help enforce best practices and avoid making this mistake in the future.

TypeScript:
You can create a type definition for your client class, which enforces that all methods are bound arrow functions:

```ts
type ClientMethods = {
  postPatientEvent: (data: any) => Promise<any>;
  // Add more methods here if needed
};

class Client implements ClientMethods {
  postPatientEvent = async (data: any) => {
    // Your implementation here
  };

  // Add more methods here if needed
}
```

By enforcing the type definition, you'll be guided to use arrow functions when defining methods in your client class, which will automatically bind the this context.

ESLint:
You can create a custom ESLint rule to warn or error when passing a non-arrow function as a callback. Unfortunately, there's no built-in ESLint rule to enforce this, so you'll need to create your own. Here's an example of a simple custom rule:

```js
// .eslintrc.js
module.exports = {
  // ...
  rules: {
    // ...
    'no-unbound-methods': 'error',
  },
};
```

```js
// eslint-plugin-no-unbound-methods.js
module.exports = {
  rules: {
    'no-unbound-methods': {
      create: function (context) {
        return {
          CallExpression(node) {
            const callback = node.arguments[1];
            if (
              callback &&
              callback.type === 'MemberExpression' &&
              callback.property.type === 'Identifier'
            ) {
              context.report({
                node: callback.property,
                message: 'Avoid passing unbound methods as callbacks.',
              });
            }
          },
        };
      },
    },
  },
};
```

To use this custom plugin, you need to install it as a dependency and include it in your ESLint configuration:

```bash
$ npm install --save-dev eslint-plugin-no-unbound-methods
```

```js
// .eslintrc.js
module.exports = {
  // ...
  plugins: ['no-unbound-methods'],
  // ...
};
```

Keep in mind that this custom ESLint rule is quite simple and may not cover all cases. You might need to adjust it to fit your needs.

By combining TypeScript and ESLint, you can enforce best practices in your codebase and avoid making this mistake in the future.
