#!/usr/bin/env node

const axios = require('axios');

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
    } = await axios.get(`https://raw.githubusercontent.com/${repo_handle}/master/.all-contributorsrc`, {
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
    })
}

if (process.argv.length < 3) {
    console.log("[ERROR] Must pass GitHub organisation name");
    console.log("Example: merge-all-contributors openclimatefix");
    return;
}

main(process.argv[2])