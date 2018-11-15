#### Examples:


__1:__ Basic example.

```jsx
  <LoginForm
    doLogin={(user, password) => {
      alert(`User ${user} is trying to log in with password ${password}. Shh! It's a secret.`);
    }}
  />
```

__2:__ Example showing an error message.

```jsx
  <LoginForm
    doLogin={(user, password) => {
      alert(`User ${user} is trying to log in with password ${password}. Shh! It's a secret.`);
    }}
    error="That's not a valid username/password. Try again."
  />
```
