#### Examples:

__1.__ Simple list in a side-by-side format.

```jsx
  <LabeledData
    data={[
      new LabeledData.LabeledDataPair('Polonius', 'Act III, Scene iv'),
      new LabeledData.LabeledDataPair('Ophelia', 'Act IV, Scene vii'),
      new LabeledData.LabeledDataPair('Gertrude', 'Act V, Scene ii'),
      new LabeledData.LabeledDataPair('Laertes', 'Act V, Scene ii'),
      new LabeledData.LabeledDataPair('Claudius', 'Act V, Scene ii'),
      new LabeledData.LabeledDataPair('Hamlet', 'Act V, Scene ii'),
      new LabeledData.LabeledDataPair('Rosencrantz & Guildenstern', 'Act V, Scene 2'),
    ]}
  />
```

__2.__ The same list, rendered vertically.

```jsx
  <LabeledData
    data={[
      new LabeledData.LabeledDataPair('Polonius', 'Act III, Scene iv'),
      new LabeledData.LabeledDataPair('Ophelia', 'Act IV, Scene vii'),
      new LabeledData.LabeledDataPair('Gertrude', 'Act V, Scene ii'),
      new LabeledData.LabeledDataPair('Laertes', 'Act V, Scene ii'),
      new LabeledData.LabeledDataPair('Claudius', 'Act V, Scene ii'),
      new LabeledData.LabeledDataPair('Hamlet', 'Act V, Scene ii'),
      new LabeledData.LabeledDataPair('Rosencrantz & Guildenstern', 'Act V, Scene 2'),
    ]}
    stacked
  />
```

__3.__ This list has URLs in its values.

```jsx
  <LabeledData
    data={[
      new LabeledData.LabeledDataPair('Apple', 'https://www.apple.com/'),
      new LabeledData.LabeledDataPair('Samsung', 'http://www.samsung.com/us/'),
      new LabeledData.LabeledDataPair('Motorola', 'https://www.motorola.com/us/home'),
    ]}
  />
```

__4.__ This list has more complex JSX elements as values

```jsx
  <LabeledData
    data={[
      new LabeledData.LabeledDataPair('Image', (
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Redoute_-_Rosa_gallica_purpuro-violacea_magna.jpg"
            style={{ width: '100px' }}
          />
          <div style={{ fontStyle: 'italic', fontSize: '80%', color: '#666' }}>
            Pierre-Joseph Redouté [Public domain], via Wikimedia Commons
          </div>
        </div>
      )),
      new LabeledData.LabeledDataPair('Little Form', (
        <div>
          <form>
            <input type="text" />
            <button>OK</button>
          </form>
        </div>
      )),
      new LabeledData.LabeledDataPair('Hebrew Letters', (
        <div>
          <ul>
            <li>Aleph — א</li>
            <li>Bet — ב‎</li>
            <li>Gimel — ג‎</li>
          </ul>
        </div>
      )),
    ]}
  />
```
