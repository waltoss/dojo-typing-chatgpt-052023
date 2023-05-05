### You say Poke-What ?

You can have multiple ideas to fix it forever, like

- Remove the class `Client` and extract methods
- Introduce a hook `useClientMutation` that binds `client` to the method
- Add a custom linter rule to prevent calling `Client` methods without `bind`
