To activate `ShareSearch` as a feature in `SearchBar`, pass in a prop `allowShareSearch`. When enabled, clicking on this UI element sends an email with the current search query URL to an email address that is passed in as a prop. Email body message and subject line for the email can be passed from the props as well.

To be used as a child component of `SearchBar`. Required props can be passed to the parent `<SearchBar>` and then onto the child `<ShareSearch>`.

#### Examples:

**1.** Adding share search to `SearchBar`.

```jsx
<SearchBar>
  {this.props.allowShareSearch ? (
    <ShareSearch
      shareMessage={this.props.shareMessage}
      subject={this.props.subject}
      email={this.props.email}
    />
  ) : (
    ''
  )}
</SearchBar>
```
