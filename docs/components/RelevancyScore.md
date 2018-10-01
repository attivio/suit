#### Examples:

__1.__ Relevancy score with no explanation available.

```jsx
  <RelevancyScore id="myFirstRelevancyScore" score={0.18323} />
```

__2.__ Relevancy score with a score explanation provided.

```jsx
  <RelevancyScore
    id="myOtherRelevancyScore"
    score={2.420839}
    explanation={`0.028496388 = (FEATURE QUERY)
  0.028496388 = (FEATURES) sum of:
    0.028496388 = (FEATURE) freshness * weight(0.1)
  0.0 = (SEARCH QUERY)
    0.0 = *:*
`}
  />
```
