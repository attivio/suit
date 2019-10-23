To report an issue, please click the Issues tab above and click the *New Issue* button. 
Please provide a detailed description of the issue with any code excerpts, logs, or screenshots which help describe the issue.

For contributions, we prefer pull requests. Please follow these steps to get your contributions in:

1. Open a new issue or pick up an existing one on the Issues tab about the patch that you are going to submit. 
(the issue will be given a number)
2. [Fork](https://help.github.com/articles/fork-a-repo) the [suit repo](https://github.com/attivio/suit).
3. Make the changes.
4. Prior to submitting a pull request, execute:
  `yarn lint`

  `yarn flow`

  `yarn test`

  and resolve any reported issues.
5. Update the styleguide if necessary. 
   1. We use styleguidist as a way to document the appearance and functionality of components. If you have created a new component or changed the style or functionality of a component included in `documentation/components`, you should update the example(s) or create new ones to ensure the documentation remains accurate.
   2. To view/test your changes to the style guide, run:

     `yarn start`

    That will run the styleguide at `localhost:6060`. You can then view the styleguide including your changes in your browser. This is also a convenient way to manually test your changes.
6. Send a [pull request](https://help.github.com/articles/using-pull-requests) from your forked repo to the suit repo.
7. Please prefix your pull request title with the issue ID; for example, `issue-87: Adding image gallery component`
8.  Please complete the pull request description with additional details as appropriate.
9.  Once sent, code review will be done through the pull request.
10. Once all review issues are resolved, we will merge the changes into the master branch of the suit repo.
