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
