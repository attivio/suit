#### Examples:

__1.__ Mixed sentiment with click handler:

```jsx
  <SentimentBar
    posCount={402}
    negCount={320}
    onClick={(positive) => {
      if (positive) {
        alert('The user clicked the positive sentiment link.');
      } else {
        alert('The user clicked the negative sentiment link.');
      }
    }}
  />
```

__2.__ 100% positive sentiment:

```jsx
  <SentimentBar posCount={402} />
```

__3.__ 100% negative sentiment:

```jsx
  <SentimentBar negCount={320} />
```

__4.__ No sentiment data:

```jsx
  <SentimentBar />
```
