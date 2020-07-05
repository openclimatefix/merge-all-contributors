# merge-all-contributors

Tired of having countless different `.all-contributorsrc` files across your repos, but not one combined one that shows them all in one place?

This tool does just that for you.

Based on the awesome [All Contributors Specification](https://allcontributors.org/).

## How it works
1. Gathers all `.all-contributorsrc` files from all public repos `master` branches
2. Merges the contributors based on unique `profile`
3. Combines all contribution categories per contributor

## Getting started
```bash
npm install
npm link

merge-all-contributors <GitHub_Org_Name>
# e.g. merge-all-contributors openclimatefix
```
