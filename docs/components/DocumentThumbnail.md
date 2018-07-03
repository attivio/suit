#### Examples:

__1.__ Simple thumbnail.

```jsx
  <DocumentThumbnail uri="/img/Ludwig_Van_Beethoven.jpg" />
```

__2.__ Thumbnail with previews.
```jsx
  <DocumentThumbnail
    uri="/img/Ludwig_Van_Beethoven.jpg"
    previewUris={[
      'https://upload.wikimedia.org/wikipedia/commons/7/7b/Beethoven_3.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTASnYzyIH1q31LTl-2_e7OkKul8rChyvLXnqYj52F1WxtkI72n8w',
      'https://upload.wikimedia.org/wikipedia/commons/3/3a/St_Bernard_Dog.jpg',
    ]}
  />
```

__3.__ Thumbnail with previews but no thumbnail image.
```jsx
  <DocumentThumbnail
    previewUris={[
      'https://upload.wikimedia.org/wikipedia/commons/7/7b/Beethoven_3.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTASnYzyIH1q31LTl-2_e7OkKul8rChyvLXnqYj52F1WxtkI72n8w',
      'https://upload.wikimedia.org/wikipedia/commons/3/3a/St_Bernard_Dog.jpg',
    ]}
  />
```

__4.__ Thumbnail with broken URL.

```jsx
  <DocumentThumbnail uri="theres/no/image/here" />
```
