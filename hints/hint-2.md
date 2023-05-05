## Hint #2 : This is a dick

The issue is here

```ts
// src/AppEventModal.tsx
  const { mutateAsync } = useMutation(['event'], ❌ client.postPatientEvent, {
    onError: () => toast(`Error occured`, { type: 'error' }),
    onSuccess: () => toast(`Event added`, { type: 'success' }),
  });
```

### Root cause analysis

In javascript `this` refers to the caller of the method which is **not** always the instance of class that owns the method. See [MDN reference 'this' operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

Since you pass a reference to the instance of the method, the caller is not `client` but and mutation `options`

You can see it easily with the debugger, to see it easily on Stackblitz add a `debugger` instruction and open Chrome DevTools

```ts
// client.ts
class Client {
  async postPatientEvent(event: CreatePatientEvent): Promise<PatientEvent> {
    debugger; // add it here
    return this.post('/patient', event); // 'this' is not an instance of Client
  }
}
```

You'll see that the caller is

```ts
// the caller is this.options, and not client
// mutation.js:91
return this.options.mutationFn(this.state.variables);

```

### How to fix ?

You can bind the caller to `client` instead with the `bind` method

```ts
// src/AppEventModal.tsx
  const { mutateAsync } = useMutation(['event'], ✅ client.postPatientEvent.bind(client), {
    onError: () => toast(`Error occured`, { type: 'error' }),
    onSuccess: () => toast(`Event added`, { type: 'success' }),
  });
```

### How to fix it FOREVER ?

The next time a developper will use the `Client` methods they might forget to use `bind` as well.
Without changing `client.ts` (because it will be a big refacto) can you thing of a way to prevent it to happen again (a Poke-Yoke) ?
