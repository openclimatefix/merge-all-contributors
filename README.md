# merge-all-contributors
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Tired of having countless different `.all-contributorsrc` files across your repos, but not one combined one that shows them all in one place?

This tool does just that for you.

Based on the awesome [All Contributors Specification](https://allcontributors.org/).

## How it works
1. Gathers all `.all-contributorsrc` files from all public repos `main` branches
2. Merges the contributors based on unique `profile`
3. Combines all contribution categories per contributor

## Getting started
```bash
npm install
npm link

merge-all-contributors <GitHub_Org_Name>
# e.g. merge-all-contributors openclimatefix
```

## GitHub Action

Instead of using the CLI you can also use this as a GitHub Action.

### Inputs

#### `orgName`

**Required** The name of the GitHub organisation to merge contributors for.

### Outputs

#### `contributors`

The merged array of contributors.

### Example Usage

```yaml
uses: openclimatefix/merge-all-contributors@v1.0.3
with:
  orgName: 'openclimatefix' # replace with your org name
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/flowirtz"><img src="https://avatars.githubusercontent.com/u/6052785?v=4?s=100" width="100px;" alt="Flo"/><br /><sub><b>Flo</b></sub></a><br /><a href="https://github.com/openclimatefix/merge-all-contributors/commits?author=flowirtz" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/peterdudfield"><img src="https://avatars.githubusercontent.com/u/34686298?v=4?s=100" width="100px;" alt="Peter Dudfield"/><br /><sub><b>Peter Dudfield</b></sub></a><br /><a href="https://github.com/openclimatefix/merge-all-contributors/commits?author=peterdudfield" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!