#### Examples:

__1.__ Preview with just one image, with no document title

```jsx
  initialState = {
    show: false,
  };
  <div>
    <DocumentPreview
      uris={['https://upload.wikimedia.org/wikipedia/commons/5/59/United_States_Constitution.jpg']}
      show={state.show}
      onClose={() => { setState({show:false}); }}
    />
    <button onClick={() => { setState({show: true}); }}>Show Preview</button>
  </div>
```

__2.__ Preview with multiple images with a document title.

```jsx
  initialState = {
    show: false,
  };
  <div>
    <DocumentPreview
      uris={[
        'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        'https://upload.wikimedia.org/wikipedia/commons/3/32/Ferret_2008.png',
        'https://upload.wikimedia.org/wikipedia/commons/3/34/Florida_Box_Turtle_Digon3.jpg',
      ]}
      docTitle="Potential Pets"
      show={state.show}
      onClose={() => { setState({show:false}); }}
    />
    <button onClick={() => { setState({show: true}); }}>Show Preview</button>
  </div>
```
