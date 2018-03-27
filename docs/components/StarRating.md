#### Examples:

__1.__ Showing a fractional number of stars (3-1/4)
```jsx
<StarRating stars={3.25} />
```

__2.__ Showing no stars
```jsx
<StarRating stars={0} />
```

__3.__ Showing a single star
```jsx
<StarRating stars={1} />
```

__4.__ Showing five stars
```jsx
<StarRating stars={5} />
```

__5.__ An editable version for the user to enter their own rating
```jsx
initialState = {
  rating: 0,
};

<StarRating chooseable stars={state.rating} onRated={(numStars) => {
  state.rating = numStars;
}} />
```
