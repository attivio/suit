# Contributing to SUIT

## Reporting Issues

To report an issue with or make a request for a new feature in the SUIT library, please click the **Issues** tab above and then click the **New Issue** button. Provide a detailed description of the issue along with any code excerpts, logs, screenshots, etc., which help describe the issue.

Please create an issue for any contribution you plan to make, so that every pull request can be tied to an issue for documentation purposes.

## The Contribution Process

For contributions, we prefer that you create pull requests here in GitHub. Please follow these steps to get your contributions in:

1. Open a new issue or pick up an existing one on the **Issues** tab for the patch that you want to submit.
2. [Fork](https://help.github.com/articles/fork-a-repo) the [SUIT repository](https://github.com/attivio/suit).
3. Make the changes.
4. Prior to submitting a pull request, execute the following commands to ensure your code builds correctly and meets the criteria of the SUIT coding standards, resolving any issues that are surfaced:  
  ```
  yarn lint
  yarn flow
  yarn test
  ```
5. Update the SUIT Style Guide if necessary. We use [react-styleguidist](https://react-styleguidist.js.org) as a way to document the appearance and functionality of components in SUIT. If you have created a new component or changed the style or functionality of a component included in `documentation/components`, you should update the examples or create new ones to ensure the documentation remains accurate.
  To view/test your changes to the Style Guide, run `yarn start` to launch the style guide server. You can then view all of the example components, including your changes, by pointing your browser to [`http://localhost:6060`](http://localhost:6060). (Running the Style Guide is also a convenient way to manually test your changes while developing as it is continuously updated every time you save changes to your code.)
6. Create a [pull request](https://help.github.com/articles/using-pull-requests) from your forked repo to the SUIT repo.
7. Prefix your pull request title with the issue’s ID; for example, “issue-87: Adding image gallery component.”
8. Fill out the pull request description with additional information as appropriate. Include details about what you’ve changed how you’ve tested your changes, and what other areas they might impact.
9. Once your pull request has been submitted, the SUIT maintainers will review the changes, possibly providing feedback or requesting changes.
10. Once any code-review issues have been resolved, your changes will be merged into the master branch of the SUIT repo, a new build of the library will be created and published on NPM and will be available for others to use.
