#!/usr/bin/env node

const axios = require('axios');
const core = require('@actions/core');


async function getReposForPage(page, org) {
    const {
        status,
        data
    } = await axios.get(`https://api.github.com/orgs/${org}/repos?per_page=100&page=${page}`);
    if (status !== 200) {
        throw err;
    }

    return data;
}

async function getAllReposForOrg(org) {
    let i = 1;
    let allRepos = [];

    while (true) {
        const repos = await getReposForPage(i, org)
        allRepos = allRepos.concat(repos)

        if (repos.length !== 100) {
            break
        }
    }

    return allRepos;
}

async function getAllContributorsForRepo(repo_handle) {
    const {
        status,
        data
    } = await axios.get(`https://raw.githubusercontent.com/${repo_handle}/main/.all-contributorsrc`, {
        validateStatus: false,
    });

    if (status === 404) {
        return;
    } else if (status !== 200) {
        throw `Could not fetch all-contributors for repo ${repo_handle}`
    }

    return data;
}

async function main(org) {
    const allRepos = await getAllReposForOrg(org);

    const getAllContributorsPromises = allRepos.map(repo => getAllContributorsForRepo(repo.full_name))
    Promise.all(getAllContributorsPromises).then(allContributorFiles => {
        const allContributorsDict = allContributorFiles.reduce((result, contributorFile) => {
            if (contributorFile != null) {
                for (contributor of contributorFile.contributors) {
                    if (contributor.profile in result) {
                        for (contributionType of contributor.contributions) {
                            if (result[contributor.profile].contributions.indexOf(contributionType) === -1) {
                                result[contributor.profile].contributions.push(contributionType)
                            }
                        }
                    } else {
                        result[contributor.profile] = contributor
                    }
                }
            }
            return result;
        }, {});

        const allContributors = Object.values(allContributorsDict);
        console.log(allContributors)

        if (IS_GH_ACTION) {
            core.setOutput("contributors", JSON.stringify(allContributors));
        }
    })
}

let IS_GH_ACTION = process.argv.length < 3;

if (IS_GH_ACTION && !core.getInput('orgName')) {
    console.log("[ERROR] Must pass GitHub organisation name");
    console.log("Either pass to CLI or set as input to GH Action")
    console.log("Example: merge-all-contributors openclimatefix");
    return;
}

main(core.getInput('orgName') || process.argv[2])
