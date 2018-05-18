---
to: src/index.js
inject: true
before: //\ LAST\ COMPONENT\ CLASS
skip_if: <%= Name %>
---
export <%= name %> from './components/<%= name %>';
